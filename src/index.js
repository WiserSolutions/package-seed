/* eslint-disable no-console */
import { ncp } from 'ncp'
import { resolve, join, basename } from 'path'

import { ReplaceStream, getGitIgnoreItems } from './utils'

const seedRoot = resolve(__dirname, '../')
const cwd = resolve('./')
const packageName = basename(cwd)

const ignore = new RegExp('^' + ['.git', ...getGitIgnoreItems(seedRoot)].map(dir => join(seedRoot, dir)).join('|'))

console.log(`Copying package-seed contents from ${seedRoot} to ${cwd}`)
ncp(
  seedRoot,
  cwd,
  {
    filter: path => !ignore.test(path),
    transform: (read, write) => read.pipe(new ReplaceStream(/package-seed/g, packageName)).pipe(write)
  },
  err => {
    if (err) return console.error(err)
    console.log('Package seed copied. Update your dependencies, README, and code :)')
  }
)
