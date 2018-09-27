#!/usr/bin/env node

/* eslint-disable no-console */
import { ncp } from 'ncp'
import { resolve, basename } from 'path'
import { renameSync } from 'fs'
import parseArgs from 'minimist'

import { ReplaceStream } from './utils'

const { description } = parseArgs(process.argv, {
  string: ['description'],
  alias: { d: 'description' }
})

const seedRoot = resolve(__dirname, '../seed')
const cwd = resolve('./')
const packageName = basename(cwd)

const renameSeedFile = name => renameSync(resolve(cwd, `${name}.seed`), resolve(cwd, name))

console.log(`Copying package-seed contents from ${seedRoot} to ${cwd}`)
const transforms = [
  [/<PACKAGE_NAME>/g, packageName],
  [/<PACKAGE_DESCRIPTION>/g, description]
]
ncp(
  seedRoot,
  cwd,
  {
    transform: (read, write) => read.pipe(new ReplaceStream(transforms)).pipe(write)
  },
  err => {
    if (err) return console.error(err)

    // seed `package.json` and `.gitignore` can't be stored under those names, because it messes with NPM publish
    // so they're stored as `<NAME>.seed` and renamed only when in place
    renameSeedFile('package.json')
    renameSeedFile('.gitignore')

    console.log('Package seeded. Don\'t forget to add description and usage docs.')
  }
)
