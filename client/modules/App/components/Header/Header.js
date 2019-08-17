import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

// Import Style
import styles from './Header.css';

export function Header(props, context) {

  return (
    <div className={styles.header}>
      <div className={styles.background} />
      <div className={styles.content}>
        <h1 className={styles['site-title']}>
          Kanban Board
        </h1>
      </div>
    </div>
  );
}

Header.contextTypes = {
  router: PropTypes.object,
};

export default Header;
