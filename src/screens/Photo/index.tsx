import React, { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import ExifReader from 'exifreader';

export const Photo: React.FC = () => {
  const [file, setFile] = useState<File>();
  const [tags, setTags] = useState<ExifReader.Tags>();

  useEffect(() => {
    console.log(tags);
  }, [tags]);

  const onDrop = useCallback(
    async (files: File[]) => {
      if (files[0]) {
        setFile(files[0]);
        setTags(ExifReader.load(await new Response(files[0]).arrayBuffer()));
      }
    },
    [setFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
  });

  return (
    <section>
      <h2>Photo</h2>
      <div>
        <h3>Upload</h3>
        <div
          {...getRootProps()}
          className={'dropzone ' + (isDragActive ? 'active' : '')}
        >
          <input {...getInputProps({ style: {} })} />
          <span>
            Select your image file by clicking or dropping a file on this area.
          </span>
        </div>
        <h3>Metadata</h3>
        <div className="full-width">
          {file ? (
            tags ? (
              <table>
                <thead>
                  <tr>
                    <th>Tag</th>
                    <th>Raw value</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(tags).map(tag => {
                    const value = (tags as any)[tag];
                    if (
                      tag in tags &&
                      typeof value === 'object' &&
                      'value' in value
                    ) {
                      return (
                        <tr key={tag}>
                          <td>{tag}</td>
                          <td>{value['value']}</td>
                          <td>
                            {'description' in value ? value['description'] : ''}
                          </td>
                        </tr>
                      );
                    } else {
                      return null;
                    }
                  })}
                </tbody>
              </table>
            ) : (
              'Invalid image file.'
            )
          ) : (
            'No file loaded.'
          )}
        </div>
      </div>
    </section>
  );
};
