import ts from 'typescript'
import { functionDefinition } from './functionDefinition'
import { getDocstring } from './getDocstring'
import { classDefinition } from './classDefinition'
import { codeForNode } from './codeForNode'

export function getSymbolString(filePath: string, option: any, sourceFile: ts.SourceFile, symbol: ts.Node, program: ts.Program) {
  let result = ''
  const signature = ts.isFunctionDeclaration(symbol)
    ? functionDefinition(program.getTypeChecker(), symbol)
    : ts.isClassDeclaration(symbol)
      ? classDefinition(symbol)
      : ''
  if (signature) {
    const docstring = getDocstring(symbol)
    if (!option.nofile) {
      result += `# File: ${filePath} Line: ${symbol.getStart(sourceFile)}\n`
    }
    if (option.docstring && docstring) {
      result += docstring
    }
    if (option.onlySignature) {
      result += signature
    } else {
      result += codeForNode(symbol, sourceFile)[0]
    }
  }
  return result
}

