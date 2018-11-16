import commander from 'commander';
import createComponent from './src/createComponent';
import createAction from './src/createAction';
import createReducer from './src/createReducer';
import createSaga from './src/createReducer';

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
  .action(createReducer);

commander
  .command('saga <saga>')
  .action(createSaga);
