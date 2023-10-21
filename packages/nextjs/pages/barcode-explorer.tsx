import React, { useEffect, useState } from "react";
import { cacheExchange, createClient, fetchExchange } from "@urql/core";
import BarcodeRow from "~~/components/BarcodeRow";
import { MetaHeader } from "~~/components/MetaHeader";
import BarcodeViewer from "~~/components/modals/BarcodeViewer";
import Modal from "~~/components/modals/Modal";
import BarcodeTemplate from "~~/interfaces/BarcodeTemplate";

const query = `
{
  minted(id: "") {
    barcode
    product_description
    product_name
    product_productOwner
  }
  minteds(first: 5) {
    id
    barcode
    product_productOwner
    product_name
  }
}
`;
const API_URL = "https://api.studio.thegraph.com/query/54169/btree-v1/version/latest";
const client = createClient({
  url: API_URL,
  exchanges: [cacheExchange, fetchExchange],
});

const BarcodeExplorer = () => {
  const [selectedBarcode, setSelectedBarcode] = useState<BarcodeTemplate | null>(null);
  const [barcodes, setBarcodes] = useState<BarcodeTemplate[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  async function fetchData() {
    const response = await client.query(query, {}).toPromise();
    setBarcodes(response.data.minteds);
    console.log(barcodes);
  }

  const handleBarcodeClick = (barcode: BarcodeTemplate) => {
    setSelectedBarcode(barcode);
  };

  const handleSearchQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleCloseModal = () => {
    setSelectedBarcode(null);
  };

  useEffect(() => {
    fetchData();
  });

  const handleBarcodeUpdate = (updatedBarcode: BarcodeTemplate) => {
    const updatedBarcodes = barcodes.map(barcode => {
      if (barcode.id === updatedBarcode.id) {
        return updatedBarcode;
      }
      return barcode;
    });
    console.log("updated barcodes: ", updatedBarcodes);
    setBarcodes(updatedBarcodes);
  };

  const filteredBarcodes = barcodes.filter(barcode => {
    const searchRegex = new RegExp(searchQuery, "i");
    return (
      searchRegex.test(barcode.barcode) ||
      searchRegex.test(barcode.product_name) ||
      searchRegex.test(barcode.company_name ?? "")
    );
  });

  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5 w-full">
          <h1 className="text-center mb-8">
            <span className="block text-4xl font-bold">Barcode Explorer</span>
            {barcodes.length > 0 && (
              <div className="m-4">
                <input
                  type="text"
                  placeholder="Search barcodes here"
                  className="input w-full max-w-xs"
                  onChange={handleSearchQueryChange}
                />
              </div>
            )}
          </h1>
          <br />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
            {barcodes.length === 0 ? (
              <div className="text-center">
                <p>This is where your barcodes will be!</p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="table text-xl bg-base-100 table-zebra w-full md:table-md table-sm">
                    <thead>
                      <tr className="rounded-xl text-sm text-base-content">
                        {/* <th className="text-left bg-primary hover text-sm">ID</th> */}
                        <th className="text-left bg-primary hover text-sm">Barcode Number</th>
                        <th className="text-left bg-primary hover text-sm">Product Owner</th>
                        <th className="text-left bg-primary hover text-sm">Company&apos;s Tax ID</th>
                        <th className="text-left bg-primary hover text-sm">Product Name</th>
                        <th className="text-left bg-primary hover text-sm"></th>
                        {/* <th className="text-left bg-primary hover text-sm">Description</th>
                        <th className="text-left bg-primary hover text-sm">Value</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBarcodes.map(barcode => (
                        <BarcodeRow
                          key={barcode.id}
                          barcode={barcode}
                          onClick={handleBarcodeClick}
                          onUpdate={handleBarcodeUpdate}
                        />
                        // <tr key={barcode.id} onClick={() => handleBarcodeClick(barcode)} className="cursor-pointer">
                        //   {/* <td style={{ maxWidth: "10%" }}>{barcode.id}</td> */}
                        //   <td style={{ maxWidth: "40%" }}>{barcode.barcode}</td>
                        //   <td style={{ maxWidth: "50%" }}>{barcode.product_productOwner}</td>
                        //   <td style={{ maxWidth: "50%" }}>{barcode.product_name}</td>
                        //   <td
                        //     style={{ maxWidth: "50%" }}
                        //     onClick={() => handleBarcodeClick(barcode)}
                        //     className="bg-primary-focus:hover"
                        //   >
                        //     <a className="font-semibold text-center">Check details</a>
                        //   </td>
                        //   {/* <td>{barcode.description}</td>
                        //   <td>{barcode.price}</td> */}
                        // </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* // ))} */}
              </>
            )}
          </div>
        </div>
        {selectedBarcode && (
          <Modal onClose={handleCloseModal}>
            <BarcodeViewer barcode={selectedBarcode} />
          </Modal>
        )}
      </div>
    </>
  );
};

export default BarcodeExplorer;
