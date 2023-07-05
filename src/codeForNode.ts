import ts from 'typescript'

export function codeForNode(node: ts.Node, sourceFile: ts.SourceFile): [string, number] {
    const start = ts.getLineAndCharacterOfPosition(sourceFile, node.getStart(sourceFile)).line
    const end = ts.getLineAndCharacterOfPosition(sourceFile, node.getEnd()).line
    const lines = sourceFile.getFullText().split("\n").slice(start, end + 1)

    return [lines.join('\n'), start + 1]
}
