import React, { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import Barcode from "react-jsbarcode";
import ReactLoading from "react-loading";
import { parseEther } from "viem";
import { useAccount } from "wagmi";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

type ProductFormProps = {
  onSubmit: () => void;
};

function ProductForm({ onSubmit }: ProductFormProps) {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");

  const [companyPrefix, setCompanyPrefix] = useState("");
  const [productPrefix, setProductPrefix] = useState("");

  const [fullBarcodeNumber, setFullBarcodeNumber] = useState("");

  const [isLoading, setLoading] = useState(false);

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
    setLoading(true);
    await writeAsync();
    onSubmit();
  }

  const company = useScaffoldContractRead({
    contractName: "BTN",
    functionName: "companies",
    args: [address],
  }).data as [number, bigint] | undefined;
  // const [, companyPrefix] = company as [number, bigint];

  const productsTotal = useScaffoldContractRead({
    contractName: "BTN",
    functionName: "productsTotal",
  });

  function generateFullBarcodeNumber(companyAddress: [number, bigint] | undefined) {
    async function getCompanyInfo() {
      if (companyAddress) {
        const [, prefix] = companyAddress;
        // make sure company prefix is made up of six digits - frontload it with '0's otherwise
        const prefixString = String(prefix);
        const paddedPrefixStr = prefixString.padStart(6, "0");
        setCompanyPrefix(paddedPrefixStr.replace(/^0/, "1"));
      }
    }

    async function getProductsTotal() {
      const products = await productsTotal;

      if (products.data !== undefined) {
        const productIdString = String(products.data);
        // if the product id is less than 6 digits, frontload it with '0's
        const paddedProductIdStr = productIdString.padStart(5, "0");
        // replace first '0' with a '1' to indicate that this is a product

        setProductPrefix(paddedProductIdStr);

        await calculateBarcodeNumber();
      }
    }

    getCompanyInfo();
    getProductsTotal();
  }

  useEffect(() => {
    generateFullBarcodeNumber(company);
  }, [company, productsTotal]);

  function calculateCheckDigit(barcodeNumber: string) {
    //separate the digits into two groups, odd and even
    const oddDigits = [];
    const evenDigits = [];
    for (let i = 0; i < barcodeNumber.length; i++) {
      if (i % 2 === 0) {
        oddDigits.push(barcodeNumber[i]);
      } else {
        evenDigits.push(barcodeNumber[i]);
      }
    }

    // convert all charcters to numbers
    const oddDigitsAsNumbers = oddDigits.map(Number);
    const evenDigitsAsNumbers = evenDigits.map(Number);

    // add all odd digits
    const oddSum = oddDigitsAsNumbers.reduce((a, b) => a + b, 0);
    // multiply by three
    const oddSumTripled = oddSum * 3;

    // add all even digits
    const evenSum = evenDigitsAsNumbers.reduce((a, b) => a + b, 0);

    // add oddSumTripled and evenSum
    const totalSum = oddSumTripled + evenSum;
    // calculate smallest number needed to round result up to the nearest 10
    const nextTen = (10 - (totalSum % 10)) % 10;
    return nextTen;
  }

  async function calculateBarcodeNumber() {
    const barcodeNumber = companyPrefix + productPrefix;
    //setFullBarcodeNumber(barcodeNumber);
    setFullBarcodeNumber(barcodeNumber + calculateCheckDigit(barcodeNumber));
  }

  const { writeAsync } = useScaffoldContractWrite({
    contractName: "BTN",
    functionName: "mint",
    args: [BigInt(fullBarcodeNumber), productName, description],
    value: parseEther("0.01"),
    blockConfirmations: 1,
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
      setLoading(false);
      onSubmit();
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl">And now to create your barcode: </h2>
      {isLoading ? (
        <div className="flex flex-col items-center gap-4">
          <p>Thank You! We&apos;re now processing your barcode...</p>
          <ReactLoading type="cubes" color="cadetblue" />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
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
          {fullBarcodeNumber && (
            <div ref={barcodeRef}>
              <Barcode value={fullBarcodeNumber}></Barcode>
            </div>
          )}
          <button
            type="submit"
            className="text-white w-full md:w-1/3 mx-auto py-4 px-8 rounded-full text-lg font-bold"
            style={{ background: "cadetblue", width: "100%" }}
          >
            Create your barcode
          </button>
        </div>
      )}
    </form>
  );
}

export default ProductForm;
