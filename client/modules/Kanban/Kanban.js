import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Lanes from '../Lane/Lanes';
import { createLaneRequest, createLane, fetchLanes } from '../Lane/LaneActions';
import styles from '../Lane/Lane.css';

const Kanban = props => {
  const insertLaneName = () => {
    return window.prompt("Add new lane", "New Lane");
  };

  return (
    <div>
      <button
        className={styles.AddLane}
        onClick={() => props.createLaneRequest(
          { name: insertLaneName() }
        )}
      >Add Lane</button>
      <Lanes lanes={props.lanes} />
    </div>
  );
};

Kanban.need = [() => { return fetchLanes(); }];

Kanban.propTypes = {
  lanes: PropTypes.array,
  createLane: PropTypes.func,
};

const mapStateToProps = state => ({
  lanes: Object.values(state.lanes),
});

const mapDispatchToProps = {
  createLaneRequest,
  fetchLanes,
};

export default connect(mapStateToProps, mapDispatchToProps)(Kanban);
