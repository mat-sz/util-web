import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import CopyToClipboard from 'react-copy-to-clipboard';

export const Uuid: React.FC = () => {
  const [generated, setGenerated] = useState(uuid());
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCopied(false);
  }, [generated]);

  const onCopy = () => setCopied(true);
  const onNew = () => setGenerated(uuid());

  return (
    <section>
      <h2>UUID v4</h2>
      <div>
        <h3>Your generated UUID:</h3>
        <pre>{generated}</pre>
        <CopyToClipboard text={generated} onCopy={onCopy}>
          <button>{copied ? 'Copied' : 'Copy to clipboard'}</button>
        </CopyToClipboard>
        <button onClick={onNew}>New UUID</button>
      </div>
    </section>
  );
};
