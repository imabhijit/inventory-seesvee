import { Card, BlockStack, InlineGrid, Text } from '@shopify/polaris'
import React from 'react'
import ProductRow from './ProductRow'

type Props = {products, onChangeProduct}

function ProductTable({products, onChangeProduct}: Props) {
    let restockUnit = "Carton"
  return (
    <Card>
        <BlockStack gap="100">
            <Card key="title_container">
                <InlineGrid gap="100" columns={9}>
                    <Text as='h4' variant="headingMd">SKU</Text>+
                    <Text as='h4' variant="headingMd">Name</Text>
                    <Text as='h4' variant="headingMd">Section</Text>
                    <Text as='h4' variant="headingMd">Quantity</Text>
                    <Text as='h4' variant="headingMd">Units/Carton</Text>
                    <Text as='h4' variant="headingMd">Float %</Text>
                    <Text as='h4' variant="headingMd">POS Quantity</Text>
                    <Text as='h4' variant="headingMd">Restock ({restockUnit})</Text>
                    <Text as='h4' variant="headingMd">Actual Restock ({restockUnit})</Text>
                </InlineGrid>
            </Card>
            <BlockStack gap="100" key="products_container">
                {products.map((item) => <ProductRow product={item} onChangeProduct={onChangeProduct}/>)}
            </BlockStack>
        </BlockStack>
    </Card>
  )
}

export default ProductTable