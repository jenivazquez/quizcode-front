export function getErrorMessage(err: unknown, genericMessage: string): string {
  const e = err as { response?: { data?: { message?: string } } }
  return e.response?.data?.message ?? genericMessage
}
