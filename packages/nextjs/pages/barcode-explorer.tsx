import React, { useState } from "react";
import { MetaHeader } from "~~/components/MetaHeader";
import BarcodeViewer from "~~/components/modals/BarcodeViewer";
import barcodes from "~~/data/barcodes";
import BarcodeTemplate from "~~/interfaces/BarcodeTemplate";

const BarcodeExplorer = () => {
  const [selectedBarcode, setSelectedBarcode] = useState<BarcodeTemplate | null>(null);

  const handleRowClick = (barcode: BarcodeTemplate) => {
    setSelectedBarcode(barcode);
  };

  const handleCloseModal = () => {
    setSelectedBarcode(null);
  };

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

          <table className="table text-xl bg-base-100 table-zebra w-full md:table-md table-sm">
            <thead>
              <tr className="rounded-xl text-sm text-base-content">
                <th className="text-left bg-primary hover text-sm">ID</th>
                <th className="text-left bg-primary hover text-sm">Product Name</th>
                <th className="text-left bg-primary hover text-sm">Description</th>
                <th className="text-left bg-primary hover text-sm">Value</th>
              </tr>
            </thead>
            <tbody>
              {barcodes.map(barcode => (
                <tr key={barcode.id} onClick={() => handleRowClick(barcode)} className="cursor-pointer">
                  <td>{barcode.id}</td>
                  <td>{barcode.productName}</td>
                  <td>{barcode.description}</td>
                  <td>{barcode.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {selectedBarcode && (
          <BarcodeViewer barcode={selectedBarcode} isOpen={!!selectedBarcode} onClose={handleCloseModal} />
        )}
      </div>
    </>
  );
};

export default BarcodeExplorer;
