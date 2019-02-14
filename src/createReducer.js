const shell = require('shelljs');
const template = require('./../template/reducerTemplate');
const fs = require('fs-extra');
const replace = require('replace');
const colors = require('colors');

let status = false;

module.exports = async function createReducer(reducer, cmd) {
  newReducerPath = reducer;
  cmd.status ? status = true : status = false;
  if (!fs.existsSync('./src/reducer')) {
    fs.mkdir('./src/reducer', { recursive: true }, (err) => {
      if (err) console.log(err);
      else console.log('Folder reducer created');
    });
  }
  newReducerPath = `./src/reducer/${reducer}`;

  let template = await buildTemplateReducer();
  writeFile(template, reducer, newReducerPath);
};

function buildTemplateReducer() {
  let imports = [template.imports.flow];
  if (status) {
    imports.push(template.imports.status)
  }
  let body = [template.main].join('\n');
  let exported = [template.exported.default];
  return imports.join('\n') + '\n' + body + '\n' + exported;
}

function capitalize(comp) {
  return comp[0].toUpperCase() + comp.substring(1, comp.length);
}

function writeFile(template, reducer, path) {
  let redu = reducer.split('/');
  redu = redu[redu.length - 1];
  if (!fs.existsSync(`${path}.js`)) {
    fs.outputFile(`${path}Reducer.js`, template, (err) => {
      if (err) throw err;
      replace({
        regex: ":className",
        replacement: capitalize(redu),
        paths: [`${path}Reducer.js`],
        recursive: false,
        silent: true,
      });
      console.log(`Reducer ${redu} created at ${path}Reducer.js`.cyan)
    });
  } else {
    console.log(`Reducer ${redu} allready exists at ${path}Reducer.js, choose another name if you want to create a new reducer`.red)
  }
}
