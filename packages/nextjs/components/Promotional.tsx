import { BugAntIcon, MagnifyingGlassIcon, SparklesIcon } from "@heroicons/react/24/outline";

function Promotional() {
  return (
    <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
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
    </div>
  );
}

export default Promotional;
