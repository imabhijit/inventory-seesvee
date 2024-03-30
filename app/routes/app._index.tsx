import { ActionFunctionArgs, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { Layout, Page, Card, Text, Link, Button, DropZone, BlockStack, InlineGrid, TextField } from '@shopify/polaris'
import React, { useCallback, useState } from 'react'
import CsvSelectorCard from '~/components/CsvSelectorCard'
import { DropZoneExample } from '~/components/CustomDropZone'
import ProductTable from '~/components/ProductTable'
import { authenticate } from '~/shopify.server'

type Props = {}

export async function action ({ request }: ActionFunctionArgs) {
    // let formData = await request.formData();
    // const data = Object.fromEntries(formData);
    // console.log(json(formData.get("form")));
    return json(request);
}

export async function loader({ request }) { 
    const { admin, session } = await authenticate.admin(request);
    const response = await admin.graphql(
        `#graphql
            query {
            inventoryItems(first: 25) {
                edges {
                node {
                    id
                    sku
                    variant {
                    displayName
                    inventoryQuantity
                    }
                }
                }
            }
        }`
    )
    const responseJson = await response.json();

    return json({
      inventory: responseJson.data.inventoryItems.edges
      .filter((edge) => typeof edge.node.sku != 'undefined' && edge.node.sku)
      .map((edge) => edge.node),
    });
}

const Index = (props: Props) => {
    const loaderData = useLoaderData();
    const [files, setFiles] = useState<File[]>([]);

    let initialValues = [];
    for (var product of loaderData.inventory) {
        initialValues.push({sku: product.sku, name: product.variant.displayName, section: "section-123", quantity: product.variant.inventoryQuantity, uvc: "6", float: "25"});
    }
    const [tableValues, setTableValues] = useState(initialValues);
    function handleTableValueChange(newValue) {
        setTableValues(tableValues.map(item => {
            if (item.sku === newValue.sku) {
                return newValue;
            } else {
                return item;
            }
        }))
    }

    const csvSelectorCard = files.length > 0 && <CsvSelectorCard files={files}></CsvSelectorCard>
    
  return (
    <Page>
    <ui-title-bar title='Inventory Seesvee'></ui-title-bar>
    <Layout>
        <Layout.Section>
            <ProductTable
                products={tableValues}
                onChangeProduct={handleTableValueChange}
            />
        </Layout.Section>
        <Layout.Section>
            {csvSelectorCard}
        </Layout.Section>
        <Layout.Section>
            <Card>
                <Text as='h4' variant='headingMd'>
                Drop file
                </Text>
                <DropZoneExample files={files} filesSetter={setFiles}/>
            </Card>
        </Layout.Section>
    </Layout>
  </Page>
  )
}

export default Index