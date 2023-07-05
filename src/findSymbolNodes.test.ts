import { findSymbolNodes } from './findSymbolNodes'

describe('findSymbolNodes', () => {
    it('should find nodes with specified symbols', () => {
        const code = `
        class MyClass {
            myMethod() {}
        }

        function myFunction() {}
        `

        const symbols = ['MyClass', 'myFunction']
        const nodes = findSymbolNodes(code, symbols)

        // Assert that we found the correct number of nodes
        expect(nodes.length).toBe(symbols.length)
    })
})
