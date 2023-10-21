import Barcode from "react-jsbarcode";
import BarcodeTemplate from "~~/interfaces/BarcodeTemplate";

type BarcodeInfoProps = {
  barcode: BarcodeTemplate;
};

function BarcodeViewer({ barcode }: BarcodeInfoProps) {
  return (
    <div className="flex justify-center items-center flex-col sm:flex-col">
      <h2 className="text-2xl font-bold mb-4">{barcode.product_name}</h2>
      <Barcode value={barcode.barcode.toString()} options={{ format: "code128" }} />
      <span className="mt-4">
        <b>From:</b> {barcode.company_name}
      </span>
      <p className="mb-4">{barcode.company_tax_id}</p>
      {/* <p className="font-bold">{barcode.price}</p> */}
    </div>
  );
}

export default BarcodeViewer;
