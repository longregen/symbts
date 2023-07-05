import { match } from './match'

describe('match', () => {
  it('should match names in the symbols list', () => {
    expect(match('myFunction', ['myFunction', 'myClass.myMethod', '*'])).toBeTruthy()
    expect(match('myClass.myMethod', ['myFunction', 'myClass.myMethod', '*'])).toBeTruthy()
    expect(match('myClass', ['myFunction', 'myClass.myMethod', '*'])).toBeTruthy()

    expect(match('myFunction', ['yourFunction', 'myClass.yourMethod', '*Method'])).toBeFalsy()
    expect(match('myClass.myMethod', ['yourFunction', 'myClass.yourMethod', '*Method'])).toBeFalsy()
    expect(match('myClass', ['yourFunction', 'myClass.yourMethod', '*Method'])).toBeFalsy()
  })

  it('should match names with wildcards in the symbols list', () => {
    expect(match('myFunction', ['my*', 'myClass.my*', '*'])).toBeTruthy()
    expect(match('myClass.myMethod', ['my*', 'myClass.my*', '*'])).toBeTruthy()
    expect(match('myClass', ['my*', 'myClass.my*', '*'])).toBeTruthy()

    expect(match('myFunction', ['your*', 'myClass.your*', '*Method'])).toBeFalsy()
    expect(match('myClass.myMethod', ['your*', 'myClass.your*', '*Method'])).toBeFalsy()
    expect(match('myClass', ['your*', 'myClass.your*', '*Method'])).toBeFalsy()
  })
})
