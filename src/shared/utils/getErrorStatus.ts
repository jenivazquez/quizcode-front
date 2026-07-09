export function getErrorStatus(err: unknown): number | undefined {
  return (err as { response?: { status?: number } }).response?.status
}
