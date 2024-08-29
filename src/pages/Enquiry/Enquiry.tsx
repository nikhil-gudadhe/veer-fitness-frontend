import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../store/store';
import { EnquiryFormInputs } from '../../types/EnquiryFormInputs';
import EnquiryModal from './EnquiryModal';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import EnquiryList from './EnquiryList';
import { createEnquiry, fetchEnquiries, updateEnquiry, resetSuccess, resetError} from '../../../store/Slices/enquirySlice';
import { toast } from 'react-toastify';

const Enquiry: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEnquiry, setCurrentEnquiry] = useState<EnquiryFormInputs | null>(null);
  

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  const dispatch = useDispatch<AppDispatch>();
  const { success, error } = useSelector((state: RootState) => state.enquiries);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentEnquiry(null)
  };

  const handleAddEnquiry = (enquiry: EnquiryFormInputs) => {
    setCurrentEnquiry(null);
    if (enquiry._id) {
      dispatch(updateEnquiry(enquiry));
    } else {
      dispatch(createEnquiry(enquiry)).then(() => {
        dispatch(fetchEnquiries({ page: currentPage, limit: rowsPerPage }));
      });
    } 
    handleCloseModal();
  };

  const handleEditEnquiry = (enquiry: EnquiryFormInputs) => {
    setCurrentEnquiry(enquiry);
    handleOpenModal();
  };

  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch(resetSuccess());
    }

    if (error) {
      toast.error(error);
      dispatch(resetError());
    }
  }, [success, error, dispatch]);

  return (
    <>
      <Breadcrumb pageName="Enquiry" />

      <div className="flex flex-col gap-y-4 rounded-sm border border-stroke bg-white p-3 shadow-default dark:border-strokedark dark:bg-boxdark sm:flex-row sm:items-center sm:justify-between">
      <div>
          <button onClick={handleOpenModal} className="flex items-center gap-2 rounded bg-primary py-2 px-4.5 font-medium text-white hover:bg-opacity-90">
              <svg className="fill-current" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 7H9V1C9 0.4 8.6 0 8 0C7.4 0 7 0.4 7 1V7H1C0.4 7 0 7.4 0 8C0 8.6 0.4 9 1 9H7V15C7 15.6 7.4 16 8 16C8.6 16 9 15.6 9 15V9H15C15.6 9 16 8.6 16 8C16 7.4 15.6 7 15 7Z" fill=""></path>
              </svg>
              New Enquiry
          </button>
      </div>
      <div className="flex flex-col gap-4 2xsm:flex-row 2xsm:items-center">
          <div className="flex -space-x-2">
          </div>
          <div>
          </div>
      </div>
    </div>
      <EnquiryModal isOpen={isModalOpen} onClose={handleCloseModal} enquiry={currentEnquiry} onSubmit={handleAddEnquiry} />
      <div className="flex flex-col gap-10 mt-5">
        <EnquiryList 
          onEdit={handleEditEnquiry} 
          currentPage={currentPage}
          rowsPerPage={rowsPerPage}
          setCurrentPage={setCurrentPage}
          setRowsPerPage={setRowsPerPage}
        />
      </div>
    </>
  );
};

export default Enquiry;