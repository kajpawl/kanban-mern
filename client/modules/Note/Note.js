import React from 'react';
import PropTypes from 'prop-types';

// Import Style
import styles from './Note.css';

const Note = props =>
  <li id={props.id} className={styles.Note}>{props.children}</li>;

Note.propTypes = {
  children: PropTypes.any,
};

export default Note;
