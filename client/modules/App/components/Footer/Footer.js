import React from 'react';

// Import Style
import styles from './Footer.css';

// Import Images
import bg from '../../header-bk.png';

export function Footer() {
  return (
    <div className={styles.footer}>
      <div style={{ background: `#FFF url(${bg}) center` }} className={styles.background} />
      <a href="https://github.com/kajpawl">&copy; Kajetan Pawliszyn 2019</a>
    </div>
  );
}

export default Footer;
