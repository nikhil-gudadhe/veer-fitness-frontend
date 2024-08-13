import { MembershipPlanFormInputs } from './MembershipPlanFormInputs';

export interface Membership {
  _id: string;
  startDate: Date;
  endDate: Date;
  status: string;
  plan: MembershipPlanFormInputs; // Use your existing MembershipPlanFormInputs interface here
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
  planId: string;
  membership?: Membership; // Adding the membership field
}