import { classDefinition } from './classDefinition'
import ts from 'typescript';

describe('classDefinition', () => {
  it('should return the correct definition for a class with no inheritance', () => {
    const sourceFile = ts.createSourceFile(
      'test.ts',
      'class TestClass {}',
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TS
    );
    const classDecl = sourceFile.statements[0] as ts.ClassDeclaration;
    const definition = classDefinition(classDecl);
    expect(definition).toBe('class TestClass');
  });

  it('should return the correct definition for a class with inheritance', () => {
    const sourceFile = ts.createSourceFile(
      'test.ts',
      'class TestClass extends BaseClass {}',
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TS
    );
    const classDecl = sourceFile.statements[0] as ts.ClassDeclaration;
    const definition = classDefinition(classDecl)
    expect(definition).toBe('class TestClass extends BaseClass')
  });
});
