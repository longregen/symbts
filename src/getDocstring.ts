import ts from 'typescript'

export function getDocstring(node: ts.Node): string | undefined {
  // Check if the node has a jsDoc property
  if ('jsDoc' in node && node.jsDoc) {
    // If there are multiple JSDoc comments, concatenate them.
    // Otherwise, return the text of the single JSDoc comment.
    return (node.jsDoc as any).map((doc: any) => doc.getFullText()).join('\n')
  }

  // Return undefined if there's no JSDoc comment
  return undefined
}
