const shell = require('shelljs');
const template = require('./../template/sagaTemplate');
const fs = require('fs-extra');
const replace = require('replace');
const colors = require('colors');

module.exports = async function createSaga(saga, cmd) {
  newSagaPath = saga;
  if (!fs.existsSync('./src/saga')) {
    fs.mkdir('./src/saga', { recursive: true }, (err) => {
      if (err) console.log(err);
      else console.log('Folder saga created');
    });
  }
  newSagaPath = `./src/saga/${saga}`;

  let template = await buildTemplateSaga();
  writeFile(template, saga, newSagaPath);
};

function buildTemplateSaga() {
  let imports = [template.imports.flow, template.imports.saga, template.imports.status, template.imports.action];

  let body = [template.main].join('\n');
  let exported = [template.exported.default];
  return imports.join('\n') + '\n' + body + '\n' + exported;
}

function capitalize(comp) {
  return comp[0].toUpperCase() + comp.substring(1, comp.length);
}

function writeFile(template, saga, path) {
  let sag = saga.split('/');
  sag = sag[sag.length - 1];
  if (!fs.existsSync(`${path}.js`)) {
    fs.outputFile(`${path}Saga.js`, template, (err) => {
      if (err) throw err;
      replace({
        regex: ":className",
        replacement: capitalize(sag),
        paths: [`${path}Saga.js`],
        recursive: false,
        silent: true,
      });
      console.log(`saga ${sag} created at ${path}Saga.js`.cyan)
    });
  } else {
    console.log(`saga ${sag} allready exists at ${path}Saga.js, choose another name if you want to create a new saga`.red)
  }
}