export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export function formatError(errorMessage: string): string {
  try {
    return errorMessage.split('\n')[1]
  } catch (error) {
    return errorMessage
  }
}
