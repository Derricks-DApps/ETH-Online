import React, { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import Barcode from "react-jsbarcode";
import { parseEther } from "viem";
import { useAccount } from "wagmi";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

type ProductFormProps = {
  onSubmit: () => void;
};

function ProductForm({ onSubmit }: ProductFormProps) {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");

  const [companyPrefix, setCompanyPrefix] = useState(BigInt(0));

  const { address } = useAccount();
  const barcodeRef = useRef(null);

  const handleProductNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductName(event.target.value);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // product creation + barcode creation here

    if (barcodeRef.current) {
      html2canvas(barcodeRef.current).then(canvas => {
        const dataUrl = canvas.toDataURL();
        console.log("Image url: ", dataUrl);
      });
    }

    await writeAsync();
    onSubmit();
  }

  const company = useScaffoldContractRead({
    contractName: "BTN",
    functionName: "companies",
    args: [address],
  }).data as [number, bigint] | undefined;
  // const [, companyPrefix] = company as [number, bigint];

  useEffect(() => {
    console.log("Full company info: ", company, typeof company);
    if (company) {
      const [, prefix] = company;
      setCompanyPrefix(prefix);
    }
    // console.log("Company: ", String(company[1]));
  }, [company]);

  const { writeAsync } = useScaffoldContractWrite({
    contractName: "BTN",
    functionName: "mint",
    args: [companyPrefix, productName, description],
    value: parseEther("0.01"),
    blockConfirmations: 1,
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
      onSubmit();
    },
  });

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
      <h2 className="text-2xl">And now to create your barcode: </h2>
      <input
        type="text"
        className="input input-bordered input-primary bg-white w-full max-w-xs"
        placeholder="Your product's name"
        value={productName}
        onChange={handleProductNameChange}
      />
      <input
        type="text"
        className="input input-bordered input-primary bg-white w-full max-w-xs"
        placeholder="Give your product a description"
        value={description}
        onChange={handleDescriptionChange}
      />
      {!!company && (
        <div ref={barcodeRef}>
          <Barcode value={String(company[1])}></Barcode>
        </div>
      )}
      <button
        type="submit"
        className="text-white w-full md:w-1/3 mx-auto py-4 px-8 rounded-full text-lg font-bold"
        style={{ background: "cadetblue", width: "100%" }}
      >
        Create your barcode
      </button>
    </form>
  );
}

export default ProductForm;
