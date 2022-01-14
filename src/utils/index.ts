export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export function formatError(errorMessage: string): string {
  if (errorMessage === undefined) {
    return 'unknow error, please try again'
  }
  try {
    const splited = errorMessage.split('\n')[1]
    return splited ?? errorMessage
  } catch (error) {
    return errorMessage
  }
}

export const urlRegex = new RegExp(
  `http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\(\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+`
)
