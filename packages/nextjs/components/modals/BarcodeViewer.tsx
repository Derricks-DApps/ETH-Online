import Barcode from "react-jsbarcode";
import BarcodeTemplate from "~~/interfaces/BarcodeTemplate";

type BarcodeInfoProps = {
  barcode: BarcodeTemplate;
};

function BarcodeViewer({ barcode }: BarcodeInfoProps) {
  return (
    <div className="flex justify-center items-center flex-col sm:flex-col">
      <h2 className="text-2xl font-bold mb-4">{barcode.product_name}</h2>
      <img
        src="https://img.freepik.com/free-vector/podium-background_1017-2249.jpg?size=338&ext=jpg&ga=GA1.2.386372595.1697587200&semt=ais"
        alt="no product pic"
        width="200"
        height="200"
      />
      {/* TODO add condition for pic  */}
      <Barcode value={barcode.barcode.toString()} options={{ format: "code128" }} />
      <span className="mt-4">
        <b>Owner:</b> {barcode.company_name}
      </span>
      <p className="mb-4">{barcode.company_tax_id}</p>
      {/* <p className="font-bold">{barcode.price}</p> */}
    </div>
  );
}

export default BarcodeViewer;
