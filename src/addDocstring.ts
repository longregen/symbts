import ts from 'typescript'
import { getDocstring } from './getDocstring'

export function addDocstring(definition: string, node: ts.Node, docstrings: boolean, isMethod: boolean): string {
  if (!docstrings) {
    return definition
  }

  const docstring = getDocstring(node)
  if (!docstring) {
    return definition
  }

  // Add comment markers to the docstring
  const wrapped = docstring.split('\n').map(line => `${isMethod ? '        ' : '    '} * ${line}`).join('\n')
  return `${definition}\n${isMethod ? '        ' : '    '}/**\n${wrapped}\n${isMethod ? '        ' : '    '} */`
}

