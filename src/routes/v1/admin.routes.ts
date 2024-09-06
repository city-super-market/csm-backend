import express from 'express';
import { registerAdmin } from '../../controllers/admin.controller';
const router = express.Router();
import { validateAdminRegistration } from '../../validators/admin.validator';

// route    :: POST /api/v1/admins/register
// access   :: Private::SuperAdmin
// desc     :: Admin Registration
router.post('/register', validateAdminRegistration, registerAdmin);

// TODO: Add Swagger Docs here

export default router;
