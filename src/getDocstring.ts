import ts from 'typescript'

export function getDocstring(node: ts.Node): string | undefined {
  if ('jsDoc' in node && node.jsDoc) {
    return (node.jsDoc as ts.JSDoc[])
      .filter(doc => doc.kind === ts.SyntaxKind.JSDoc)
      .map(doc => (doc as ts.JSDoc).comment || '')
      .join('\n')
      .trim()
  }

  return undefined
}

