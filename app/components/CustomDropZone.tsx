import {DropZone, LegacyStack, Text} from '@shopify/polaris';
import {useState, useCallback} from 'react';
import CsvSelectorCard from './CsvSelectorCard';

type Props = {files: File[], filesSetter: Function}

export function DropZoneExample({files, filesSetter}: Props) {

  const handleDropZoneDrop = useCallback(
    (_dropFiles: File[], acceptedFiles: File[], _rejectedFiles: File[]) => {
      filesSetter((files) => [...files, ...acceptedFiles])
    },
    [],
  );

  const validFileTypes = ['text/csv'];
  const fileUpload = !files.length && <DropZone.FileUpload />;
  const uploadedFiles = files.length > 0 && (
    <div style={{padding: '0'}}>
      <LegacyStack vertical>
        {files.map((file, index) => (
          <LegacyStack alignment="center" key={index}>
            <div>
              {file.name}{' '}
              <Text variant="bodySm" as="p">
                {file.size} bytes
              </Text>
            </div>
          </LegacyStack>
        ))}
      </LegacyStack>
    </div>
  );

  return (
    <DropZone onDrop={handleDropZoneDrop}>
      {uploadedFiles}
      {fileUpload}
    </DropZone>
  );
}