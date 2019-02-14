const main = `
function* fetch:className(action) {
  try {
    yield put(fetch:classNameSuccess());
  } catch (e) {
    __DEV__ && console.log(e);
    yield put(fetch:classNameFailure());
  }
}

function* watcher(): Saga<*> {
  yield takeLatest(FETCH_:className_START, fetch:className);
}
`;

const imports = {
  status: "import {\n\tSTATUS_DEFAULT,\n\tSTATUS_LOADING,\n\tSTATUS_SUCCESS,\n\tSTATUS_FAILURE,\n} from 'constants/PayloadStatus';",
  flow: "// @flow",
  saga: "import { takeLatest, put, call } from 'redux-saga/effects';\nimport { type Saga } from 'redux-saga';",
  action: "import {\n\tFETCH_:className_START,\n\tfetch:classNameSuccess,\n\tfetch:classNameFailure,\n} from 'actions/:classNameActions';"
};

const exported = {
  default: "export default watcher;",
};

module.exports = {
  main: main,
  imports: imports,
  exported: exported,
};
