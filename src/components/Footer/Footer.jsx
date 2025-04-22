import React from 'react';
import styles from './Footer.module.css';

const Footer = ({ref}) => (
  <>
    <div className={styles.Footer} ref={ref}>
      <div className={styles.ItemContainer}>
          <div className={styles.DetailContainer}>
            <p style={{fontSize: '24px', fontWeight: 'bold'}}>About</p>
            <p>A subsidiary of imagination. ACME provides innovative (and often unpredictable) solutions for all your cartoonishly elaborate needs.</p>
            <p>ACME Corporation's "state-of-the-art" is a relative term and gravity is merely a suggestion.</p>
          </div>
          <div className={styles.DetailContainer}>
            <p style={{fontSize: '24px', fontWeight: 'bold'}}>Contact</p>
            <p>Rocket Skate Plaza, Acme Industrial Park, Somewhere, USA 12345</p>
            <p>Phone: +(84) 00 000 0001</p>
            <p>Email: acme@gmail.com.uk</p>
          </div>
      </div>
    </div>
    <div className={styles.Address}>
     © 2025 Copyright: ACME.com.uk
    </div>
  </>
);

export default Footer;
