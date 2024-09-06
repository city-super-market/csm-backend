import { IRegisterAdminReqBody } from '../interfaces/controllers/admin';

const createAdmin = async (data: IRegisterAdminReqBody): Promise<IRegisterAdminReqBody> => {
    // check if admin already exists
    // if not, create admin
    // if yes, throw error

    return await new Promise((resolve, reject) => {
        setTimeout(() => resolve(data), 1000);
    });
};

export { createAdmin };
