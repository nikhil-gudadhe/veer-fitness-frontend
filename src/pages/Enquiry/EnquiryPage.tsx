// EnquiryPage.tsx
import React, { useState } from 'react';
import EnquiryModal from './EnquiryModal';

const EnquiryPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddEnquiry = (enquiry: { reference: string; gymExperience: boolean }) => {
    // Handle the new enquiry here (e.g., send it to the backend)
    console.log('New Enquiry:', enquiry);
  };

  return (
    <div>
      <button onClick={handleOpenModal} className="mb-4 rounded bg-primary px-4 py-2 text-white">
        Add New Enquiry
      </button>
      <EnquiryModal isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleAddEnquiry} />
      {/* Enquiry List can go here */}
    </div>
  );
};

export default EnquiryPage;
