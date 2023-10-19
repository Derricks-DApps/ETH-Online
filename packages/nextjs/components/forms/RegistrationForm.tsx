import React, { useState } from "react";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

type RegistrationFormProps = {
  onSubmit: () => void;
};

function RegistrationForm({ onSubmit }: RegistrationFormProps) {
  const [companyName, setCompanyName] = useState("");
  const [taxId, setTaxId] = useState("");
  const [streetAddress, setStreetAddress] = useState("");

  const handleCompanyNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyName(event.target.value);
  };

  const handleTaxNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaxId(event.target.value);
  };

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStreetAddress(event.target.value);
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await writeAsync();
    // onSubmit(taxId, companyName, streetAddress);
  }

  const { writeAsync } = useScaffoldContractWrite({
    contractName: "BTN",
    functionName: "register",
    args: [taxId, companyName, streetAddress],
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
      onSubmit();
    },
  });

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
      <h2 className="text-2xl">Before we start - tell us a little bit about your company:</h2>
      <input
        type="text"
        className="input input-bordered input-primary bg-white w-full max-w-xs"
        placeholder="Your company's name"
        value={companyName}
        onChange={handleCompanyNameChange}
      />
      <input
        type="string"
        className="input input-bordered input-primary bg-white w-full max-w-xs"
        placeholder="Your company's tax ID"
        value={taxId}
        onChange={handleTaxNumberChange}
        min={0}
        step={1}
      />
      <input
        type="text"
        className="input input-bordered input-primary bg-white w-full max-w-xs"
        placeholder="Address"
        value={streetAddress}
        onChange={handleAddressChange}
      />
      <button
        type="submit"
        className="text-white w-full md:w-1/3 mx-auto py-4 px-8 rounded-full text-lg font-bold"
        style={{ background: "cadetblue", width: "100%" }}
      >
        Register your company
      </button>
    </form>
  );
}

export default RegistrationForm;
