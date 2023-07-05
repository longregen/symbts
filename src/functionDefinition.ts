import ts from 'typescript'
import { getTypeString } from './getTypeString'

export function functionDefinition(typeChecker: ts.TypeChecker, func: ts.FunctionDeclaration): string {
  const funcName = func.name?.getText() || 'anonymous'
  const args = func.parameters.map(p => {
    const argName = p.name.getText()
    const argType = p.type ? `: ${getTypeString(typeChecker, typeChecker.getTypeFromTypeNode(p.type))}` : ''
    const initializer = p.initializer ? ` = ${p.initializer.getText()}` : ''
    return `${argName}${argType}${initializer}`
  }).join(', ')

  const returnType = func.type ? `: ${getTypeString(typeChecker, typeChecker.getTypeFromTypeNode(func.type))}` : ''
  const functionKeyword = ts.isArrowFunction(func) ? 'const' : 'function'
  const equalsToken = ts.isArrowFunction(func) ? ' =' : ''
  const funcKeyword = func.modifiers?.some(m => m.kind === ts.SyntaxKind.AsyncKeyword) ? 'async ' : ''

  return `${funcKeyword}${functionKeyword} ${funcName}${equalsToken}(${args})${returnType}`
}
