import { Command } from 'commander'
import ts from 'typescript'

import { processDirectory } from './processDirectory'

export const program = new Command()
function getTsProgram() {
  const configPath = ts.findConfigFile('./', ts.sys.fileExists, 'tsconfig.json')
  if (!configPath) {
    return ts.createProgram({ rootNames: [], options: {} })
  }
  const configFile = ts.readConfigFile(configPath, ts.sys.readFile).config
  const parsedConfig = ts.parseJsonConfigFileContent(configFile, ts.sys, './')
  return ts.createProgram(parsedConfig.fileNames, parsedConfig.options)
}

program
  .version('1.0.0')
  .arguments('<symbols>')
  .option('-d, --directory <directory>', 'Directories to search', (val: any, dirs) => dirs.concat(val), [])
  .option('-x, --exclude <dir>', 'Directories to exclude', (val: any, dirs) => dirs.concat(val), [])
  .option('-s, --signatures', 'Show just function and class signatures')
  .option('-n, --no-file', "Don't include the # File: comments in the output")
  .action((symbols, option) => {
    option.exclude = option.exclude.concat(['node_modules', '.git'])
    const directories = option.directory.length ? option.directory : ['.']
    directories.forEach((dir: string) => processDirectory(dir, symbols, option, getTsProgram()))
  })

program.parse(process.argv)

