import React, { useEffect } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../store/store';
import { fetchMemberById, extendMembership } from '../../../store/Slices/memberSlice';
import { fetchMembershipPlans } from '../../../store/Slices/membershipPlanSlice';
import { fetchInvoiceByMemberId, createInvoice } from '../../../store/Slices/invoiceSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { Invoice } from '../../components';

interface MembershipSettingFormInputs {
  planId: string;
  duration: number;
}

const MembershipSetting: React.FC = () => {
  const { memberId } = useParams<{ memberId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { currentMember } = useSelector((state: RootState) => state.members);
  const { membershipPlans } = useSelector((state: RootState) => state.plans);
  const { invoices } = useSelector((state: RootState) => state.invoices);

  const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm<MembershipSettingFormInputs>({
    defaultValues: {
      planId: '',
      duration: 1,
    },
  });

  // Fetch member and invoices when memberId changes
  useEffect(() => {
    if (memberId) {
      dispatch(fetchInvoiceByMemberId(memberId));
      dispatch(fetchMemberById(memberId));
    }
    dispatch(fetchMembershipPlans());
  }, [dispatch, memberId]);

  // Reset form with the member's current plan and duration
  useEffect(() => {
    if (currentMember) {
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

  useEffect(() => {
    if (selectedPlanId && membershipPlans.length > 0) {
      const selectedPlan = membershipPlans.find(plan => plan._id === selectedPlanId);
      if (selectedPlan && selectedPlan.duration) {  
        setValue('duration', selectedPlan.duration); 
      }
    }
  }, [selectedPlanId, membershipPlans, setValue]);
  
  // Find the correct invoice for each extension
  const getInvoiceForExtension = (extensionId: string) => {
    return invoices.find((invoice) => invoice.extensionId === extensionId);
  };

  // Handle invoice data for the PDF rendering
  const getInvoiceData = (invoice: any) => {
    return invoice
      ? {
          billingTo: {
            name: `${currentMember?.firstName} ${currentMember?.lastName}`,
            email: currentMember?.email,
            mobile: currentMember?.mobile,
          },
          invoiceId: invoice.invoiceId || 'N/A',
          pastExpiryDate: invoice.previousEndDate ? new Date(invoice.previousEndDate).toLocaleDateString() : 'N/A',
          newExpiryDate: invoice.endDate ? new Date(invoice.endDate).toLocaleDateString() : 'N/A',
          extendedOn: invoice.createdAt ? new Date(invoice.createdAt).toLocaleDateString() : 'N/A',
          planName: invoice.planName,
          planDescription: invoice.planDescription,
          planDuration: `${invoice.planDuration} Month${invoice.planDuration > 1 ? 's' : ''}`,
          amount: invoice.planPrice,
          totalAmount: invoice.planPrice,
        }
      : null;
  };

  // Submit membership extension
  const onSubmit: SubmitHandler<MembershipSettingFormInputs> = (data) => {
    const requestData: any = {
      memberId: currentMember?._id,
      duration: Number(data.duration),
    };

    if (data.planId !== currentMember?.membership?.plan._id) {
      requestData.newPlanId = data.planId;
    }

    dispatch(extendMembership(requestData))
      .then(() => {
        toast.success('Membership extended successfully');
        if (memberId) {
          dispatch(fetchMemberById(memberId)); // Fetch updated member details with extensions
          dispatch(fetchInvoiceByMemberId(memberId)); // Fetch updated invoices
        }
        dispatch(createInvoice({ memberId: currentMember?._id }))
          .then(() => {
            //toast.success('Invoice generated successfully');
            dispatch(fetchInvoiceByMemberId(memberId!)); // Fetch the invoice again after creation
          })
          .catch((error) => {
            toast.error('Error generating invoice');
            console.error('Error generating invoice:', error);
          });
      })
      .catch((error) => {
        toast.error('Error extending membership');
        console.error('Error extending/updating membership:', error);
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
                  {/* Form Fields */}
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    {/* First Name */}
                    <div className="w-full sm:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">First Name</label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        value={currentMember?.firstName || ''}
                        disabled
                      />
                    </div>
                    {/* Last Name */}
                    <div className="w-full sm:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">Last Name</label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        value={currentMember?.lastName || ''}
                        disabled
                      />
                    </div>
                  </div>
                  {/* Plan Selection */}
                  <div className="mb-5.5">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">Select Plan</label>
                    <select
                      {...register('planId', { required: 'Plan selection is required' })}
                      value={selectedPlanId}
                      className="w-full rounded border border-stroke bg-gray px-5 py-3 outline-none focus:border-primary dark:border-strokedark dark:bg-form-input dark:text-white"
                    >
                      <option value="" disabled>Select a plan</option>
                      {membershipPlans.map((plan) => (
                        <option key={plan._id} value={plan._id}>{plan.name}</option>
                      ))}
                    </select>
                    {errors.planId && <span className="text-red-500">{errors.planId.message}</span>}
                  </div>
                  {/* Plan Duration */}
                  <div className="mb-5.5">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">Plan Duration (Months)</label>
                    <select
                      {...register('duration', { required: 'Duration is required' })}
                      value={selectedDuration}
                      className="w-full rounded border border-stroke bg-gray px-5 py-3 outline-none focus:border-primary dark:border-strokedark dark:bg-form-input dark:text-white"
                    >
                      {[...Array(12).keys()].map((i) => (
                        <option key={i + 1} value={i + 1}>{i + 1} Month{i + 1 > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                    {errors.duration && <span className="text-red-500">{errors.duration.message}</span>}
                  </div>
                  {/* Submit Button */}
                  <div className="flex justify-end gap-4.5">
                    <button
                      className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black dark:border-strokedark dark:text-white"
                      type="button"
                      onClick={() => navigate('/members')}
                    >
                      Cancel
                    </button>
                    <button
                      className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray dark:hover:bg-opacity-90"
                      type="submit"
                    >
                      Renew Membership
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Current Plan Section */}
          <div className="col-span-5 xl:col-span-2">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">Current Plan</h3>
              </div>
              <div className="p-7">
                {currentMember?.membership?.plan ? (
                  <>
                    <h4 className="mb-3 text-xl font-semibold text-black dark:text-white">
                      {currentMember.membership.plan.name}
                    </h4>
                    <p>{currentMember.membership.plan.description}</p>
                    <ol className="flex flex-wrap items-center gap-3 pt-5">
                      <li className="flex items-center gap-3.5 font-medium text-black dark:text-white">
                        Plan Duration:
                      </li>
                      <li>
                        <span>{currentMember.membership.plan.duration} Months</span>
                      </li>
                    </ol>
                    <ol className="flex flex-wrap items-center gap-3 pt-2">
                      <li className="flex items-center gap-3.5 font-medium text-black dark:text-white">
                        Started On:
                      </li>
                      <li>
                        <span>
                          {currentMember.membership.startDate
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
                          {currentMember.membership.endDate
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
                        <span>
                          {currentMember.membership.endDate
                            ? `${Math.ceil(
                                (new Date(currentMember.membership.endDate).getTime() - new Date().getTime()) /
                                  (1000 * 60 * 60 * 24)
                              )} Days`
                            : 'End date not available'}
                        </span>
                      </li>
                    </ol>
                  </>
                ) : (
                  <p>No plan details available.</p>
                )}
              </div>
            </div>
          </div>

          {/* Membership History */}
          <div className="col-span-5 xl:col-span-5">
          <div className="rounded-sm border border-stroke bg-white py-3 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">Membership History</h3>
            </div>
            <div>
              {currentMember?.membership?.extensions && currentMember?.membership?.extensions.length > 0 ? (
                currentMember.membership.extensions.map((extension, index) => {
                  const linkedInvoice = getInvoiceForExtension(extension._id);
                  const invoiceData = getInvoiceData(linkedInvoice);

                  return (
                    <div
                      key={index}
                      className="flex justify-between gap-2.5 py-3 px-6 hover:bg-gray-2 dark:hover:bg-meta-4 sm:items-center sm:justify-start"
                    >
                      <div className="flex items-center gap-5.5 sm:w-5/12 xl:w-5/12">
                        <div className="hidden h-14 w-full max-w-14 items-center justify-center rounded-full border border-stroke bg-gray text-black-2 dark:border-strokedark dark:bg-graydark dark:text-white sm:flex">
                          <svg
                            className="fill-current"
                            width="28"
                            height="29"
                            viewBox="0 0 28 29"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M4.72659 3.36759C5.32314 2.77105 6.13222 2.43591 6.97585 2.43591H16.2295L16.2299 2.43591L16.2303 2.43591C16.4817 2.43591 16.7081 2.54281 16.8665 2.71363L23.7604 9.6075C23.9312 9.76594 24.0381 9.99231 24.0381 10.2437C24.0381 10.2568 24.0378 10.2699 24.0372 10.2828V24.1241C24.0372 24.9677 23.7021 25.7768 23.1055 26.3733C22.509 26.9699 21.6999 27.305 20.8563 27.305H6.97585C6.13222 27.305 5.32313 26.9699 4.72659 26.3733C4.13005 25.7768 3.79492 24.9677 3.79492 24.1241V5.61684C3.79492 4.77321 4.13005 3.96413 4.72659 3.36759ZM6.97585 4.17097H15.3628V10.2437C15.3628 10.7228 15.7512 11.1112 16.2303 11.1112H22.3022V24.1241C22.3022 24.5075 22.1498 24.8753 21.8787 25.1465C21.6075 25.4176 21.2397 25.57 20.8563 25.57H6.97585C6.59238 25.57 6.22462 25.4176 5.95346 25.1465C5.68231 24.8753 5.52997 24.5075 5.52997 24.1241V5.61684C5.52997 5.23337 5.68231 4.86561 5.95346 4.59445C6.22462 4.3233 6.59238 4.17097 6.97585 4.17097ZM17.0979 5.3987L21.0753 9.37613H17.0979V5.3987ZM9.2896 15.1596C8.81048 15.1596 8.42208 15.548 8.42208 16.0271C8.42208 16.5062 8.81048 16.8946 9.2896 16.8946H18.5432C19.0223 16.8946 19.4107 16.5062 19.4107 16.0271C19.4107 15.548 19.0223 15.1596 18.5432 15.1596H9.2896ZM8.42208 20.654C8.42208 20.1749 8.81048 19.7865 9.2896 19.7865H18.5432C19.0223 19.7865 19.4107 20.1749 19.4107 20.654C19.4107 21.1332 19.0223 21.5216 18.5432 21.5216H9.2896C8.81048 21.5216 8.42208 21.1332 8.42208 20.654ZM9.2896 10.5328C8.81048 10.5328 8.42208 10.9212 8.42208 11.4003C8.42208 11.8795 8.81048 12.2679 9.2896 12.2679H11.603C12.0821 12.2679 12.4705 11.8795 12.4705 11.4003C12.4705 10.9212 12.0821 10.5328 11.603 10.5328H9.2896Z"
                              fill=""
                            ></path>
                          </svg>
                        </div>
                        <p className="font-medium text-black dark:text-white">Invoice</p>
                      </div>
                      <div className="hidden w-5/12 xl:block">
                        <p className="font-medium text-black dark:text-white">
                          Previous Expiry Date {new Date(extension.previousEndDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="hidden w-5/12 xl:block">
                        <p className="font-medium text-black dark:text-white">
                          New Expiry Date {new Date(extension.newEndDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="hidden w-5/12 xl:block">
                        <p className="font-medium text-black dark:text-white">
                          Plan Duration {extension.duration === 1 ? `${extension.duration} Month` : `${extension.duration} Months`}
                        </p>
                      </div>
                      <div className="hidden w-5/12 xl:block">
                        <p className="font-medium text-black dark:text-white">
                          Extended On {new Date(extension.extendedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right sm:w-3/12 xl:w-2/12">
                        {linkedInvoice && invoiceData ? (
                          <PDFDownloadLink
                            className="inline-flex rounded bg-primary py-1 px-3 font-medium text-white hover:bg-opacity-90 sm:py-2.5 sm:px-6"
                            document={<Invoice invoiceData={invoiceData} />}
                            fileName={`invoice_${linkedInvoice.invoiceId || 'invoice'}.pdf`}
                          >
                            {({ loading }) => (loading ? 'Generating...' : 'Download')}
                          </PDFDownloadLink>
                        ) : (
                          <p>Invoice not available yet</p>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="flex justify-between gap-2.5 py-3 px-6 hover:bg-gray-2 dark:hover:bg-meta-4 sm:items-center sm:justify-start">
                  <div className="hidden sm:block sm:w-4/12 xl:w-2/12">
                    <p className="font-medium text-black dark:text-white">No extensions found.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        </div>
      </div>
    </>
  );
};

export default MembershipSetting;