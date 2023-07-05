import ts from 'typescript'
import { functionDefinition } from '../src/functionDefinition'
import { expect } from 'chai'

describe('functionDefinition', () => {
  it('should return the correct definition for a function with no parameters or return type', () => {
    const sourceCode = `function testFunc() {}`;
    const sourceFile = createSourceFile(sourceCode);
    const typeChecker = getTypeCheckerForSourceFile(sourceFile);
    const func = sourceFile.statements[0] as ts.FunctionDeclaration;
    const definition = functionDefinition(typeChecker, func);
    expect(definition).to.equal('function testFunc()');
  });

  it('should return the correct definition for a function with multiple parameters', () => {
    const sourceCode = `function testFunc(arg1: string, arg2: number) {}`;
    const sourceFile = createSourceFile(sourceCode);
    const typeChecker = getTypeCheckerForSourceFile(sourceFile);
    const func = sourceFile.statements[0] as ts.FunctionDeclaration;
    const definition = functionDefinition(typeChecker, func);
    expect(definition).to.equal('function testFunc(arg1: string, arg2: number)');
  });

  it('should return the correct definition for a function with a return type', () => {
    const sourceCode = `function testFunc(): string { return ""; }`;
    const sourceFile = createSourceFile(sourceCode);
    const typeChecker = getTypeCheckerForSourceFile(sourceFile);
    const func = sourceFile.statements[0] as ts.FunctionDeclaration;
    const definition = functionDefinition(typeChecker, func);
    expect(definition).to.equal('function testFunc(): string');
  });

  it('should return the correct definition for a function with a complex return type', () => {
    const sourceCode = `function testFunc(): Array<number> { return [1, 2, 3]; }`;
    const sourceFile = createSourceFile(sourceCode);
    const typeChecker = getTypeCheckerForSourceFile(sourceFile);
    const func = sourceFile.statements[0] as ts.FunctionDeclaration;
    const definition = functionDefinition(typeChecker, func);
    expect(definition).to.equal('function testFunc(): number[]');
  });

  function createSourceFile(sourceCode: string): ts.SourceFile {
    return ts.createSourceFile(
      'test.ts',
      sourceCode,
      ts.ScriptTarget.Latest,
      /*setParentNodes */ true
    );
  }

  function getTypeCheckerForSourceFile(sourceFile: ts.SourceFile): ts.TypeChecker {
    const program = ts.createProgram([sourceFile.fileName], { allowJs: true });
    return program.getTypeChecker();
  }
});
