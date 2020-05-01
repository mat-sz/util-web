import React, { useState } from 'react';
import { toByteArray, fromByteArray } from 'base64-js';

const decoder = new TextDecoder();
const encoder = new TextEncoder();

export const Base64: React.FC = () => {
  const [encoded, setEncoded] = useState('');
  const [plaintext, setPlaintext] = useState('');

  const onChangeEncoded = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEncoded(e.target.value);
    try {
      const decoded = toByteArray(e.target.value);
      setPlaintext(decoder.decode(decoded));
    } catch {
      // Invalid
    }
  };
  const onChangePlaintext = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPlaintext(e.target.value);
    setEncoded(fromByteArray(encoder.encode(e.target.value)));
  };

  return (
    <section>
      <h2>Base64</h2>
      <h3>Plaintext</h3>
      <textarea value={plaintext} onChange={onChangePlaintext} />
      <h3>Encoded</h3>
      <textarea value={encoded} onChange={onChangeEncoded} />
    </section>
  );
};
