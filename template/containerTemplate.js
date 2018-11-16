const main = `export default connect(
  (state: StateType): StateProps => ({
  }),
  (dispatch: DispatchType): DispatchProps => ({
  })
)(:className);
`;

const imports = {
  connect: "import { connect } from 'react-redux';",
  component: "import :className from ':className';",
  propTypes: "import type { StateProps, DispatchProps } from ':className';",
  types: "import type { DispatchType, StateType } from 'types/Actions';",
  action: "import { fetchCompetitions } from 'actions/competitionsActions';",
};
