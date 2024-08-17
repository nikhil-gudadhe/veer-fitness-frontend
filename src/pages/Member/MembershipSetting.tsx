import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../store/store';
import { fetchMemberById, extendMembership } from '../../../store/Slices/memberSlice';
import { fetchMembershipPlans } from '../../../store/Slices/membershipPlanSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

interface MembershipSettingFormInputs {
  planId: string;
  duration: number;
}

const MembershipSetting: React.FC = () => {
  const { memberId } = useParams<{ memberId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { currentMember, loading, error } = useSelector((state: RootState) => state.members);
  const { membershipPlans } = useSelector((state: RootState) => state.plans);

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<MembershipSettingFormInputs>({
    defaultValues: {
      planId: '',
      duration: 1,
    },
  });

  useEffect(() => {
    dispatch(fetchMembershipPlans());
    if (memberId) {
      dispatch(fetchMemberById(memberId));
    }
  }, [dispatch, memberId]);

  useEffect(() => {
    if (currentMember) {
      reset({
        planId: currentMember?.membership?.plan._id || '',
        duration: currentMember?.membership?.plan.duration || 1,
      });
    }
  }, [currentMember, reset]);

  const selectedPlanId = watch('planId');
  const selectedDuration = watch('duration');

  const onSubmit: SubmitHandler<MembershipSettingFormInputs> = (data) => {
    if (currentMember?._id) {
      dispatch(extendMembership({
        memberId: currentMember._id,
        duration: data.duration,
        newPlanId: data.planId,
      })).then(() => {
        console.log("Membership extended successfully");
        navigate('/members');
      }).catch((error) => {
        console.error("Error extending membership:", error);
      });
    } else {
      console.error("No member ID available for extending membership");
    }
  };

  return (
    <>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Membership Settings" />

        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Membership Information
                </h3>
              </div>
              <div className="p-7">
                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* Existing Form Fields */}
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    {/* First Name */}
                    <div className="w-full sm:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        First Name
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="firstName"
                        placeholder=""
                        value={currentMember?.firstName || ''}
                        disabled
                      />
                    </div>
                    {/* Last Name */}
                    <div className="w-full sm:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Last Name
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="lastName"
                        placeholder=""
                        value={currentMember?.lastName || ''}
                        disabled
                      />
                    </div>
                  </div>
                  {/* Select Plan */}
                  <div className="mb-5.5">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">Select Plan</label>
                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                      <select
                        {...register('planId', { required: 'Plan selection is required' })}
                        value={selectedPlanId}
                        className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-black dark:text-white"
                      >
                        <option value="" disabled>Select a plan</option>
                        {membershipPlans.map((plan) => (
                          <option key={plan._id} value={plan._id}>
                            {plan.name}
                          </option>
                        ))}
                      </select>
                      {errors.planId && <span className="text-red-500">{errors.planId.message}</span>}
                    </div>
                  </div>
                  {/* Plan Duration */}
                  <div className="mb-5.5">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">Plan Duration (Months)</label>
                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                      <select
                        {...register('duration', { required: 'Duration is required' })}
                        value={selectedDuration}
                        className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-black dark:text-white"
                      >
                        {[...Array(12).keys()].map((i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1} Month{i + 1 > 1 ? 's' : ''}
                          </option>
                        ))}
                      </select>
                      {errors.duration && <span className="text-red-500">{errors.duration.message}</span>}
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

                  {/* Submit Buttons */}
                  <div className="flex justify-end gap-4.5">
                    <button
                      className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      type="button"
                      onClick={() => navigate('/members')}
                    >
                      Cancel
                    </button>
                    <button
                      className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                      type="submit"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>



          {/* Reserved Section */}

          {currentMember?.membership?.extensions && currentMember.membership.extensions.length > 0 && (
            <div className="mt-6">
              <h4 className="font-medium text-black dark:text-white">
                Extension History
              </h4>
              <ul className="list-disc pl-5 text-black dark:text-white">
                {currentMember.membership.extensions.map((extension, index) => (
                  <li key={index}>
                    Extended on: {new Date(extension.extendedAt).toLocaleDateString()} for {extension.duration} month(s), new end date: {new Date(extension.newEndDate).toLocaleDateString()}
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default MembershipSetting;
