import { BlockStack, Button, CalloutCard, Card, Form, FormLayout, Text, TextField } from '@shopify/polaris'
import { useCallback, useEffect, useState } from 'react';
import Papa from 'papaparse'
import CsvSelectInput from './CsvSelectInput';
import { useSubmit } from '@remix-run/react';
import { ActionFunctionArgs } from '@remix-run/node';

type Props = {files: File[]}

interface FileData {
  file: string
  columns: string[]
  data: any[]
}

const CsvSelectorCard = ({files}: Props) => {
  const [fileData, setfileData] = useState<FileData[]>([]);
  const [title, setTitle] = useState();
  const submit = useSubmit();
  const handleTitleChange = (value) => setTitle(value);
  useEffect(() => {
      files.map(file => {
        Papa.parse(file, {
          header: true,
          complete: (result) => setfileData((fcs) => {
            const mapping = {
              'file': file.name,
              'columns': result.meta.fields,
              'data': result.data
            } as FileData;
            return [...fcs, mapping]
          })
        })
      });
  }, [files]);

  const handleSubmit = useCallback((form) => {
    console.log(form);
    let data = {};
    submit(data, { method: "post", encType: "application/json" });
  }, []);

  return (
    <Card>
     <Text as='h4' variant="headingMd"> Import CSV Data </Text>
          <Form onSubmit={handleSubmit}>
            <FormLayout>
                {fileData.map((fc) => <CsvSelectInput key={fc.file} filename={fc.file} columns={fc.columns} />)}
                <TextField
                  autoComplete='off'
                  label="Title"
                  type="text"
                  onChange={handleTitleChange}
                  value={title}
                />
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