import { useEffect } from "react";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import BarcodeTemplate from "~~/interfaces/BarcodeTemplate";

interface BarcodeRowProps {
  key: string;
  barcode: BarcodeTemplate;
  onClick: (barcode: BarcodeTemplate) => void;
  onUpdate: (updatedBarcode: BarcodeTemplate) => void;
}

const BarcodeRow: React.FC<BarcodeRowProps> = ({ barcode, onClick, onUpdate }) => {
  const { data: company } = useScaffoldContractRead({
    contractName: "BTN",
    functionName: "companies",
    args: [barcode.product_productOwner],
  });

  useEffect(() => {
    if (company) {
      barcode.company_tax_id = company[2];
      barcode.company_name = company[3];
      console.log("New barcode: ", barcode);
      onUpdate(barcode);
    }
  }, [company]);

  return (
    <tr onClick={() => onClick(barcode)} className="cursor-pointer">
      {/* <td style={{ maxWidth: "10%" }}>{barcode.id}</td> */}
      <td style={{ maxWidth: "40%" }}>{barcode.barcode}</td>
      <td style={{ maxWidth: "50%" }}>{barcode.company_name || "Loading..."}</td>
      <td style={{ maxWidth: "50%" }}>{barcode.company_tax_id || "Loading..."}</td>
      <td style={{ maxWidth: "50%" }}>{barcode.product_name}</td>
      <td style={{ maxWidth: "50%" }} onClick={() => onClick(barcode)} className="bg-primary-focus:hover">
        <a className="font-semibold text-center">Check details</a>
      </td>
      {/* <td>{barcode.description}</td>
    <td>{barcode.price}</td> */}
    </tr>
  );
};

export default BarcodeRow;
