import ts from 'typescript'
import { getSymbolNodes } from './getSymbolNodes'
import { expect } from 'chai'

describe('getSymbolNodes', () => {
  it('should return nodes with the specified symbols', () => {
    const code = `class MyClass {
  myMethod() {}
}

function myFunction() {}
`

    const sourceFile = ts.createSourceFile('temp.ts', code, ts.ScriptTarget.Latest, /*setParentNodes */ true)
    const program = ts.createProgram({ rootNames: ['temp.ts'], options: {} })
    const checker = program.getTypeChecker()

    const symbols = ['MyClass', 'myFunction']
    const nodes = getSymbolNodes(sourceFile, checker, symbols)

    // Assert that we found the correct number of nodes
    expect(nodes.length).to.equal(symbols.length)
  })
})

