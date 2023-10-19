import React, { useState } from "react";

type ProductFormProps = {
  onSubmit: (productName: string, description: string) => void;
};

function ProductForm({ onSubmit }: ProductFormProps) {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");

  const handleProductNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductName(event.target.value);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(productName, description);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
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
