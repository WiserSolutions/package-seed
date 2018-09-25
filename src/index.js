#!/usr/bin/env node

/* eslint-disable no-console */
import { ncp } from 'ncp'
import { resolve, basename } from 'path'
import { renameSync } from 'fs'

import { ReplaceStream } from './utils'

const seedRoot = resolve(__dirname, '../seed')
const cwd = resolve('./')
const packageName = basename(cwd)

console.log(`Copying package-seed contents from ${seedRoot} to ${cwd}`)
ncp(
  seedRoot,
  cwd,
  {
    transform: (read, write) => read.pipe(new ReplaceStream(/<PACKAGE_NAME>/g, packageName)).pipe(write)
  },
  err => {
    if (err) return console.error(err)

    // seed `package.json` can't be stored under that name, because it messes with NPM publish
    // so it's stored as `package-seed.json` and renamed only when in place
    renameSync(resolve(cwd, 'package-seed.json'), resolve(cwd, 'package.json'))

    console.log('Package seeded. Don\'t forget to add description and usage docs.')
  }
)
