export function simpleMatch(name: string, pattern: string): boolean {
  const regex = new RegExp(`^${pattern.split('*').join('.*')}$`)
  return regex.test(name)
}


