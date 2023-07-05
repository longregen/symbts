import ts from 'typescript'

export function getTypeString(typeChecker: ts.TypeChecker, type: ts.Type): string {
  return typeChecker.typeToString(type)
}

