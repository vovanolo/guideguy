import React, { Component } from 'react';

import styles from './ChallengeCardCopy.module.css';

export default class ChallengeCardCopy extends Component {
  render() {
    const active = true;

    return (
      <div className={active ? styles.active : styles.inactive}>
        <h1 className={styles.Title}>Card Title</h1>
      </div>
    );
  }
}
