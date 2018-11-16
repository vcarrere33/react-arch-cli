import shell from 'shelljs';
import template from './../template/componentTemplate';
import fs from 'fs-extra';

let nofolder = false;
let functional = false;
let container = false;
let observable = false;
let stylesheet = false;
let newCompPath;
let newContPath;

export default function createComponent(component, cmd) {
  newCompPath = component;
  cmd.nofolder && nofolder = true;
  cmd.functional && functional = true;
  cmd.container && container = true;
  cmd.observable && observable = true;
  cmd.style && stylesheet = true;
  if (fs.existsSync('./src/components')) {
    newCompPath = `./src/components/${component}`;
  }
  if (fs.existsSync('./src/containers')) {
    newContPath = `./src/containers/${component}`;
  }
  let template = await buildTemplateComponents();
  writeFile(template, component, newCompPath);
  let templateContainer = await buildTemplateComponents();
  writeFile(templateContainer, component, newContPath);
};

function buildTemplate() {
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
    console.log(path);
  }
  let comp = component.split('/');
  comp = comp[comp.length - 1];
  if (path) {
    path = path + '/' + capitalize(comp);
  } else {
    path = capitalize(comp);
  }
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
