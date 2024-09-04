interface IRegisterAdminReqBody {
    name: string;
    email: string;
    password?: string;
    allow_password_change?: boolean;
}

export { IRegisterAdminReqBody };
