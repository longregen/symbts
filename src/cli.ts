import { Command } from 'commander'
import fs from 'fs'
import path from 'path'
import ts from 'typescript'

import { readFile } from './readFile'
import { findSymbolNodes } from './findSymbolNodes'
import { functionDefinition } from './functionDefinition'
import { classDefinition } from './classDefinition'
import { getDocstring } from './getDocstring'

export const program = new Command()
const typescriptProgram = ts.createProgram({ rootNames: [], options: {} });
const checker = typescriptProgram.getTypeChecker();

program
    .version('1.0.0')
    .arguments('<symbols>')
    .option('-f, --file <file>', 'Files to search', (val: any, files) => files.concat(val), [])
    .option('-d, --directory <directory>', 'Directories to search', (val: any, dirs) => dirs.concat(val), [])
    .option('--stdlib', 'Search the Python standard library')
    .option('-x, --exclude <dir>', 'Directories to exclude', (val: any, dirs) => dirs.concat(val), [])
    .option('-s, --signatures', 'Show just function and class signatures')
    .option('-n, --no-file', "Don't include the # File: comments in the output")
    .option('-i, --imports', "Show 'from x import y' lines for imported symbols")
    .option('-m, --module <module>', 'Modules to search within', (val: any, modules) => modules.concat(val), [])
    .option('--sys-path <path>', 'Calculate imports relative to these on sys.path', (val: any, paths) => paths.concat(val), [])
    .option('--docs', 'Show function and class signatures plus docstrings')
    .option('--count', 'Show count of matching symbols')
    .option('--silent', 'Silently ignore Python files with parse errors')
    .option('--async', 'Filter async functions')
    .option('--function', 'Filter functions')
    .option('--class', 'Filter classes')
    .option('--documented', 'Filter functions with docstrings')
    .option('--undocumented', 'Filter functions without docstrings')
    .option('--typed', 'Filter functions with type annotations')
    .option('--untyped', 'Filter functions without type annotations')
    .option('--partially-typed', 'Filter functions with partial type annotations')
    .option('--fully-typed', 'Filter functions with full type annotations')
    .option('--no-init', 'Filter to exclude any __init__ methods')
    .option('--replace', 'Replace matching symbol with text from stdin')
    .action((symbols) => {
      // Assume we're searching in current directory and all its subdirectories
      let directories = ['.']
  
      for (let dir of directories) {
        fs.readdirSync(dir, { withFileTypes: true }).forEach(async (file) => {
          if (file.isDirectory()) {
            directories.push(path.join(dir, file.name))
          } else if (file.name.endsWith('.py')) {
            const filePath = path.join(dir, file.name)
            for (let symbol of symbols) {
              if (functionDefinition(checker, symbol) || classDefinition(symbol)) {
                const docstring = getDocstring(symbol)
                console.log(`# File: ${filePath} Line: ${symbol.start.line}`)
                if (docstring) {
                  console.log(`"""${docstring}"""`)
                }
              }
            }
          }
        })
      }
    })

program.parse(process.argv)

