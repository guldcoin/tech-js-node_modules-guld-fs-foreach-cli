#!/usr/bin/env node
const foreach = require('guld-fs-foreach')
const program = require('commander')
const spawn = require('guld-spawn')
const VERSION = require('./package.json').version

/* eslint-disable no-console */
program
  .name('guld-fs-foreach')
  .usage('<dir> <command> [flags...]', 'Run command for each file and/or directory in the given directory.')
  .description('Run command for each file and/or directory in the given directory.')
  .version(VERSION)
  .action(async (dir, c, flags) => {
    var moreArgs
    if (flags && flags.rawArgs) moreArgs = flags.rawArgs.slice(4)
    else moreArgs = []
    return foreach(dir, async f => {
      if (f === '') return
      return spawn(c, '', [f])
    }, moreArgs)
  })

program.parse(process.argv)
