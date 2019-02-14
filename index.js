#!/usr/bin/env node
'use strict';

const commander = require('commander');
const createComponent = require('./src/createComponent');
const createAction = require('./src/createAction');
const createReducer = require('./src/createReducer');
const createSaga = require('./src/createSaga');

commander
  .command('c <component>')
  .option('-n, --nofolder', 'Do not wrap component in folder')
  .option('-o, --observable', 'Make observable')
  .option('-s, --style', 'With stylesheet')
  .option('-c, --container', 'Create Container component')
  .option('-f, --functional', 'Create functional component')
  .action(createComponent);

commander
  .command('action <action>')
  .action(createAction);

commander
  .command('reducer <reducer>')
  .option('-s, --status', 'with constant STATUS')
  .action(createReducer);

commander
  .command('saga <saga>')
  .action(createSaga);

commander.parse(process.argv);
