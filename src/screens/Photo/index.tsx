import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import ExifReader from 'exifreader';
import { fromImage } from 'imtool';
import { toDataURL, toArrayBuffer } from 'fitool';

export const Photo: React.FC = () => {
  const [file, setFile] = useState<File>();
  const [tags, setTags] = useState<ExifReader.Tags>();
  const [url, setURL] = useState<string>();

  const onDrop = useCallback(
    async (files: File[]) => {
      if (files[0]) {
        setFile(files[0]);
        setTags(ExifReader.load(await toArrayBuffer(files[0])));
        setURL(await toDataURL(files[0]));
      }
    },
    [setFile, setTags, setURL]
  );

  const downloadJPEG = useCallback(async () => {
    if (!file) return;

    const tool = await fromImage(file);
    tool.type('image/jpeg').toDownload('output.jpg');
  }, [file]);

  const downloadPNG = useCallback(async () => {
    if (!file) return;

    const tool = await fromImage(file);
    tool.type('image/png').toDownload('output.png');
  }, [file]);

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
        {url ? (
          <>
            <h3>Preview</h3>
            <img src={url} alt="Preview" />
            <div>
              <button onClick={downloadJPEG}>Download JPEG</button>
              <button onClick={downloadPNG}>Download PNG</button>
            </div>
          </>
        ) : null}
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
