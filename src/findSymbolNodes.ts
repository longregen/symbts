import ts from 'typescript'

export function findSymbolNodes(code: string, symbols: string[]): ts.Node[] {
    const sourceFile = ts.createSourceFile('temp.ts', code, ts.ScriptTarget.Latest, /*setParentNodes */ true)
    const matches: ts.Node[] = []
    function visit(node: ts.Node) {
        if (ts.isClassDeclaration(node) || ts.isFunctionDeclaration(node)) {
            const name = node.name?.getText()
            if (name && symbols.includes(name)) {
                matches.push(node)
            }
        }
        ts.forEachChild(node, visit)
    }
    visit(sourceFile)
    return matches
}
