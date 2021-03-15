import { v2 } from 'streamtest'

import { ReplaceStream } from './utils'

const { fromChunks, toText } = v2

describe('ReplaceStream', () => {
  it('replaces patterns with replacements', () =>
    new Promise((resolve, reject) =>
      fromChunks([Buffer.from('see what happens'), Buffer.from(" or what doesn't")])
        .pipe(
          new ReplaceStream([
            ['what', 'that'],
            [/ (.)/g, '_$1']
          ])
        )
        .pipe(
          toText((err, text) => {
            if (err) return reject(err)

            expect(text).toEqual("see_that_happens_or_that_doesn't")
            resolve()
          })
        )
    ))
})
