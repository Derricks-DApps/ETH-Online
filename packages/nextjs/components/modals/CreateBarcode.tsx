import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

type ModalProps = {
  onClose: () => void;
};

function CreateBarcode({ onClose }: ModalProps) {
  const [companyName, setCompanyName] = useState("");
  const [taxNumber, setTaxNumber] = useState(0);
  const [address, setAddress] = useState("");

  function handleCompanyNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCompanyName(event.target.value);
  }

  function handleTaxNumberChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTaxNumber(Number(event.target.value));
  }

  function handleAddressChange(event: React.ChangeEvent<HTMLInputElement>) {
    setAddress(event.target.value);
  }

  /* commenting this out because of linting issues */

  const { writeAsync } = useScaffoldContractWrite({
    contractName: "BTN",
    functionName: "register",
    args: [BigInt(taxNumber), companyName, address],
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    /* capture generated barcode as image */

    // if (barcodeRef.current) {
    //   html2canvas(barcodeRef.current).then(canvas => {
    //     const dataUrl = canvas.toDataURL();
    //     console.log("Image url: ", dataUrl);
    //   });
    // }

    /* Do barcode minting here */
    await writeAsync();
    onClose();
  }

  return (
    <Transition appear show={true}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={onClose}>
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Dialog.Overlay}
            className="fixed inset-
            bg-black opacity-30"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-xl rounded-2xl p-8 text-black create-barcode-modal">
            <div
              className="absolute top-2 left-2 text-gray-500 hover:text-gray-900 color-black cursor-pointer"
              onClick={onClose}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <div className="flex justify-center items-center gap-12 flex-col sm:flex-col">
              <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
                <h2>Before we can create barcodes, we would like to know the following: </h2>
                {/* <div ref={barcodeRef}>
                  {barcodeValue && <Barcode value={barcodeValue} options={{ format: "code128" }} />}
                </div> */}

                {/* <input
                  type="text"
                  value={barcodeValue}
                  onChange={handleInputChange}
                  className="input input-bordered input-primary w-full max-w-xs"
                /> */}
                <input
                  type="text"
                  className="input input-bordered input-primary bg-white w-full max-w-xs"
                  placeholder="Your company's name"
                  value={companyName}
                  onChange={handleCompanyNameChange}
                />
                <input
                  type="number"
                  className="input input-bordered input-primary bg-white w-full max-w-xs"
                  placeholder="Your company's tax number"
                  value={taxNumber === 0 ? "" : taxNumber}
                  onChange={handleTaxNumberChange}
                  min={0}
                  step={1}
                />
                <input
                  type="text"
                  className="input input-bordered input-primary bg-white w-full max-w-xs"
                  placeholder="Address"
                  value={address}
                  onChange={handleAddressChange}
                />
                {/* <br></br>
                <input
                  type="text"
                  className="input input-bordered input-primary bg-white w-full max-w-xs"
                  placeholder="Your product's name"
                /> */}
                <button
                  type="submit"
                  className="text-white w-full md:w-1/3 mx-auto py-4 px-8 rounded-full text-lg font-bold"
                  style={{ background: "cadetblue", width: "100%" }}
                >
                  Register your company
                </button>
              </form>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default CreateBarcode;
