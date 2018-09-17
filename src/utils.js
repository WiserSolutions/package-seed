import { Transform } from 'stream'
import { readFileSync } from 'fs'
import { join, resolve } from 'path'

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

export function getGitIgnoreItems(dir) {
  return readFileSync(resolve(join(dir, '.gitignore')), { encoding: 'utf8' })
    .split('\n')
    .filter(line => /^[^#]/.test(line))
}
