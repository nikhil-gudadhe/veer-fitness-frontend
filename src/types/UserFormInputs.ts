export interface UserFormInputs {
    username: string;
    email: string;
    firstName?: string;
    lastName?: string;
    avatar?: string;
    password: string;
    role: "admin" | "trainer";
    refreshToken?: string;
    createdAt?: Date;
    updatedAt?: Date;
}