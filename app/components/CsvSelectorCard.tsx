import { BlockStack, Button, CalloutCard, Card, Form, FormLayout, Text } from '@shopify/polaris'
import { useCallback, useEffect, useState } from 'react';
import Papa from 'papaparse'
import CsvSelectInput from './CsvSelectInput';

type Props = {files: File[]}

interface FileColumns {
  file: string;
  columns: string[]
}

const CsvSelectorCard = ({files}: Props) => {
  const [fileColumns, setfileColumns] = useState<FileColumns[]>([])
  useEffect(() => {
      files.map(file => {
        Papa.parse(file, {
          header: true,
          complete: (result) => setfileColumns((fcs) => {
            const mapping = {
              'file': file.name,
              'columns': result.meta.fields
            } as FileColumns;
            return [...fcs, mapping]
          })
        })
      });
  }, [files]);

  const handleSubmit = useCallback((data) => {
    console.log(data);
  }, []);

  return (
    <Card>
     <Text as='h4' variant="headingMd"> Import CSV Data </Text>
          <Form onSubmit={handleSubmit}>
            <FormLayout>
                {fileColumns.map((fc) => <CsvSelectInput filename={fc.file} columns={fc.columns} />)}
                <Button submit>Submit</Button>
            </FormLayout>
          </Form>
      </Card>
  )
}

export default CsvSelectorCard


// const selects = files.map(file => {
//   Papa.parse(file, {
//     header: true,
//     complete: (result) => {console.log(result)}
//   });
//   return <CsvSelectInput filename={file.name} columns={["1", "2"]} />
// });