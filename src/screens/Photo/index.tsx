import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import ExifReader from 'exifreader';
import { fromImage } from 'imtool';
import { toArrayBuffer } from 'fitool';

export const Photo: React.FC = () => {
  const [file, setFile] = useState<File>();
  const [tags, setTags] = useState<ExifReader.Tags>();
  const [url, setURL] = useState<string>();
  const [jpegURL, setJpegURL] = useState<string>();
  const [pngURL, setPngURL] = useState<string>();

  const onDrop = useCallback(
    async (files: File[]) => {
      if (files[0]) {
        const file = files[0];
        setFile(file);
        setTags(ExifReader.load(await toArrayBuffer(file)));
        setURL(URL.createObjectURL(file));

        const tool = await fromImage(file);
        setJpegURL(await tool.type('image/jpeg').toBlobURL());
        setPngURL(await tool.type('image/png').toBlobURL());
      }
    },
    [setFile, setTags, setURL, setJpegURL, setPngURL]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: false,
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
              <a className="button" href={jpegURL}>
                Download JPEG
              </a>
              <a className="button" href={pngURL}>
                Download PNG
              </a>
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
