import ts from 'typescript'
import { checkAndPrintSymbol } from './checkAndPrintSymbol'
import { getSourceFile } from './getSourceFile'

export function processFile(filePath: string, lookForSymbols: string[], options: any, program: ts.Program) {
  const sourceFile = getSourceFile(filePath, program)
  console.log(`enter ${filePath}, source file is`, sourceFile)

  if (!sourceFile) {
    console.error(`Unexpected empty sourceFile: ${filePath}}`)
    return
  }
  const analyze = (node: ts.Node) => {
    if (!node) {
      return
    }
    const text = node.getFullText()
    if (lookForSymbols.includes(text)) {
      checkAndPrintSymbol(node)
    } else {
      ts.forEachChild(node, analyze)
    }
  }
  sourceFile.forEachChild(analyze)
}

