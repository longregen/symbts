import ts from 'typescript'

export function getSymbolNodes(sourceFile: ts.SourceFile, checker: ts.TypeChecker, symbolNames: string[]): ts.Node[] {
  const foundNodes: ts.Node[] = []

  function visit(node: ts.Node) {
    if (ts.isIdentifier(node) && symbolNames.includes(node.text)) {
      foundNodes.push(node)
    }
    ts.forEachChild(node, visit)
  }

  visit(sourceFile)
  return foundNodes
}

