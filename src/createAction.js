const shell = require('shelljs');
const template = require('./../template/actionTemplate');
const fs = require('fs-extra');
const replace = require('replace');
const colors = require('colors');

module.exports = async function createAction(action, cmd) {
  newActionPath = action;
  if (!fs.existsSync('./src/action')) {
    fs.mkdir('./src/action', { recursive: true }, (err) => {
      if (err) console.log(err);
      else console.log('Folder action created');
    });
  }
  let template = await buildTemplateAction();
  writeFile(template, action, newActionPath);
};

function buildTemplateAction() {
  let imports = [template.imports.flow];

  let body = [template.main].join('\n');
  let exported = [template.exported.default];
  return imports.join('\n') + '\n' + body + '\n' + exported;
}

function capitalize(comp) {
  return comp[0].toUpperCase() + comp.substring(1, comp.length);
}

function writeFile(template, action, path) {
  let act = action.split('/');
  act = act[act.length - 1];
  if (!fs.existsSync(`${path}.js`)) {
    fs.outputFile(`${path}Action.js`, template, (err) => {
      if (err) throw err;
      replace({
        regex: ":className",
        replacement: capitalize(redu),
        paths: [`${path}Action.js`],
        recursive: false,
        silent: true,
      });
      console.log(`Action ${redu} created at ${path}Action.js`.cyan)
    });
  } else {
    console.log(`Action ${redu} allready exists at ${path}Action.js, choose another name if you want to create a new action`.red)
  }
}