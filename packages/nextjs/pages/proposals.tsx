import React, { useState } from "react";
import { MetaHeader } from "~~/components/MetaHeader";
import DaoProposalViewer from "~~/components/modals/DaoProposalViewer";
import daos from "~~/data/daos";
import DaoTemplate from "~~/interfaces/DaoTemplate";

const DaoPropsals = () => {
  const [selectedDao, setSelectedDao] = useState<DaoTemplate | null>(null);

  const handleRowClick = (dao: DaoTemplate) => {
    setSelectedDao(dao);
  };

  const handleCloseModal = () => {
    setSelectedDao(null);
  };

  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center mb-8">
            <span className="block text-4xl font-bold">Dao Proposal Explorer</span>
          </h1>
          <br />
          <p>This page is under construction. Please check back later.</p>

          <table className="table text-xl bg-base-100 table-zebra w-full md:table-md table-sm">
            <thead>
              <tr className="rounded-xl text-sm text-base-content">
                <th className="text-left bg-primary hover text-sm">Title</th>
                <th className="text-left bg-primary hover text-sm">Short Description</th>
                <th className="text-left bg-primary hover text-sm">Longer Description</th>
                <th className="text-left bg-primary hover text-sm">Technical Specification</th>
                <th className="text-left bg-primary hover text-sm">Metrics</th>
                <th className="text-left bg-primary hover text-sm">Team Description</th>
                <th className="text-left bg-primary hover text-sm">Next Steps</th>
              </tr>
            </thead>
            <tbody>
              {daos.map(dao => (
                <tr key={dao.id} onClick={() => handleRowClick(dao)} className="cursor-pointer">
                  <td>{dao.title}</td>
                  <td>{dao.shortDescription}</td>
                  <td>{dao.longerDescription}</td>
                  <td>{dao.technicalSpecification}</td>
                  <td>{dao.metrics}</td>
                  <td>{dao.teamDescription}</td>
                  <td>{dao.nextSteps}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {selectedDao && <DaoProposalViewer proposal={selectedDao} isOpen={!!selectedDao} onClose={handleCloseModal} />}
      </div>
    </>
  );
};

export default DaoPropsals;
