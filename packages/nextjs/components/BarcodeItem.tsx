import Barcode from "react-jsbarcode";
import BarcodeTemplate from "~~/interfaces/BarcodeTemplate";

interface BarcodeProps {
  barcode: BarcodeTemplate;
}

const BarcodeItem: React.FC<BarcodeProps> = ({ barcode }) => {
  return (
    <div className="rounded-lg overflow-hidden bg-gray-700 hover:bg-gray-800 hover:shadow-sm transition delay-30">
      <div className="p-4 flex flex-col items-center gap-3">
        <h2 className="text-xl font-bold mb-2">{barcode.product_name}</h2>
        <div className="w-full">
          <Barcode value={String(barcode.barcode)} className="w-full" />
        </div>

        {/* <p className="text-white-700 text-base">{barcode.description}</p> */}
      </div>
    </div>
  );
};

export default BarcodeItem;
