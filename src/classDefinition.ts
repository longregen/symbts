import ts from 'typescript'

export function classDefinition(classDef: ts.ClassDeclaration): string {
  const baseClasses = classDef.heritageClauses?.find(clause => clause.token === ts.SyntaxKind.ExtendsKeyword)
    ?.types.map(expr => expr.expression.getText()) || []
  const baseClassesStr = baseClasses.join(', ')

  return `class ${classDef.name?.text}${baseClassesStr ? ` extends ${baseClassesStr}` : ''}`
}
