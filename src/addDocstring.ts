import ts from 'typescript'

export function addDocstring(definition: string, node: ts.Node, docstrings: boolean, isMethod: boolean): string {
  if (!docstrings) {
    return definition
  }

  const docstring = getDocstring(node) // Assuming getDocstring function exists
  if (!docstring) {
    return definition
  }

  const wrapped = docstring.split('\n').map(line => `${isMethod ? '        ' : '    '}${line}`).join('\n')
  return `${definition}\n${wrapped}`
}

