import moment, { Moment } from 'moment'

moment.locale('zh-cn')

export interface monthCalendarInfo {
  name: string
  days: daysCalendarInfo[]
}

export interface daysCalendarInfo {
  date: string
  isCurrentMonth?: boolean
  isToday?: boolean
}

export function getMonthCalendarInfo(m: Moment): monthCalendarInfo {
  const today = moment()
  const currentMonth = m.format('MM') // 当前月
  const curWeek = m.clone().startOf('month').weekday() // 当前月第一天的星期(索引值)
  const firstDayInMonth = m.clone().startOf('month') // 当前月第一天
  const firstDayAtCalendar = firstDayInMonth.subtract(curWeek - 1, 'days')
  // 日历的第一天

  const endWeek = m.clone().endOf('month').weekday() // 当前月最后一天的星期(索引值),周日是0
  const lastDayInMonth = m.clone().endOf('month') // 当前月最后一天
  const lastDayAtCalendar = lastDayInMonth.add(
    endWeek === 0 ? 0 : 7 - endWeek,
    'days'
  )

  const days: daysCalendarInfo[] = [
    { date: moment({ ...firstDayAtCalendar }).format('YYYY-MM-DD') }
  ]

  const firstDay = firstDayAtCalendar.clone()
  while (!firstDay.isSame(lastDayAtCalendar, 'date')) {
    firstDay.add(1, 'day')
    const dateObj: {
      date: string
      isCurrentMonth?: boolean
      isToday?: boolean
    } = {
      date: moment({ ...firstDay }).format('YYYY-MM-DD')
    }
    if (firstDay.format('MM') === currentMonth) {
      dateObj['isCurrentMonth'] = true
      if (firstDay.format('YYYY-MM-DD') === today.format('YYYY-MM-DD')) {
        dateObj['isToday'] = true
      }
    }
    days.push(dateObj)
  }
  const name = m.clone().format('MMMM')
  const combineObj = {
    name,
    days
  }

  return combineObj
}
