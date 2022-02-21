import { useSelections } from 'ahooks'
import React, { useState } from 'react'
import DatePicker from 'react-date-picker/dist/entry.nostyle'
import { categories } from '../../interface/activity'
import './Calendar.css'
import './DatePicker.css'

export interface ICreateActivityFormProps {
  sendAmount: number
  hasAmount: number
  onSubmit?: (title: string, metadata: string) => void
}

// All and Airdrop not allow user create
const categoriesToSelect = categories.filter(
  category => category.type !== 'All' && category.type !== 'Airdrop'
)

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export const CreateActivityForm = ({
  sendAmount,
  hasAmount,
  onSubmit
}: ICreateActivityFormProps) => {
  const [title, setTitle] = useState<string>('')
  const [source, setSource] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState<Date | null>(null)
  const { selected, isSelected, toggle } = useSelections(categoriesToSelect)

  return (
    <div
      className="overflow-hidden p-4 sm:px-6 lg:px-8 mx-auto max-w-7xl bg-white"
      style={{ minHeight: 'calc(100vh - 16px)' }}
    >
      <form
        action="#"
        method="POST"
        className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-8 gap-y-3"
      >
        {/* title */}
        <div className="col-span-2 md:col-span-1">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            <span className="text-closed"> * </span>
            Title
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="title"
              id="title"
              autoComplete="off"
              value={title}
              maxLength={32}
              onChange={e => setTitle!(e.target.value)}
              placeholder="Example: Flow Fest mystery NFT giveaways (max 32)"
              className="block py-3 px-4 w-full rounded-md border border-gray-300 focus:border-main focus:ring-main shadow-sm"
            />
          </div>
        </div>

        {/* content */}
        <div className="col-span-2">
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            Content
          </label>
          <div className="mt-1">
            <textarea
              id="content"
              name="content"
              rows={2}
              value={content}
              onChange={e => setContent!(e.target.value)}
              className="block py-3 px-4 w-full rounded-md border border-gray-300 focus:border-main focus:ring-main shadow-sm"
              placeholder="(optional) the details of what you need to pay attention for participate"
            />
          </div>
        </div>

        {/* datePicker */}
        <div className="flex sm:col-span-2 md:col-span-1">
          <div>
            <label
              htmlFor="start-date"
              className="block text-sm font-medium text-gray-700"
            >
              Start Date
            </label>
            <div className="mt-1">
              <DatePicker
                onChange={setStartDate}
                value={startDate}
                calendarIcon={null}
                format={'y-MM-dd'}
                name="startDate"
              />
            </div>
          </div>
          <div className="ml-4">
            <label
              htmlFor="end-date"
              className="block text-sm font-medium text-gray-700"
            >
              End Date
            </label>
            <div className="mt-1">
              <DatePicker
                onChange={setEndDate}
                value={endDate}
                calendarIcon={null}
                format={'y-MM-dd'}
                name="endDate"
                minDate={startDate}
              />
            </div>
          </div>
        </div>

        {/* source */}
        <div className="col-span-2 md:col-span-1">
          <label
            htmlFor="source"
            className="block text-sm font-medium text-gray-700"
          >
            Source
          </label>
          <div className="mt-1">
            <textarea
              id="source"
              name="source"
              autoComplete="url"
              rows={1}
              value={source}
              onChange={e => setSource!(e.target.value)}
              placeholder="(optional) the source URL activity publish"
              className="block py-3 px-4 w-full rounded-md border border-gray-300 focus:border-main focus:ring-main shadow-sm"
            />
          </div>
        </div>

        {/* categories */}
        <div className="col-span-2">
          <label
            htmlFor="categories"
            className="block text-sm font-medium text-gray-700"
          >
            <span className="text-closed"> * </span>
            categories
          </label>
          <div className="grid grid-cols-4 gap-4 mt-3">
            {categoriesToSelect.map(category => {
              const category_text = `text-${category.type}-500`
              return (
                <div key={category.id} className="flex relative items-start">
                  <div className="flex items-center h-5">
                    <input
                      id={category.type}
                      name={category.type}
                      type="checkbox"
                      checked={isSelected(category)}
                      onChange={() => {
                        void 0
                      }}
                      onClick={() => toggle(category)}
                      className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                  </div>
                  <div className="ml-1 sm:ml-3 text-sm">
                    <label
                      htmlFor={category.type}
                      className={classNames('font-medium', category_text)}
                    >
                      {category.type}
                    </label>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* submit button */}
        <div className="sm:col-span-2 mt-4">
          <button
            type="submit"
            disabled={hasAmount === undefined || sendAmount > hasAmount}
            onClick={e => {
              e.preventDefault()
              if (
                title === undefined ||
                title === '' ||
                title === null ||
                title.trim() === ''
              ) {
                alert('please input title')
              }
              if (selected.length === 0 || selected === undefined) {
                alert('please select a category')
                return
              }
              const categories = selected.map(category => category.type)
              const metadata = JSON.stringify({
                source,
                content: content?.trim() === '' ? undefined : content,
                startDate: startDate === null ? undefined : startDate,
                endDate: endDate === null ? undefined : endDate,
                categories: [...new Set(categories)]
              })
              onSubmit!(title!.trim(), metadata)
            }}
            className="main-button"
          >
            {hasAmount
              ? `Spend ${sendAmount} CCS to Create Activity. Has ${hasAmount} in wallet`
              : 'loading...'}
          </button>
        </div>
      </form>
    </div>
  )
}
