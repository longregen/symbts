import * as chai from "chai"
import { createSourceFile, ScriptTarget, createProgram, isFunctionDeclaration, Node } from "typescript"
import { getSymbolString } from "./getSymbolString"

const expect = chai.expect

describe("getSymbolString", function () {

  const sourceCode = `
        /**
         * This is a test function
         */
        function testFunction() {
            // do nothing
        }
    `

  const filePath = "test.ts"
  const sourceFile = createSourceFile(filePath, sourceCode, ScriptTarget.ES2015, true)
  const program = createProgram([filePath], {})
  let funcNode: Node

  sourceFile.forEachChild((node) => {
    if (isFunctionDeclaration(node)) {
      funcNode = node
    }
  })

  // Define the set of options to test.
  const options = [
    { nofile: true, docstring: true, signature: true },
    { nofile: true, docstring: true, signature: false },
    { nofile: true, docstring: false, signature: true },
    { nofile: true, docstring: false, signature: false },
    { nofile: false, docstring: true, signature: true },
    { nofile: false, docstring: true, signature: false },
    { nofile: false, docstring: false, signature: true },
    { nofile: false, docstring: false, signature: false },
  ]

  options.forEach((option) => {
    it(`should return correct string for options: ${JSON.stringify(option)}`, function () {
      const result = getSymbolString(filePath, option, sourceFile, funcNode!, program)
      if (option.nofile) {
        expect(result).not.to.contain(`# File: ${filePath}`)
      } else {
        expect(result).to.contain(`# File: ${filePath}`)
      }
      if (option.docstring) {
        expect(result).to.contain('This is a test function')
      } else {
        expect(result).not.to.contain('This is a test function')
      }
      // Assuming that the `signature` would be function name in this case
      if (option.signature) {
        expect(result).to.contain('testFunction')
      } else {
        expect(result).not.to.contain('testFunction')
      }
    })
  })
})
