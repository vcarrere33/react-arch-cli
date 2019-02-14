const main = `
const initialState = {

};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    default:
      return state;
  }
}
`;

const imports = {
  status: "import {\n\tSTATUS_DEFAULT,\n\tSTATUS_LOADING,\n\tSTATUS_SUCCESS,\n\tSTATUS_FAILURE,\n} from 'constants/PayloadStatus';",
  flow: "// @flow",
};

const exported = {
  default: "export default reducer;",
};

module.exports = {
  main: main,
  imports: imports,
  exported: exported,
};
