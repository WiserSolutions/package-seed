import { Transform } from 'stream'

export class ReplaceStream extends Transform {
  constructor(transforms) {
    super()
    Object.assign(this, { transforms })
  }
  _transform(chunk, encoding, callback) {
    const transformed = this.transforms.reduce(
      (acc, [pattern, replacement]) => acc.replace(pattern, replacement),
      chunk.toString()
    )
    this.push(Buffer.from(transformed))
    callback()
  }
}
