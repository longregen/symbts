import ts from 'typescript'
import { annotationDefinition } from './annotationDefinition'
import { expect } from 'chai'

describe('annotationDefinition', () => {
  it('should return the correct definition for a basic type', () => {
    const sourceFile = ts.createSourceFile(
      'test.ts',
      'let variable: string;',
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TS
    )
    const variableStatement = sourceFile.statements[0] as ts.VariableStatement
    const variableDeclaration = variableStatement.declarationList.declarations[0]
    const type = variableDeclaration.type
    const definition = annotationDefinition(type)
    expect(definition).to.equal('string')
  })

  it('should return the correct definition for an array type', () => {
    const sourceFile = ts.createSourceFile(
      'test.ts',
      'let variable: number[];',
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TS
    )
    const variableStatement = sourceFile.statements[0] as ts.VariableStatement
    const variableDeclaration = variableStatement.declarationList.declarations[0]
    const type = variableDeclaration.type
    const definition = annotationDefinition(type)
    expect(definition).to.equal('number[]')
  })

  it('should return the correct definition for a tuple type', () => {
    const sourceFile = ts.createSourceFile(
      'test.ts',
      'let variable: [string, number];',
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TS
    )
    const variableStatement = sourceFile.statements[0] as ts.VariableStatement
    const variableDeclaration = variableStatement.declarationList.declarations[0]
    const type = variableDeclaration.type
    const definition = annotationDefinition(type)
    expect(definition).to.equal('[string, number]')
  })
})
