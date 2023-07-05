import ts from 'typescript';
import { addDocstring } from './addDocstring';

describe('addDocstring', () => {
  const testFunc = `/**
 * This is a test function
 */
function testFunc() {}`;

  const sourceFile = ts.createSourceFile('temp.ts', testFunc, ts.ScriptTarget.Latest);
  const functionNode = sourceFile.statements[0] as ts.FunctionDeclaration;

  it('should append the docstring if docstrings are enabled', () => {
  const func = ts.factory.createFunctionDeclaration(
    [],
    undefined,
    'testFunc',
    undefined,
    [],
    ts.factory.createKeywordTypeNode(ts.SyntaxKind.VoidKeyword),
    ts.factory.createBlock([])
  );

  const result = addDocstring(testFunc, func, true, false);

  const expected = `/**\n * This is a test function\n */\nfunction testFunc() {}`;
  expect(result).toBe(expected);
});


  it('should not append the docstring if docstrings are disabled', () => {
    const result = addDocstring('function testFunc()', functionNode, false, false);
    expect(result).toBe('function testFunc()');
  });

  it('should indent the docstring correctly for methods', () => {
    const result = addDocstring('function testFunc()', functionNode, true, true);
    const expected = `function testFunc()
        /**
         * This is a test function
         */`;
    expect(result).toBe(expected);
  });

  it('should not append anything if there is no docstring', () => {
    const noDocFunc = ts.factory.createFunctionDeclaration(
      undefined, // decorators
      undefined, // modifiers
      'testFunc', // name
      undefined, // typeParameters
      [], // parameters
      undefined, // type
      ts.factory.createBlock([]), // body
    );
    const result = addDocstring('function testFunc()', noDocFunc, true, false);
    expect(result).toBe('function testFunc()');
  });
});

