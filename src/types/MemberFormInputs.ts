import { MembershipPlanFormInputs } from './MembershipPlanFormInputs';

interface MembershipExtension {
  previousEndDate: Date;
  newEndDate: Date;
  extendedBy: string;
  duration: number;
  extendedAt: Date;
}

export interface Membership {
  _id: string;
  startDate: Date;
  endDate: Date;
  status: string;
  plan: MembershipPlanFormInputs; // Use your existing MembershipPlanFormInputs interface here
  extensions: MembershipExtension[]; // Include the extensions array in the Membership interface
}

export interface MemberFormInputs { 
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  gender: string;
  age: string;
  address: string;
  planId?: string // Passing planId for user registeration
  membership?: Membership; // Adding the membership field
}
