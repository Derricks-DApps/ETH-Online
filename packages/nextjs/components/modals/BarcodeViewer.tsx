import { Dialog, Transition } from "@headlessui/react";
import Barcode from "react-jsbarcode";
import BarcodeTemplate from "~~/interfaces/BarcodeTemplate";

type BarcodeInfoProps = {
  barcode: BarcodeTemplate;
  isOpen: boolean;
  onClose: () => void;
};

function BarcodeViewer({ barcode, onClose }: BarcodeInfoProps) {
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
            {barcode && (
              <div className="flex justify-center items-center flex-col sm:flex-col">
                <h2 className="text-2xl font-bold mb-4">{barcode.productName}</h2>
                <Barcode value={barcode.id.toString()} options={{ format: "code128" }} />
                <p className="mb-4">{barcode.description}</p>
                <p className="font-bold">{barcode.price}</p>
              </div>
            )}
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default BarcodeViewer;
