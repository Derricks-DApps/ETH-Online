export default interface BarcodeTemplate {
  barcode: string;
  id: string;
  product_name: string;
  product_productOwner?: string;
  description?: string;
  barcodeString?: string;
  company_name?: string;
  company_tax_id?: string;
  __typename?: string;
}
