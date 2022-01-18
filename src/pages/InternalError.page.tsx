import React from 'react'

export default function InternalError() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex flex-col flex-grow justify-center px-4 sm:px-6 lg:px-8 mx-auto w-full max-w-7xl">
        <div className="py-16">
          <div className="text-center">
            <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
              An unexpected error has occurred
            </h1>
            <h3 className="mt-6 font-medium ">
              Please send bugs to{' '}
              <a
                href="mailto: admin@cryptochasers.co"
                target="_blank"
                rel="noreferrer"
                className="text-main underline"
              >
                admin@cryptochasers.co
              </a>
            </h3>
            <div className="mt-6">
              <a href="/" className="text-base font-light underline">
                Go back home<span aria-hidden="true"> &rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
