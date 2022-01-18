import React from 'react'

export default function NotFound() {
  return (
    <div className="flex flex-col pt-16 pb-12 min-h-screen bg-white">
      <main className="flex flex-col flex-grow justify-center px-4 sm:px-6 lg:px-8 mx-auto w-full max-w-7xl">
        <div className="py-16">
          <div className="text-center">
            <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
              Page not found.
            </h1>
            <div className="mt-6">
              <a href="/" className="text-base font-medium text-main">
                Go back home<span aria-hidden="true"> &rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
