import Link from "next/link";
import type { NextPage } from "next";
import { BugAntIcon, MagnifyingGlassIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { MetaHeader } from "~~/components/MetaHeader";
import { useRouter } from "next/router";

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const router = useRouter();
  const isActive = router.pathname === href;

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
        fontSize: "1.5em"

    }}
      className={`${
        isActive ? "bg-secondary shadow-md" : ""
      } hover:bg-secondary hover:shadow-md focus:!bg-secondary active:!text-neutral py-1.5 px-3 text-sm rounded-full gap-2 grid grid-flow-col`}
    >
      {children}
    </Link>
  );
};

const Home: NextPage = () => {
  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center mb-8">
            <span className="block text-4xl font-bold">BTree</span>
          </h1>
          <br />
          <p>Governance and issuing service for Barcodes
            as an alternative to GS1. Gives Busnisesses a global database to share product information.
          </p>

        </div>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              {/* <BugAntIcon className="h-8 w-8 fill-secondary" /> */}
              <strong>0.1 ETH</strong> 
              <p>
                Have a Barcode NFT minted and created for you to own and lable products with.
              </p>
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              {/* <SparklesIcon className="h-8 w-8 fill-secondary" /> */}
              <strong>0.01 ETH</strong> 
              <p>
                Valid product barcodes to prevent theft or fraud. This platform is secure
              </p>
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              {/* <MagnifyingGlassIcon className="h-8 w-8 fill-secondary" /> */}
              <strong>0.05 ETH</strong>
              <p>
                Become a DAO member and submit proposal and cast votes to improve Barcode services.
              </p>
            </div>          
          </div>
          <br />
          <br />
          <br />
          <div>
            <NavLink href="/">Get a Barcode</NavLink>
            </div>
        </div>
      </div>
    </>
  );
};

export default Home;
