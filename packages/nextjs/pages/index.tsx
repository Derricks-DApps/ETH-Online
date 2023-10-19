import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import NavLink from "~~/components/NavLink";
import RegistrationForm from "~~/components/forms/RegistrationForm";
import Modal from "~~/components/modals/Modal";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import scaffoldConfig from "~~/scaffold.config";

const Home: NextPage = () => {
  const [showCompanyRegisterForm, setShowCompanyRegisterForm] = useState(false);

  const [companyName, setCompanyName] = useState("");
  const [taxNumber, setTaxNumber] = useState(0);
  const [address, setAddress] = useState("");

  const [registered, setRegistered] = useState(false);

  // const contractAddress = "0xD6fa7b0f985d78811c97da04314BADE04cE218bf";

  const handleGetRegisterClick = () => {
    setShowCompanyRegisterForm(true);
  };

  const { data: company } = useScaffoldContractRead({
    contractName: "BTN",
    functionName: "companies",
    args: ["0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"], // dynamic address though
  });

  useEffect(() => {
    if (company !== undefined) setRegistered(true);
    console.log("Company: ", company);
    console.log("Scaffold config: ", scaffoldConfig);
  }, [company]);

  const { writeAsync } = useScaffoldContractWrite({
    contractName: "BTN",
    functionName: "register",
    args: [BigInt(taxNumber), companyName, address],
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  });

  async function handleSubmit(companyName: string, taxNumber: number, address: string) {
    setCompanyName(companyName);
    setTaxNumber(taxNumber);
    setAddress(address);
    /* capture generated barcode as image */

    // if (barcodeRef.current) {
    //   html2canvas(barcodeRef.current).then(canvas => {
    //     const dataUrl = canvas.toDataURL();
    //     console.log("Image url: ", dataUrl);
    //   });
    // }

    /* Do barcode minting here */
    await writeAsync();
    setShowCompanyRegisterForm(false);
  }

  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5 max-w-screen-lg mx-auto">
          <h1 className="text-center mb-8">
            {/* <span className="block text-4xl font-bold">BTree</span> */}
            <img src="/assets/logo.png" alt="BTree" style={{ display: "inline", width: "256px", height: "256px" }} />
          </h1>
          <p className="description text-center">
            BTree is a governance and issuing service for Barcodes as an alternative to GS1. Gives businesses a global
            database to share product information.
          </p>
        </div>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          {registered ? (
            <div>
              <NavLink href="/">Get Barcodes</NavLink>
            </div>
          ) : (
            <div onClick={handleGetRegisterClick}>
              <NavLink href="/">Register your company</NavLink>
            </div>
          )}

          {showCompanyRegisterForm && (
            <Modal onClose={() => setShowCompanyRegisterForm(false)}>
              <RegistrationForm onSubmit={handleSubmit}></RegistrationForm>
            </Modal>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
