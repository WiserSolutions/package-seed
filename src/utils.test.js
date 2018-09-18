import { v2 } from 'streamtest'

import { ReplaceStream } from './utils'

const { fromChunks, toText } = v2

describe('ReplaceStream', () => {
  it('replaces pattern with replacement', done => {
    fromChunks([Buffer.from('see what happens'), Buffer.from(" or what doesn't")])
      .pipe(new ReplaceStream('what', 'that'))
      .pipe(
        toText((err, text) => {
          if (err) return done(err)

          expect(text).toEqual("see that happens or that doesn't")
          done()
        })
      )
  })
})
