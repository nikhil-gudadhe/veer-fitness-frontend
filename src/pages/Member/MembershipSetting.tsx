import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../store/store';
import { fetchMemberById, extendMembership } from '../../../store/Slices/memberSlice';
import { fetchMembershipPlans } from '../../../store/Slices/membershipPlanSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { PDFDownloadLink } from '@react-pdf/renderer';
import InvoicePDF from '../../components/Invoice';

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
      // Get the latest extension if available
      const latestExtension = currentMember.membership?.extensions?.slice(-1)[0];
      const selectedPlanId = currentMember.membership?.plan._id;
      const selectedDuration = latestExtension ? latestExtension.duration : currentMember.membership?.plan.duration;

      reset({
        planId: selectedPlanId || '',
        duration: selectedDuration || 1,
      });
    }
  }, [currentMember, reset]);

  const selectedPlanId = watch('planId');
  const selectedDuration = watch('duration');

  const onSubmit: SubmitHandler<MembershipSettingFormInputs> = (data) => {
    const requestData: any = {
        memberId: currentMember?._id,
        duration: Number(data.duration),
    };

    if (data.planId !== currentMember?.membership?.plan._id) {
        requestData.newPlanId = data.planId; // Pass newPlanId only if it has been changed
    }

    console.log("requestData: ", requestData)

    dispatch(extendMembership(requestData))
        .then(() => {
            console.log("Membership extended/updated successfully");
            //navigate('/members');
        })
        .catch((error) => {
            console.error("Error extending/updating membership:", error);
        });
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
                      Renew Membership
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Reserved Section */}

          <div className="col-span-5 xl:col-span-2">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Current Plan  
                </h3>
              </div>
              <div className="p-7">
                <h4 className="mb-3 text-xl font-semibold text-black dark:text-white"> 
                  {currentMember?.membership?.plan.name}
                  </h4>
                  <p>{currentMember?.membership?.plan.description}</p>
                  <ol className="flex flex-wrap items-center gap-3 pt-5">
                    <li className="flex items-center gap-3.5 font-medium text-black dark:text-white">
                      Plan Duration:
                    </li>
                    <li>
                        <span>{currentMember?.membership?.plan.duration} Months</span>
                    </li>
                  </ol>
                  <ol className="flex flex-wrap items-center gap-3 pt-2">
                    <li className="flex items-center gap-3.5 font-medium text-black dark:text-white">
                      Started On:
                    </li>
                    <li>
                        <span>
                          {currentMember?.membership?.startDate 
                          ? new Date(currentMember.membership.startDate).toLocaleDateString() 
                          : 'Start date not available'}
                        </span>
                    </li>
                  </ol>
                  <ol className="flex flex-wrap items-center gap-3 pt-2">
                    <li className="flex items-center gap-3.5 font-medium text-black dark:text-white">
                      Ends On:
                    </li>
                    <li>
                        <span>
                          {currentMember?.membership?.endDate 
                          ? new Date(currentMember.membership.endDate).toLocaleDateString() 
                          : 'End date not available'}
                        </span>
                    </li>
                  </ol>
                  <ol className="flex flex-wrap items-center gap-3 pt-2">
                    <li className="flex items-center gap-3.5 font-medium text-black dark:text-white">
                      Expires In:
                    </li>
                    <li>
                        <span>{currentMember?.membership?.endDate 
                        ? `${Math.ceil((new Date(currentMember.membership.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} Days`
                        : 'End date not available'}
                        </span>
                    </li>
                  </ol>
                  <div className="text-right sm:w-3/12 xl:w-6/12 pt-2">
                  {currentMember?.membership?.extensions && currentMember?.membership?.extensions.length > 0 ? 
                  ("") : (<button className="inline-flex rounded bg-primary py-1 px-3 font-medium text-white hover:bg-opacity-90 sm:py-2.5 sm:px-6">Download Invoice</button>) 
                  }
                  </div>
              </div>
            </div>
          </div>
          
          <div className="col-span-5 xl:col-span-5">
            <div className="rounded-sm border border-stroke bg-white py-3 shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Membership History
                </h3>
              </div>
              {currentMember?.membership?.extensions && currentMember?.membership?.extensions.length > 0 ? (
              <div>
              {currentMember.membership.extensions.map((extension, index) => (
                <div  key={index} className="flex justify-between gap-2.5 py-3 px-6 hover:bg-gray-2 dark:hover:bg-meta-4 sm:items-center sm:justify-start">
                  <div className="flex items-center gap-5.5 sm:w-5/12 xl:w-5/12">
                      <div className="hidden h-14 w-full max-w-14 items-center justify-center rounded-full border border-stroke bg-gray text-black-2 dark:border-strokedark dark:bg-graydark dark:text-white sm:flex">
                        <svg className="fill-current" width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.72659 3.36759C5.32314 2.77105 6.13222 2.43591 6.97585 2.43591H16.2295L16.2299 2.43591L16.2303 2.43591C16.4817 2.43591 16.7081 2.54281 16.8665 2.71363L23.7604 9.6075C23.9312 9.76594 24.0381 9.99231 24.0381 10.2437C24.0381 10.2568 24.0378 10.2699 24.0372 10.2828V24.1241C24.0372 24.9677 23.7021 25.7768 23.1055 26.3733C22.509 26.9699 21.6999 27.305 20.8563 27.305H6.97585C6.13222 27.305 5.32313 26.9699 4.72659 26.3733C4.13005 25.7768 3.79492 24.9677 3.79492 24.1241V5.61684C3.79492 4.77321 4.13005 3.96413 4.72659 3.36759ZM6.97585 4.17097H15.3628V10.2437C15.3628 10.7228 15.7512 11.1112 16.2303 11.1112H22.3022V24.1241C22.3022 24.5075 22.1498 24.8753 21.8787 25.1465C21.6075 25.4176 21.2397 25.57 20.8563 25.57H6.97585C6.59238 25.57 6.22462 25.4176 5.95346 25.1465C5.68231 24.8753 5.52997 24.5075 5.52997 24.1241V5.61684C5.52997 5.23337 5.68231 4.86561 5.95346 4.59445C6.22462 4.3233 6.59238 4.17097 6.97585 4.17097ZM17.0979 5.3987L21.0753 9.37613H17.0979V5.3987ZM9.2896 15.1596C8.81048 15.1596 8.42208 15.548 8.42208 16.0271C8.42208 16.5062 8.81048 16.8946 9.2896 16.8946H18.5432C19.0223 16.8946 19.4107 16.5062 19.4107 16.0271C19.4107 15.548 19.0223 15.1596 18.5432 15.1596H9.2896ZM8.42208 20.654C8.42208 20.1749 8.81048 19.7865 9.2896 19.7865H18.5432C19.0223 19.7865 19.4107 20.1749 19.4107 20.654C19.4107 21.1332 19.0223 21.5216 18.5432 21.5216H9.2896C8.81048 21.5216 8.42208 21.1332 8.42208 20.654ZM9.2896 10.5328C8.81048 10.5328 8.42208 10.9212 8.42208 11.4003C8.42208 11.8795 8.81048 12.2679 9.2896 12.2679H11.603C12.0821 12.2679 12.4705 11.8795 12.4705 11.4003C12.4705 10.9212 12.0821 10.5328 11.603 10.5328H9.2896Z" fill=""></path>
                        </svg>
                      </div>
                      <p className="font-medium text-black dark:text-white">Invoice</p>
                  </div> 
                  <div className="hidden w-5/12 xl:block">
                      <p className="font-medium text-black dark:text-white">Previous Expiry Date {new Date(extension.previousEndDate).toLocaleDateString()}</p>
                  </div>
                  <div className="hidden w-5/12 xl:block">
                      <p className="font-medium text-black dark:text-white">New Expiry Date {new Date(extension.newEndDate).toLocaleDateString()}</p>
                  </div>
                  <div className="hidden w-5/12 xl:block">
                      <p className="font-medium text-black dark:text-white">Duration {extension.duration === 1 ? extension.duration + " Month" : " Months(s)"}</p>
                  </div>
                  <div className="hidden w-5/12 xl:block">
                      <p className="font-medium text-black dark:text-white">Extended On {new Date(extension.extendedAt).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right sm:w-3/12 xl:w-2/12"><button className="inline-flex rounded bg-primary py-1 px-3 font-medium text-white hover:bg-opacity-90 sm:py-2.5 sm:px-6">Download</button></div>
                </div>
                
              ))}
              </div>
              ) : (
                <div className="flex justify-between gap-2.5 py-3 px-6 hover:bg-gray-2 dark:hover:bg-meta-4 sm:items-center sm:justify-start">
                  <div className="hidden sm:block sm:w-4/12 xl:w-2/12">
                  <p className="font-medium text-black dark:text-white">No extensions found.</p>
                  </div>
                </div> 
              )}
            </div>
          </div>

          {currentMember?.membership?.extensions && currentMember?.membership?.extensions?.length > 0 && (
            <PDFDownloadLink document={<InvoicePDF />} fileName="invoice.pdf">
              {({ loading }) => (loading ? 'Loading document...' : 'Download Invoice')}
            </PDFDownloadLink>
          )}

        </div>
      </div>
    </>
  );
};

export default MembershipSetting;
