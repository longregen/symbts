import ts from 'typescript'

export function classDefinition(classNode: ts.ClassDeclaration): string {
  const className = classNode.name?.getText() || 'anonymous'
  const heritageClause = classNode.heritageClauses?.[0]
  const extendsClass = heritageClause?.types?.[0]?.expression.getText() || ''
  const extendsKeyword = extendsClass ? ` extends ${extendsClass}` : ''
  return `class ${className}${extendsKeyword}`
}
