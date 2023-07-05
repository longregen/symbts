import { simpleMatch } from './simpleMatch'

describe('simpleMatch', () => {
  it('should match exact names', () => {
    expect(simpleMatch('myFunction', 'myFunction')).toBeTruthy()
    expect(simpleMatch('myFunction', 'myMethod')).toBeFalsy()
  })

  it('should match names with wildcards', () => {
    expect(simpleMatch('myFunction', 'my*')).toBeTruthy()
    expect(simpleMatch('myFunction', '*Function')).toBeTruthy()
    expect(simpleMatch('myFunction', 'my*ion')).toBeTruthy()
    expect(simpleMatch('myFunction', '*')).toBeTruthy()
    expect(simpleMatch('myFunction', '*Func*')).toBeTruthy()
    expect(simpleMatch('myFunction', 'myF*ion')).toBeTruthy()

    expect(simpleMatch('myFunction', 'your*')).toBeFalsy()
    expect(simpleMatch('myFunction', '*Method')).toBeFalsy()
    expect(simpleMatch('myFunction', 'my*meth')).toBeFalsy()
  })
})

