import { simpleMatch } from './simpleMatch'
import { expect } from 'chai'

describe('simpleMatch', () => {
  it('should match exact names', () => {
    expect(simpleMatch('myFunction', 'myFunction')).to.be.true
    expect(simpleMatch('myFunction', 'myMethod')).to.be.false
  })

  it('should match names with wildcards', () => {
    expect(simpleMatch('myFunction', 'my*')).to.be.true
    expect(simpleMatch('myFunction', '*Function')).to.be.true
    expect(simpleMatch('myFunction', 'my*ion')).to.be.true
    expect(simpleMatch('myFunction', '*')).to.be.true
    expect(simpleMatch('myFunction', '*Func*')).to.be.true
    expect(simpleMatch('myFunction', 'myF*ion')).to.be.true

    expect(simpleMatch('myFunction', 'your*')).to.be.false
    expect(simpleMatch('myFunction', '*Method')).to.be.false
    expect(simpleMatch('myFunction', 'my*meth')).to.be.false
  })
})

