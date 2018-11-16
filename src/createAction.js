
export default function createAction(component, cmd) {
  newCompPath = component;
  cmd.nofolder ? nofolder = true : nofolder = false;
  cmd.functional ? functional = true : functional = false;
  cmd.observable ? observable = true : observable = false;
  cmd.style ? stylesheet = true : stylesheet = false;
  if (fs.existsSync('./src/components')) {
    newCompPath = `./src/components/${component}`;
  }
  let template = await buildTemplate();
  writeFile(template, component)
};
