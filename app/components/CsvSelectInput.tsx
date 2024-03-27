import React from 'react'
import {Select} from '@shopify/polaris';
import {useState, useCallback} from 'react';

type Props = {filename, columns}

function CsvSelectInput({filename, columns}: Props) {
    const [selected, setSelected] = useState('Select');

    const handleSelectChange = useCallback(
      (value: string) => setSelected(value),
      [],
    );
  
    return (
      <Select
        label={filename}
        options={columns}
        onChange={handleSelectChange}
        value={selected}
      />
    );
}

export default CsvSelectInput