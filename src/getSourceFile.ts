import fs from 'fs'
import ts from 'typescript'

export function getSourceFile(file: string, program: ts.Program) {
  const programFile = program.getSourceFile(file)
  if (programFile) {
    return programFile
  } else {
    return ts.createSourceFile(
      file,
      fs.readFileSync(file).toString(),
      ts.ScriptTarget.ES2015,
      true
    )
  }
}

