import { NextFunction } from 'express';
import { IRequest, IResponse } from '../interfaces/vendor';
import { validator } from '../utils';
import * as regexes from '../utils/constants/regexes';
import { ValidationException } from '../utils/exceptions';

const validateAdminRegistration = (req: IRequest, res: IResponse, next: NextFunction) => {
    let errors = {};

    // Trim the inputs
    req.body = validator.trimReqBody(req.body);

    // name validation
    if (validator.isEmpty(req.body.name)) {
        errors = { ...errors, name: 'Name is required' };
    } else if (!regexes.NAME_REGEX.test(req.body.name)) {
        errors = { ...errors, name: 'Name is invalid' };
    } else if (req.body.name.length < 3 || req.body.name.length > 255) {
        errors = { ...errors, name: 'Name must be between 3 and 255 characters' };
    }

    // email validation
    if (validator.isEmpty(req.body.email)) {
        errors = { ...errors, email: 'Email is required' };
    } else if (!regexes.EMAIL_REGEX.test(req.body.email)) {
        errors = { ...errors, email: 'Email is invalid' };
    }

    // TODO: do better validation
    // password validation
    if (!validator.isEmpty(req.body.password) && (req.body.password.length < 8 || req.body.password.length > 255)) {
        errors = { ...errors, password: 'Password must be between 8 and 255 characters' };
    }

    // allow_password_change validation
    if (req.body.allow_password_change && typeof req.body.allow_password_change !== 'boolean') {
        errors = { ...errors, allow_password_change: 'Please provide valid data' };
    }

    // check if there are any errors
    if (!validator.isEmpty(errors)) {
        throw new ValidationException(errors);
    }

    next();
};

export { validateAdminRegistration };
