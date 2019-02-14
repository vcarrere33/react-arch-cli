const shell = require('shelljs');
const template = require('./../template/componentTemplate');
const fs = require('fs-extra');
const replace = require('replace');
const colors = require('colors');

let nofolder = false;
let functional = false;
let container = false;
let observable = false;
let stylesheet = false;
let newCompPath;
let newContPath;

module.exports = async function createComponent(component, cmd) {
  newCompPath = component;
  cmd.nofolder ? nofolder = true : nofolder = false;
  cmd.functional ? functional = true : functional = false;
  // cmd.container ? container = true : functional = false;
  cmd.observable ? observable = true : observable = false;
  cmd.style ? stylesheet = true : stylesheet = false;
  if (fs.existsSync('./src/components')) {
    fs.mkdir('./src/components', { recursive: true }, (err) => {
      if (err) console.log(err);
      else console.log('Folder components created');
    });
  }        
  newCompPath = `./src/components/${component}`;

  // if (fs.existsSync('./src/containers')) {
  //   newContPath = `./src/containers/${component}`;
  // }
  let template = await buildTemplateComponent();
  writeFile(template, component, newCompPath);
  // let templateContainer = await buildTemplateComponents();
  // writeFile(templateContainer, component, newContPath);
};

function buildTemplateComponent() {
  let imports = [template.imports.react, template.imports.propTypes];
  if (observable) {
    imports.push(template.imports.observable)
  }
  if (stylesheet) {
    imports.push(template.imports.stylesheet);
  }
  let body = functional ? [template.functional] : [template.main].join('\n');
  let exported = observable ? [template.exported.observable] : [template.exported.default];
  return imports.join('\n') + '\n' + body + '\n' + exported;
}

function capitalize(comp) {
  return comp[0].toUpperCase() + comp.substring(1, comp.length);
}

function writeFile(template, component, path) {
  if (nofolder) {
    strArr = newCompPath.split('/');
    strArr.splice(strArr.length - 1, 1);
    path = strArr.join('/');
  }
  let comp = component.split('/');
  comp = comp[comp.length - 1];
  if (stylesheet) {
    if (!fs.existsSync(`${path}.scss`)) {
      console.log('creating syles');
      fs.outputFileSync(`${path}.scss`, '');
      console.log(`Stylesheet ${comp} created at ${path}.scss`.cyan)
    } else {
      console.log(`Stylesheet ${comp} allready exists at ${path}.scss, choose another name if you want to create a new stylesheet`.red)
    }
  }
  if (!fs.existsSync(`${path}.js`)) {
    fs.outputFile(`${path}.js`, template, (err) => {
      if (err) throw err;
      replace({
        regex: ":className",
        replacement: capitalize(comp),
        paths: [`${path}.js`],
        recursive: false,
        silent: true,
      });
      console.log(`Component ${comp} created at ${path}.js`.cyan)
    });
  } else {
    console.log(`Component ${comp} allready exists at ${path}.js, choose another name if you want to create a new component`.red)
  }
}
