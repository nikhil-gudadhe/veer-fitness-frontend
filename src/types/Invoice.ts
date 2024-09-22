export interface Invoice {
    _id: string;
    invoiceId: string;
    memberId: string;
    memberName: string;
    planName: string;
    planDescription: string;
    planPrice: number;
    planDuration: number;
    startDate: string;
    endDate: string;
    previousEndDate: string;
    extensionDuration?: number;
    createdAt: string;
    updatedAt: string;
}