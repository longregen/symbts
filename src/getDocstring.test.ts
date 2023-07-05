import ts from 'typescript'
import { getDocstring } from './getDocstring'
import { expect } from 'chai'

describe('getDocstring', () => {
  it('should return the docstring of a function', () => {
    const code = `
      /**
       * This is a test function.
       */
      function testFunc() {}`

    const sourceFile = ts.createSourceFile('temp.ts', code, ts.ScriptTarget.Latest, /*setParentNodes */ true)
    const func = sourceFile.statements[0] as ts.FunctionDeclaration

    const docstring = getDocstring(func)
    expect(docstring).to.equal('This is a test function.')
  })

  it('should return undefined if a function has no docstring', () => {
    const code = 'function testFunc() {}'

    const sourceFile = ts.createSourceFile('temp.ts', code, ts.ScriptTarget.Latest, /*setParentNodes */ true)
    const func = sourceFile.statements[0] as ts.FunctionDeclaration

    const docstring = getDocstring(func)
    expect(docstring).to.be.undefined
  })
})
