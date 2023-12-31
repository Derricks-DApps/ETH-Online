import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

type ModalProps = {
  onClose: () => void;
};

function CompanyRegistration({ onClose }: ModalProps) {
  // expand this as a legit form though
  const [companyName, setCompanyName] = useState("");
  const [taxNumber, setTaxNumber] = useState("");
  const [address, setAddress] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Do stuff with company registration information here - with companyName, taxNumber and address variables
    onClose();
  }

  function handleCompanyNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCompanyName(event.target.value);
  }

  function handleTaxNumberChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTaxNumber(event.target.value);
  }

  function handleAddressChange(event: React.ChangeEvent<HTMLInputElement>) {
    setAddress(event.target.value);
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
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-xl rounded-2xl p-8 text-black">
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
            <div className="flex justify-center items-center gap-6 flex-col sm:flex-col">
              <h2 className="text-3xl font-bold mb-4">Register your company</h2>
              <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
                <input
                  type="text"
                  className="input input-bordered input-primary bg-white w-full max-w-xs"
                  placeholder="Company name"
                  value={companyName}
                  onChange={handleCompanyNameChange}
                />
                <input
                  type="text"
                  className="input input-bordered input-primary bg-white w-full max-w-xs"
                  placeholder="Tax Number"
                  value={taxNumber}
                  onChange={handleTaxNumberChange}
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
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default CompanyRegistration;
