import React from 'react';
import PropTypes from 'prop-types';
import Lane from './LaneContainer';
import styles from './Lanes.css';

const Lanes = ({ lanes }) => {
  return (
    <div className={styles.Lanes}>
      {lanes.map(lane =>
        <Lane className="lane" id={lane.id} key={lane.id} lane={lane} order={lane.order} />
      )}
      <div className={styles.paddingKeeper} />
    </div>
  );
};

Lanes.propTypes = {
  lanes: PropTypes.array,
};

export default Lanes;