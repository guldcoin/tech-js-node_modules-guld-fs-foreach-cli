#!/usr/bin/env node
const foreach = require('guld-fs-foreach')
const program = require('commander')
const spawn = require('guld-spawn').getSpawn()
const thispkg = require(`${__dirname}/package.json`)

/* eslint-disable no-console */
program
  .name(thispkg.name.replace('-cli', ''))
  .version(thispkg.version)
  .description(thispkg.description)
//  .description('Run command for each file and/or directory in the given directory.')
  .usage('<dir> <command> [flags...]', 'Run command for each file and/or directory in the given directory.')
  .action(async (dir, c, flags) => {
    var moreArgs
    if (flags && flags.rawArgs) moreArgs = flags.rawArgs.slice(4)
    else moreArgs = []
    return foreach(dir, async f => {
      if (f === '') return
      return spawn(c, '', [f])
    }, moreArgs)
  })

if (process.argv.length === 2) {
  program.help()
} else if (process.argv.length > 2) {
  program.parse(process.argv)
}
module.exports = program
