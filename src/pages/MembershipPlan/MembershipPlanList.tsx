import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getExcerpt } from '../../../helpers/utilityInstance'
import { fetchMembershipPlans } from '../../../store/Slices/membershipPlanSlice';
import { MembershipPlanFormInputs } from '../../types/MembershipPlanFormInputs';
import { RootState, AppDispatch } from '../../../store/store';
import Spinner from '../../components/Spinner';

interface MembershipPlanListProps {
    onEdit: (membershipPlan: MembershipPlanFormInputs) => void;
}

const MembershipPlanList: React.FC<MembershipPlanListProps> = ({ onEdit }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { membershipPlans, loading } = useSelector((state: RootState) => state.plans);

    useEffect(() => {
        dispatch(fetchMembershipPlans());
    }, [dispatch]);
    
    if (loading) {
        return <Spinner />;
    }

    return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Name
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Descrption
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Duration
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Price
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {membershipPlans.map((plan) => (
              <tr key={plan._id}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {plan.name}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {getExcerpt(plan.description, 50)}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium`}>
                    {plan.duration}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium`}>
                  ₹{plan.price}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button onClick={() => onEdit(plan)}
                    className="hover:text-primary">
                      <svg 
                         className="fill-current" 
                         width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_62_9787)">
                            <path d="M15.55 2.97499C15.55 2.77499 15.475 2.57499 15.325 2.42499C15.025 2.12499 14.725 1.82499 14.45 1.52499C14.175 1.24999 13.925 0.974987 13.65 0.724987C13.525 0.574987 13.375 0.474986 13.175 0.449986C12.95 0.424986 12.75 0.474986 12.575 0.624987L10.875 2.32499H2.02495C1.17495 2.32499 0.449951 3.02499 0.449951 3.89999V14C0.449951 14.85 1.14995 15.575 2.02495 15.575H12.15C13 15.575 13.725 14.875 13.725 14V5.12499L15.35 3.49999C15.475 3.34999 15.55 3.17499 15.55 2.97499ZM8.19995 8.99999C8.17495 9.02499 8.17495 9.02499 8.14995 9.02499L6.34995 9.62499L6.94995 7.82499C6.94995 7.79999 6.97495 7.79999 6.97495 7.77499L11.475 3.27499L12.725 4.49999L8.19995 8.99999ZM12.575 14C12.575 14.25 12.375 14.45 12.125 14.45H2.02495C1.77495 14.45 1.57495 14.25 1.57495 14V3.87499C1.57495 3.62499 1.77495 3.42499 2.02495 3.42499H9.72495L6.17495 6.99999C6.04995 7.12499 5.92495 7.29999 5.87495 7.49999L4.94995 10.3C4.87495 10.5 4.92495 10.675 5.02495 10.85C5.09995 10.95 5.24995 11.1 5.52495 11.1H5.62495L8.49995 10.15C8.67495 10.1 8.84995 9.97499 8.97495 9.84999L12.575 6.24999V14ZM13.5 3.72499L12.25 2.49999L13.025 1.72499C13.225 1.92499 14.05 2.74999 14.25 2.97499L13.5 3.72499Z" fill=""></path>
                        </g>
                        <defs>
                            <clipPath id="clip0_62_9787">
                                <rect width="16" height="16" fill="white"></rect>
                            </clipPath>
                        </defs>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    );
    
}

export default MembershipPlanList;