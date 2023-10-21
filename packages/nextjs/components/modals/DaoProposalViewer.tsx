import { Dialog, Transition } from "@headlessui/react";
import DaoTemplate from "~~/interfaces/DaoTemplate";

type DaoProposalInfoProps = {
  proposal: DaoTemplate;
  isOpen: boolean;
  onClose: () => void;
};

function DaoProposalViewer({ proposal, onClose }: DaoProposalInfoProps) {
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
            {proposal && (
              <div className="flex justify-center items-center flex-col sm:flex-col">
                <h2 className="text-2xl font-bold mb-4">{proposal.title}</h2>
                <p className="mb-4">{proposal.shortDescription}</p>
                <p className="mb-4">{proposal.longerDescription}</p>
                <p className="mb-4">{proposal.technicalSpecification}</p>
                <p className="mb-4">{proposal.metrics}</p>
                <p className="mb-4">{proposal.teamDescription}</p>
                <p className="mb-4">{proposal.nextSteps}</p>
              </div>
            )}
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default DaoProposalViewer;
