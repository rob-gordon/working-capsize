import * as React from 'react';
import './style.css';
import { fromBlob } from '@capsizecss/unpack';

export default function App() {
  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>
      <input
        type="file"
        onChange={async (ev: React.ChangeEvent<HTMLInputElement>) => {
          if (ev.currentTarget.files && ev.currentTarget.files[0]) {
            const file = ev.currentTarget.files[0];

            try {
              const metrics = await fromBlob(file);

              const reader = new FileReader();

              const fileNameParts = file.name.split('.') || [];
              const extension = fileNameParts[fileNameParts.length - 1];

              reader.addEventListener(
                'load',
                () => {
                  console.log(metrics);
                  console.log({
                    source: 'FILE_UPLOAD',
                    url: reader.result as string,
                    originalFileName: file.name,
                    fileName: fileNameParts
                      .slice(0, fileNameParts.length - 1)
                      .join('-'),
                    extension,
                  });
                },
                false
              );

              reader.readAsDataURL(file);
            } catch (e) {
              console.error('Something went wrong. Please try again.');
            }
          } else {
            console.error('No files to upload. Please try again.');

            // eslint-disable-next-line no-console
            console.error('No files on target', ev.currentTarget);
          }
        }}
      />
    </div>
  );
}
