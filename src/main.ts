import ts from 'typescript'
import { functionDefinition } from './functionDefinition'

const fileNames = ['./src/myFile.ts']
const compilerOptions: ts.CompilerOptions = { allowJs: true }
const program = ts.createProgram(fileNames, compilerOptions)
const typeChecker = program.getTypeChecker()

