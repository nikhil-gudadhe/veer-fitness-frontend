import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import { MemberPlanFormInputs } from '../../types/MemberPlanFormInputs';

interface MemberPlanModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: MemberPlanFormInputs) => void;
    member?: MemberPlanFormInputs | null;
}

const MemberModel: React.FC<MemberPlanModalProps> = ({ isOpen, onClose, member }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<MemberPlanFormInputs>({
        defaultValues: member || {
            firstName: '',
            lastName: '',
            email: '',
            mobile: undefined,
            gender: '',
            age: undefined,
            address: '',
            planId: '',
        },
    });

    const onSubmit: SubmitHandler<MemberPlanFormInputs> = (data) => {
        if (data._id) {
            //dispatch(updateMembershipPlan(data));
        } else {
            //dispatch(createMembershipPlan(data));
        }
        onClose();
    };
    if (!isOpen) return null;
  return (
    <div className="fixed left-0 top-0 z-99999 flex h-screen w-full justify-center overflow-y-scroll bg-black/80 px-4 py-5">
    <div className="relative m-auto w-full max-w-180 rounded-sm border border-stroke bg-gray p-4 shadow-default dark:border-strokedark dark:bg-meta-4 sm:p-8 xl:p-10">
        <button className="absolute right-1 top-1 sm:right-5 sm:top-5" onClick={onClose}>
            <svg className="fill-current" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.8913 9.99599L19.5043 2.38635C20.032 1.85888 20.032 1.02306 19.5043 0.495589C18.9768 -0.0317329 18.141 -0.0317329 17.6135 0.495589L10.0001 8.10559L2.38673 0.495589C1.85917 -0.0317329 1.02343 -0.0317329 0.495873 0.495589C-0.0318274 1.02306 -0.0318274 1.85888 0.495873 2.38635L8.10887 9.99599L0.495873 17.6056C-0.0318274 18.1331 -0.0318274 18.9689 0.495873 19.4964C0.717307 19.7177 1.05898 19.9001 1.4413 19.9001C1.75372 19.9001 2.13282 19.7971 2.40606 19.4771L10.0001 11.8864L17.6135 19.4964C17.8349 19.7177 18.1766 19.9001 18.5589 19.9001C18.8724 19.9001 19.2531 19.7964 19.5265 19.4737C20.0319 18.9452 20.0245 18.1256 19.5043 17.6056L11.8913 9.99599Z"
                    fill=""
                ></path>
            </svg>
        </button>
        <form onSubmit={handleSubmit(onSubmit)}>
            
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">First Name</label>
                <input 
                    {...register('firstName', { required: true })}
                    type="text" 
                    placeholder="Enter first name" 
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" 
                />
                {errors.firstName && <span className="text-red-500">First name is required</span>}
                </div>

                <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">Last Name</label>
                <input 
                    {...register('lastName', { required: true })}
                    type="text" 
                    placeholder="Enter last name" 
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" 
                />
                {errors.firstName && <span className="text-red-500">Last name is required</span>}
                </div>
            </div>

            <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">Mobile</label>
                <input
                    {...register('mobile', { required: true })}
                    type="text"
                    placeholder="Enter mobile number"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                {errors.mobile && <span className="text-red-500">Mobile is required</span>}
            </div>

            <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">Email</label>
                <input
                    {...register('email', { required: true })}
                    type="text"
                    placeholder="Enter email address"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                {errors.email && <span className="text-red-500">Email is required</span>}
            </div>

            <div className="mb-5.5">
            <label className="mb-2.5 block text-black dark:text-white">Gender</label>
            <div className="relative z-20 bg-transparent dark:bg-form-input">
                <select
                    {...register('gender', { required: true })}
                    defaultValue=""
                    className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-black dark:text-white"
                >
                    <option value="" disabled>Select an option</option>
                    <option value="true">Male</option>
                    <option value="false">Female</option>
                </select>
                {errors.gender && <span className="text-red-500">Gender is required</span>}
                <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
                    <svg className="fill-current" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g opacity="0.8">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                fill=""
                            ></path>
                        </g>
                    </svg>
                </span>
            </div>
            </div>

            <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">Age</label>
                <input
                    {...register('age', { required: true })}
                    type="text"
                    placeholder="Enter age"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                {errors.age && <span className="text-red-500">Age is required</span>}
            </div>

            <div className="mb-6">
                <label className="mb-2.5 block text-black dark:text-white">Address</label>
                <textarea
                    {...register('address')}
                    rows={6}
                    placeholder="Enter address"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                ></textarea>
            </div>

            <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                Submit
            </button>
        </form>
    </div>
    </div>
  )
}

export default MemberModel
