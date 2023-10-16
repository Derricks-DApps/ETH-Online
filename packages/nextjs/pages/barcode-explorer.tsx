import React from "react";
import { MetaHeader } from "~~/components/MetaHeader";

const barcodes = [
  {
    id: 1,
    productName: "Product 1",
    description: "Description of product 1",
    price: 10.99,
  },
  {
    id: 2,
    productName: "Product 2",
    description: "Description of product 2",
    price: 19.99,
  },
  {
    id: 3,
    productName: "Product 3",
    description: "Description of product 3",
    price: 5.99,
  },
];

const BarcodeExplorer = () => {
  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center mb-8">
            <span className="block text-4xl font-bold">Barcode Explorer</span>
          </h1>
          <br />
          <p>This page is under construction. Please check back later.</p>

          <table className="table table-bordered table-striped w-full">
            <thead>
              <tr>
                <th className="text-left">ID</th>
                <th className="text-left">Product Name</th>
                <th className="text-left">Description</th>
                <th className="text-left">Value</th>
              </tr>
            </thead>
            <tbody>
              {barcodes.map(barcode => (
                <tr key={barcode.id}>
                  <td>{barcode.id}</td>
                  <td>{barcode.productName}</td>
                  <td>{barcode.description}</td>
                  <td>{barcode.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default BarcodeExplorer;
