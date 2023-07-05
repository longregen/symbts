import fs from 'fs'
import ts from 'typescript'
import path from 'path'
import { simpleMatch } from './simpleMatch'
import { processFile } from './processFile'

export function processDirectory(dir: string, lookForSymbols: string[], options: any, program: ts.Program) {
  if (options.exclude.reduce((prev: boolean, pattern: string) => prev || simpleMatch(dir, pattern), false)) {
    return
  }

  fs.readdirSync(dir, { withFileTypes: true }).forEach((file: { isDirectory: any, name: string }) => {
    const filePath = path.join(dir, file.name)
    console.log(`enter ${filePath}`)
    if (file.isDirectory()) {
      processDirectory(filePath, lookForSymbols, options, program)
    } else if (filePath.endsWith('.ts')) {
      processFile(filePath, lookForSymbols, options, program)
    }
  })
}
