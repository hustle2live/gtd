import { ApiPATH } from '@/libs/constants/api-path';
import { Router } from 'express';

import userController from '@/controllers/user.controller';
import authController from '@/controllers/auth.controller';

import { TryCatchMiddleware } from '@/middleware/try-catch.middleware';
import { AuthMiddleware } from '@/middleware/auth.middleware';

const router: Router = Router();

// @route   POST api/user
// @desc    Register user given their email and password, returns the token upon successful registration
// @access  Public
router.get(
	ApiPATH.ALL,
	TryCatchMiddleware(userController.getAll.bind(userController)),
);
router.post(
	ApiPATH.REGISTER,
	TryCatchMiddleware(authController.register.bind(authController)),
);
router.post(
	ApiPATH.LOGIN,
	TryCatchMiddleware(authController.login.bind(authController)),
);
router.put(
	ApiPATH._ID,
	AuthMiddleware,
	TryCatchMiddleware(userController.update.bind(userController)),
);
router.get(
	ApiPATH.EMAIL_CONFIRMATION,
	TryCatchMiddleware(authController.verify.bind(authController)),
);
router.post(
	ApiPATH.PASSWORD_RESET_REQUEST,
	TryCatchMiddleware(
		authController.passwordResetRequest.bind(authController),
	),
);
router.get(
	ApiPATH.PASSWORD_RESET,
	TryCatchMiddleware(authController.passwordReset.bind(authController)),
);

export default router;
