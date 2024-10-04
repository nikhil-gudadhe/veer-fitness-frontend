import React, {useState, useEffect} from 'react'
import UserModel from './UserModel';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { UserFormInputs } from '../../types/UserFormInputs';

const User: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        //setCurrentMember(null);
      };

      const handleAddUser = (user: UserFormInputs) => {
        // if (member._id) {
        //     dispatch(updateMember(member));
        //   } else {
        //     dispatch(registerMember(member));
        //   }
        handleCloseModal();
    };
      

 return (
    <>
        <Breadcrumb pageName="User" />
        <div className="flex flex-col gap-y-4 rounded-sm border border-stroke bg-white p-3 shadow-default dark:border-strokedark dark:bg-boxdark sm:flex-row sm:items-center sm:justify-between">
        <div>
            <button onClick={handleOpenModal} className="flex items-center gap-2 rounded bg-primary py-2 px-4.5 font-medium text-white hover:bg-opacity-90">
                <svg className="fill-current" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 7H9V1C9 0.4 8.6 0 8 0C7.4 0 7 0.4 7 1V7H1C0.4 7 0 7.4 0 8C0 8.6 0.4 9 1 9H7V15C7 15.6 7.4 16 8 16C8.6 16 9 15.6 9 15V9H15C15.6 9 16 8.6 16 8C16 7.4 15.6 7 15 7Z" fill=""></path>
                </svg>
                New User
            </button>
        </div>
        <div className="flex flex-col gap-4 2xsm:flex-row 2xsm:items-center">
            <div className="flex -space-x-2">
            </div>
            <div>
            </div>
        </div>
        </div>

        <UserModel isOpen={isModalOpen}  onClose={handleCloseModal} onSubmit={handleAddUser}/>
    
        <div className="flex flex-col gap-10 mt-5">
            {/* <MemberList onEdit={handleEditMember} /> */}
        </div>
    </>
    );
}

export default User