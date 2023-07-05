import { match } from './match'
import { expect } from 'chai'

describe('match', () => {
  it('should match names in the symbols list', () => {
    expect(match('myFunction', ['myFunction', 'myClass.myMethod', '*'])).to.be.true
    expect(match('myClass.myMethod', ['myFunction', 'myClass.myMethod', '*'])).to.be.true
    expect(match('myClass', ['myFunction', 'myClass.myMethod', '*'])).to.be.true

    expect(match('myFunction', ['yourFunction', 'myClass.yourMethod', '*Method'])).to.be.false
    expect(match('myClass.myMethod', ['yourFunction', 'myClass.yourMethod', '*Method'])).to.be.false
    expect(match('myClass', ['yourFunction', 'myClass.yourMethod', '*Method'])).to.be.false
  })

  it('should match names with wildcards in the symbols list', () => {
    expect(match('myFunction', ['my*', 'myClass.my*', '*'])).to.be.true
    expect(match('myClass.myMethod', ['my*', 'myClass.my*', '*'])).to.be.true
    expect(match('myClass', ['my*', 'myClass.my*', '*'])).to.be.true

    expect(match('myFunction', ['your*', 'myClass.your*', '*Method'])).to.be.false
    expect(match('myClass.myMethod', ['your*', 'myClass.your*', '*Method'])).to.be.false
    expect(match('myClass', ['your*', 'myClass.your*', '*Method'])).to.be.false
  })
})
