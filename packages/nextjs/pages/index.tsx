import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { MetaHeader } from "~~/components/MetaHeader";
import NavLink from "~~/components/NavLink";
import ProductForm from "~~/components/forms/ProductForm";
import RegistrationForm from "~~/components/forms/RegistrationForm";
import Modal from "~~/components/modals/Modal";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

// import { BTNAbi } from

const Home: NextPage = () => {
  const [showProductForm, setShowProductForm] = useState(false);
  const [showCompanyRegisterForm, setShowCompanyRegisterForm] = useState(false);

  const [registered, setRegistered] = useState(false);
  const [checkingRegister, setCheckingRegister] = useState(false);

  //const contractAddress = "0x3d30881088968DC28ce0D6F07Eda38c4E30cF55c";
  const { address } = useAccount();

  const handleGetRegisterClick = () => {
    setShowCompanyRegisterForm(true);
  };

  const handleGetProductForm = () => {
    setShowProductForm(true);
  };

  const { data: company } = useScaffoldContractRead({
    contractName: "BTN",
    functionName: "companies",
    args: [address],
  });

  useEffect(() => {
    setCheckingRegister(true);
    if (company && Number(company[1]) > 0) {
      setRegistered(true);
    }
  }, []);

  useEffect(() => {
    if (company && Number(company[1]) > 0) {
      setRegistered(true);
    }
    setCheckingRegister(false);
  }, [company, checkingRegister]);

  async function handleRegisterSubmit() {
    setShowCompanyRegisterForm(false);
  }

  async function handleProductSubmit() {
    setShowProductForm(false);
  }

  // const { writeAsync: unregister } = useScaffoldContractWrite({
  //   contractName: "BTN",
  //   functionName: "ungister",
  //   args: [address],
  // });

  // async function triggerUnregister() {
  //   await unregister();
  // }

  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5 max-w-screen-lg mx-auto">
          <h1 className="text-center mb-8">
            {/* <span className="block text-4xl font-bold">BTree</span> */}
            <img src="/assets/logo.png" alt="BTree" style={{ display: "inline", width: "256px", height: "256px" }} />
          </h1>
          {!registered && !!company ? (
            <>
              <p className="description text-center">
                BTree is a governance and issuing service for Barcodes as an alternative to GS1.
              </p>
              <p>We give businesses a global database on which to share product information.</p>
            </>
          ) : (
            company !== undefined && (
              <>
                <p className="description text-center">Welcome! You are now producing barcodes as {company[3]}</p>
                <p className="description text-center">with Tax ID: {company[2]}</p>
              </>
            )
          )}
        </div>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          {checkingRegister ? (
            <p>We are checking to see if you are registered...</p>
          ) : registered ? (
            <div>
              <div onClick={handleGetProductForm}>
                <NavLink href="/">Get Barcodes</NavLink>
              </div>

              {/* <div onClick={triggerUnregister}>
                <NavLink href="/">Unregister</NavLink>
              </div> */}
            </div>
          ) : (
            <div onClick={handleGetRegisterClick}>
              <NavLink href="/">Register your company</NavLink>
            </div>
          )}

          {showCompanyRegisterForm && (
            <Modal onClose={() => setShowCompanyRegisterForm(false)}>
              <RegistrationForm onSubmit={handleRegisterSubmit}></RegistrationForm>
            </Modal>
          )}

          {showProductForm && (
            <Modal onClose={() => setShowProductForm(false)}>
              <ProductForm onSubmit={handleProductSubmit}></ProductForm>
            </Modal>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
