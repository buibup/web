import React from 'react';
import { createTable } from '../Table';
import { getMatch, setMatchSort } from '../../actions';
import { connect } from 'react-redux';
import { overviewColumns, abUpgradeColumns } from '../Table/columnDefinitions/matchColumns.jsx';
import { sortMatch, transformMatch, transformAbilityUpgrades } from '../../selectors';

const MatchTable = createTable(transformMatch, sortMatch, setMatchSort);
const AbilityUpgradesTable = createTable(transformAbilityUpgrades, sortMatch, setMatchSort);

const Match = () => (
  <div>
    <MatchTable columns={overviewColumns} />
    <AbilityUpgradesTable columns={abUpgradeColumns} />
  </div>
);

const mapStateToProps = (state, { params }) => ({ matchId: params.match_id });

const mapDispatchToProps = (dispatch) => ({
  sort: (column) => dispatch(getMatch(column)),
  getMatch: (matchId) => dispatch(getMatch(matchId)),
});

class RequestLayer extends React.Component {
  componentDidMount() {
    this.props.getMatch(this.props.routeParams.match_id);
  }

  componentWillUpdate(nextProps) {
    if (this.props.match_id !== nextProps.match_id) {
      this.props.getMatch(nextProps.match_id);
    }
  }

  render() {
    return (
      <div>
        <Match {...this.props} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
