export default function NotFound() {
  return (
    <div className="flex flex-col pt-16 pb-12 min-h-screen bg-white">
      <main className="flex flex-col flex-grow justify-center px-4 sm:px-6 lg:px-8 mx-auto w-full max-w-7xl">
        <div className="flex flex-shrink-0 justify-center">
          <a href="/" className="inline-flex">
            <span className="sr-only">Workflow</span>
            <img
              className="w-auto h-12"
              src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
              alt=""
            />
          </a>
        </div>
        <div className="py-16">
          <div className="text-center">
            <p className="text-sm font-semibold tracking-wide text-indigo-600 uppercase">
              404 error
            </p>
            <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
              Page not found.
            </h1>
            <p className="mt-2 text-base text-gray-500">
              Sorry, we couldn’t find the page you’re looking for.
            </p>
            <div className="mt-6">
              <a
                href="#"
                className="text-base font-medium text-indigo-600 hover:text-indigo-500"
              >
                Go back home<span aria-hidden="true"> &rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </main>
      <footer className="flex-shrink-0 px-4 sm:px-6 lg:px-8 mx-auto w-full max-w-7xl">
        <nav className="flex justify-center space-x-4">
          <a
            href="#"
            className="text-sm font-medium text-gray-500 hover:text-gray-600"
          >
            Contact Support
          </a>
          <span
            className="inline-block border-l border-gray-300"
            aria-hidden="true"
          />
          <a
            href="#"
            className="text-sm font-medium text-gray-500 hover:text-gray-600"
          >
            Status
          </a>
          <span
            className="inline-block border-l border-gray-300"
            aria-hidden="true"
          />
          <a
            href="#"
            className="text-sm font-medium text-gray-500 hover:text-gray-600"
          >
            Twitter
          </a>
        </nav>
      </footer>
    </div>
  )
}
