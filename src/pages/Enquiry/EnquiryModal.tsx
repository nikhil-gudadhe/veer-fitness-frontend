import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import { createEnquiry } from '../../../store/Slices/enquirySlice';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: EnquiryFormInputs) => void;
}

interface EnquiryFormInputs {
  fullName: string;
  mobile: string;
  previousGymExperience: boolean;
  reference?: string;
  fitnessGoal: string;
  target: string;
  preferredTimeSlot: string;
  note?: string;
}

const EnquiryModal: React.FC<EnquiryModalProps> = ({ isOpen, onClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<EnquiryFormInputs>();
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit: SubmitHandler<EnquiryFormInputs> = data => {
    dispatch(createEnquiry(data));
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
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">Full Name</label>
            <input
              {...register('fullName', { required: true })}
              type="text"
              placeholder="Enter your full name"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
            {errors.fullName && <span className="text-red-500">Full Name is required</span>}
          </div>

          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">Mobile</label>
            <input
              {...register('mobile', { required: true })}
              type="text"
              placeholder="Enter your mobile number"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
            {errors.mobile && <span className="text-red-500">Mobile is required</span>}
          </div>

          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">Previous Gym Experience</label>
            <select
              {...register('previousGymExperience', { required: true })}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            >
              <option value="">Select an option</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            {errors.previousGymExperience && <span className="text-red-500">Previous Gym Experience is required</span>}
          </div>

          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">Reference</label>
            <input
              {...register('reference')}
              type="text"
              placeholder="Any reference (through existing member, online ads)"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">Fitness Goal</label>
            <input
              {...register('fitnessGoal', { required: true })}
              type="text"
              placeholder="What's your fitness goal?"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
            {errors.fitnessGoal && <span className="text-red-500">Fitness Goal is required</span>}
          </div>

          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">Target</label>
            <input
              {...register('target', { required: true })}
              type="text"
              placeholder="Any specific target to achieve? (e.g lose 10 kg weight)"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
            {errors.target && <span className="text-red-500">Target is required</span>}
          </div>

          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">Preferred Timing Slot</label>
            <input
              {...register('preferredTimeSlot', { required: true })}
              type="text"
              placeholder="Enter your preferred timing slot (morning/evening)"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
            {errors.preferredTimeSlot && <span className="text-red-500">Preferred Timing Slot is required</span>}
          </div>

          <div className="mb-6">
            <label className="mb-2.5 block text-black dark:text-white">Note</label>
            <textarea
              {...register('note')}
              rows={6}
              placeholder="Type any custom note"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            ></textarea>
          </div>

          <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EnquiryModal;
