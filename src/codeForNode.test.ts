import ts from 'typescript'
import { codeForNode } from './codeForNode'
import { findSymbolNodes } from './findSymbolNodes'

describe('codeForNode', () => {
  it('should return the code for a node', () => {
    const code = `class MyClass {
    myMethod() {}
}`

    const sourceFile = ts.createSourceFile('temp.ts', code, ts.ScriptTarget.Latest, /*setParentNodes */ true)
    const nodes = findSymbolNodes(code, ['MyClass'])
    const [nodeCode, line] = codeForNode(nodes[0], sourceFile)

    // Assert that we got the correct code and line number
    expect(nodeCode.trim()).toBe('class MyClass {\n    myMethod() {}\n}')
    expect(line).toBe(1)
  })
})
