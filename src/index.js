#!/usr/bin/env node

import { ncp } from 'ncp'
import { resolve, basename } from 'path'
import { renameSync } from 'fs'
import parseArgs from 'minimist'
import chalk from 'chalk'

import { ReplaceStream } from './utils'

const { description } = parseArgs(process.argv, {
  string: ['description'],
  alias: { d: 'description' }
})
const { white, red, green, cyan } = chalk
const path = cyan

const seedRoot = resolve(__dirname, '../seed')
const cwd = resolve('./')
const packageName = basename(cwd)

const log = (...args) => console.log(white.dim('package-seed:'), ...args) // eslint-disable-line no-console
const renameSeedFile = name => renameSync(resolve(cwd, `${name}.seed`), resolve(cwd, name))

log(`Copying package-seed contents from ${path(seedRoot)} to ${path(cwd)}`)
const transforms = [[/<PACKAGE_NAME>/g, packageName], [/<PACKAGE_DESCRIPTION>/g, description || 'Add a description...']]
ncp(
  seedRoot,
  cwd,
  {
    transform: (read, write) => read.pipe(new ReplaceStream(transforms)).pipe(write)
  },
  err => {
    if (err) {
      log(red('✖ Failed.'), err)
      process.exit(1)
      return
    }

    // seed `package.json` and `.gitignore` can't be stored under those names, because it messes with NPM publish
    // so they're stored as `<NAME>.seed` and renamed only when in place
    renameSeedFile('package.json')
    renameSeedFile('.gitignore')

    log(`${green('√ Done.')} Package seeded. Don't forget to add${description ? '' : ' description and'} usage docs.`)
  }
)
