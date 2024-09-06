import ApiException from './ApiException';
import * as statusCodes from '../constants/statusCodes';

class ValidationException extends ApiException {
    constructor(public readonly errors: any = {}) {
        super(statusCodes.UNPROCESSABLE_ENITITY, 'Validation failed', errors);
    }
}

export default ValidationException;
