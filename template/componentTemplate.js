const main = `
class :className extends PureComponent {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div className=":className">

      </div>
    )
  }
}
`;

const functional = `
const :className = () => {
  return (
    <div className=":className">
    </div>
  )
}
`;

const imports = {
  react: "import React, { PureComponent } from 'react';",
  propTypes: "import PropTypes from 'prop-types';",
  stylesheet: "import './:className.css';",
  observable: "import { inject, observer } from 'mobx-react';",
  connect: "import {connect} from 'react-redux';"
};

const exported = {
  default: "export default :className;",
  observable: "export default (observer(:className));",
  connectDispatch: "export default connect(null, mapDispatchToProps)(:className);",
  connectStateAndDispatch: "export default connect(mapStateToProps, mapDispatchToProps)(:className);"
};

module.exports = {
  main: main,
  imports: imports,
  exported: exported,
  functional: functional
};
