import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../store/store';
import { EnquiryFormInputs } from '../../types/EnquiryFormInputs';
import EnquiryModal from './EnquiryModal';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import EnquiryList from './EnquiryList';
import { createEnquiry, updateEnquiry, resetSuccess, resetError} from '../../../store/Slices/enquirySlice';
import { toast } from 'react-toastify';

const Enquiry: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEnquiry, setCurrentEnquiry] = useState<EnquiryFormInputs | null>(null);
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
    if (enquiry._id) {
      dispatch(updateEnquiry(enquiry));
    } else {
      dispatch(createEnquiry(enquiry));
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
            {/* <button className="h-9 w-9 rounded-full border-2 border-white dark:border-boxdark"><img src="/assets/user-07-2cbc01aa.png" alt="User"/></button><button className="h-9 w-9 rounded-full border-2 border-white dark:border-boxdark"><img src="/assets/user-08-2a26f8eb.png" alt="User"/></button><button className="h-9 w-9 rounded-full border-2 border-white dark:border-boxdark"><img src="/assets/user-09-117ea350.png" alt="User"/></button><button className="h-9 w-9 rounded-full border-2 border-white dark:border-boxdark"><img src="/assets/user-10-61b33c60.png" alt="User"/></button> */}
            {/* <button className="flex h-9 w-9 items-center justify-center rounded-full border border-stroke bg-white text-primary dark:border-strokedark dark:bg-[#4f5e77] dark:text-white">
                <svg className="fill-current" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 7H9V1C9 0.4 8.6 0 8 0C7.4 0 7 0.4 7 1V7H1C0.4 7 0 7.4 0 8C0 8.6 0.4 9 1 9H7V15C7 15.6 7.4 16 8 16C8.6 16 9 15.6 9 15V9H15C15.6 9 16 8.6 16 8C16 7.4 15.6 7 15 7Z" fill=""></path>
                </svg>
            </button> */}
          </div>
          <div>
            {/* <button onClick={handleOpenModal} className="flex items-center gap-2 rounded bg-primary py-2 px-4.5 font-medium text-white hover:bg-opacity-90">
                <svg className="fill-current" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 7H9V1C9 0.4 8.6 0 8 0C7.4 0 7 0.4 7 1V7H1C0.4 7 0 7.4 0 8C0 8.6 0.4 9 1 9H7V15C7 15.6 7.4 16 8 16C8.6 16 9 15.6 9 15V9H15C15.6 9 16 8.6 16 8C16 7.4 15.6 7 15 7Z" fill=""></path>
                </svg>
                Add Enquiry
            </button> */}
            {/* <div className="fixed left-0 top-0 z-99999 flex h-screen w-full justify-center overflow-y-scroll bg-black/80 px-4 py-5 hidden">
                <div className="relative m-auto w-full max-w-180 rounded-sm border border-stroke bg-gray p-4 shadow-default dark:border-strokedark dark:bg-meta-4 sm:p-8 xl:p-10">
                  <button className="absolute right-1 top-1 sm:right-5 sm:top-5">
                      <svg className="fill-current" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.8913 9.99599L19.5043 2.38635C20.032 1.85888 20.032 1.02306 19.5043 0.495589C18.9768 -0.0317329 18.141 -0.0317329 17.6135 0.495589L10.0001 8.10559L2.38673 0.495589C1.85917 -0.0317329 1.02343 -0.0317329 0.495873 0.495589C-0.0318274 1.02306 -0.0318274 1.85888 0.495873 2.38635L8.10887 9.99599L0.495873 17.6056C-0.0318274 18.1331 -0.0318274 18.9689 0.495873 19.4964C0.717307 19.7177 1.05898 19.9001 1.4413 19.9001C1.75372 19.9001 2.13282 19.7971 2.40606 19.4771L10.0001 11.8864L17.6135 19.4964C17.8349 19.7177 18.1766 19.9001 18.5589 19.9001C18.8724 19.9001 19.2531 19.7964 19.5265 19.4737C20.0319 18.9452 20.0245 18.1256 19.5043 17.6056L11.8913 9.99599Z" fill=""></path>
                      </svg>
                  </button>
                </div>
            </div> */}
          </div>
      </div>
    </div>
      <EnquiryModal isOpen={isModalOpen} onClose={handleCloseModal} enquiry={currentEnquiry} onSubmit={handleAddEnquiry} />
      {/* Enquiry List can go here */}
      <div className="flex flex-col gap-10 mt-5">
        <EnquiryList onEdit={handleEditEnquiry}/>
      </div>
    </>
  );
};

export default Enquiry;