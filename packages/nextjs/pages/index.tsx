import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import BarcodeGenerator from "../components/modals/CreateBarcode";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const router = useRouter();
  const isActive = router.pathname === href;

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const { data: company } = useScaffoldContractRead({
    contractName: "BTN",
    functionName: "companies",
    args: ["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"],
  });

  useEffect(() => {
    console.log("Company: ", company);
  }, []);

  return (
    <Link
      href={href}
      passHref
      style={{
        backgroundColor: "cadetblue",
        color: "white",
        width: "30%",
        margin: "auto",
        padding: "20px",
        textAlign: "center",
        fontSize: "1.5em",
      }}
      onClick={handleClick as any}
      className={`${
        isActive ? "bg-secondary shadow-md" : ""
      } hover:bg-secondary hover:shadow-md focus:!bg-secondary active:!text-neutral py-1.5 px-3 text-sm rounded-full gap-2 grid grid-flow-col`}
    >
      {children}
    </Link>
  );
};

const Home: NextPage = () => {
  const [showBarcodeGenerator, setShowBarcodeGenerator] = useState(false);
  // const [showCompanyRegistration, setShowCompanyRegistration] = useState(false);

  const handleGetBarcodeClick = () => {
    setShowBarcodeGenerator(true);
  };

  // const handleRegisterCompanyClick = () => {
  //   setShowCompanyRegistration(true);
  // };

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
          {/* <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
               <BugAntIcon className="h-8 w-8 fill-secondary" />
              <strong>0.1 ETH</strong>
              <p>Have a Barcode NFT minted and created for you to own and lable products with.</p>
            </div>

            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <SparklesIcon className="h-8 w-8 fill-secondary" />
              <strong>0.01 ETH</strong>
              <p>Valid product barcodes to prevent theft or fraud. This platform is secure</p>
            </div>

            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <MagnifyingGlassIcon className="h-8 w-8 fill-secondary" />
              <strong>0.05 ETH</strong>
              <p>Become a DAO member and submit proposal and cast votes to improve Barcode services.</p>
            </div>
          </div> */}
          <div onClick={handleGetBarcodeClick}>
            <NavLink href="/">Get a Barcode</NavLink>
          </div>

          {showBarcodeGenerator && <BarcodeGenerator onClose={() => setShowBarcodeGenerator(false)}></BarcodeGenerator>}
        </div>
      </div>
    </>
  );
};

export default Home;
