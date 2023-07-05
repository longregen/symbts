import ts from 'typescript'
import { getSourceFile } from './getSourceFile'
import { getSymbolString } from './getSymbolString'
import { simpleMatch } from './simpleMatch'

export function processFile(filePath: string, lookForSymbols: string[], options: any, program: ts.Program) {
  const sourceFile = getSourceFile(filePath, program)
  if (!sourceFile) {
    console.error(`Unexpected empty sourceFile: ${filePath}}`)
    return
  }
  const analyze = (node: ts.Node) => {
    if (!node) {
      return
    }
    if (ts.isFunctionDeclaration(node) || ts.isClassDeclaration(node)) {
      try {
        const text = node.name?.escapedText || ''
        if (lookForSymbols.map(pattern => simpleMatch(text, pattern)).reduce((a, b) => a || b, false)) {
          console.log(getSymbolString(filePath, options, sourceFile, node, program))
        }
      } catch (e) {
        console.log(node)
        throw e
      }
    } else {
      ts.forEachChild(node, analyze)
    }
  }
  sourceFile.forEachChild(analyze)
}

