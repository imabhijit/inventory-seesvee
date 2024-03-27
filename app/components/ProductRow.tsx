import { Card, InlineGrid, TextField, Text } from '@shopify/polaris'
import React from 'react'

type Props = {product, onChangeProduct}

const ProductRow = ({product, onChangeProduct}: Props) => {
  return (
    <Card key={product.sku}>
        <InlineGrid gap="100" columns={9}>
            <Text as='h6' variant="bodyMd"> {product.sku} </Text>
            <Text as='h6' variant="bodyMd"> {product.name} </Text>
            <Text as='h6' variant="bodyMd"> {product.section} </Text>
            <Text as='h6' variant="bodyMd"> {product.quantity} </Text>
            <TextField type='number' autoComplete='off' label="uvc" labelHidden value={product.uvc} onChange={newValue => {onChangeProduct({...product, uvc: newValue})}}/>
            <TextField type='number' autoComplete='off' label="float" labelHidden value={product.float} onChange={newValue => {onChangeProduct({...product, float: newValue})}}/>
            <Text as='h6' variant="bodyMd"> N/A </Text>
            <Text as='h6' variant="bodyMd"> N/A </Text>
            <Text as='h6' variant="bodyMd"> N/A </Text>
        </InlineGrid>
    </Card>
  )
}

export default ProductRow