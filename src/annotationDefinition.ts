import ts from 'typescript'

export function annotationDefinition(annotation: ts.TypeNode | undefined): string {
  if (!annotation) {
    return ''
  }
  switch (annotation.kind) {
  case ts.SyntaxKind.StringKeyword:
    return 'string'
  case ts.SyntaxKind.NumberKeyword:
    return 'number'
  case ts.SyntaxKind.BooleanKeyword:
    return 'boolean'
  case ts.SyntaxKind.ArrayType:
    const arrayType = annotation as ts.ArrayTypeNode
    return `${annotationDefinition(arrayType.elementType)}[]`
  case ts.SyntaxKind.TupleType:
    const tupleType = annotation as ts.TupleTypeNode
    const elements = tupleType.elements.map(annotationDefinition)
    return `[${elements.join(', ')}]`
  default:
    return '?'
  }
}
