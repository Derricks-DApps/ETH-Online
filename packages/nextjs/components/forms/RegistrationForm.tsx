import React, { useState } from "react";

type RegistrationFormProps = {
  onSubmit: (companyName: string, taxNumber: number, address: string) => void;
};

function RegistrationForm({ onSubmit }: RegistrationFormProps) {
  const [companyName, setCompanyName] = useState("");
  const [taxNumber, setTaxNumber] = useState(0);
  const [address, setAddress] = useState("");

  const handleCompanyNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyName(event.target.value);
  };

  const handleTaxNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaxNumber(parseInt(event.target.value));
  };

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(companyName, taxNumber, address);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
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
