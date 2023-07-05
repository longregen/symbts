import { simpleMatch } from './simpleMatch'

export function match(name: string, symbols: string[]): boolean {
  if (name === null) {
    return false
  }

  for (let search of symbols) {
    if (!search.includes('*')) {
      // Exact matches only
      if (name === search) {
        return true
      }
    } else if ((search.match(/\./g) || []).length === 1) {
      // wildcards are supported either side of the dot
      if (name.includes('.')) {
        const [classMatch, methodMatch] = search.split('.')
        const [className, methodName] = name.split('.')
        if (simpleMatch(className, classMatch) && simpleMatch(methodName, methodMatch)) {
          return true
        }
      }
    } else {
      if (simpleMatch(name, search) && !name.includes('.')) {
        return true
      }
    }
  }

  return false
}

