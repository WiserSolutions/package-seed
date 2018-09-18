import { Transform } from 'stream'

export class ReplaceStream extends Transform {
  constructor(pattern, replacement) {
    super()
    Object.assign(this, { pattern, replacement })
  }
  _transform(chunk, encoding, callback) {
    this.push(Buffer.from(chunk.toString().replace(this.pattern, this.replacement)))
    callback()
  }
}
