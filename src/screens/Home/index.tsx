import React from 'react';
import { Link } from 'react-router-dom';

import styles from './index.module.scss';

export const Home: React.FC = () => {
  return (
    <section className={styles.tiles}>
      <Link to="/uuid">
        <h2>UUID Generator</h2>
        <span>Generate an UUIDv4.</span>
      </Link>
      <Link to="/base64">
        <h2>Base64</h2>
        <span>Decode/encode base64.</span>
      </Link>
      <Link to="/hash">
        <h2>Hash</h2>
        <span>MD5/SHA</span>
      </Link>
    </section>
  );
};
