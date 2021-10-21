export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export function formatError(errorMessage: string): string {
  return errorMessage.split('\n')[1]
}
