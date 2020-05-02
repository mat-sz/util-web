import React, { useState } from 'react';
import { MD5, SHA1, SHA224, SHA256, SHA384, SHA512, SHA3 } from 'crypto-js';

const functions = [
  {
    name: 'MD5',
    fn: MD5,
  },
  {
    name: 'SHA1',
    fn: SHA1,
  },
  {
    name: 'SHA224',
    fn: SHA224,
  },
  {
    name: 'SHA256',
    fn: SHA256,
  },
  {
    name: 'SHA384',
    fn: SHA384,
  },
  {
    name: 'SHA512',
    fn: SHA512,
  },
  {
    name: 'SHA3',
    fn: SHA3,
  },
];

export const Hash: React.FC = () => {
  const [plaintext, setPlaintext] = useState('');

  const onChangePlaintext = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlaintext(e.target.value);
  };

  return (
    <section>
      <h2>Hash</h2>
      <h3>Plaintext</h3>
      <input value={plaintext} onChange={onChangePlaintext} />
      <h3>Hashed</h3>
      <table>
        <thead>
          <tr>
            <th>Function</th>
            <th>Output</th>
          </tr>
        </thead>
        <tbody>
          {functions.map(hashfn => (
            <tr key={hashfn.name}>
              <td>{hashfn.name}</td>
              <td>{hashfn.fn(plaintext).toString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};
