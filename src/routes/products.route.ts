import { Router } from 'express';
import controllers from '../controllers/userControllers';
import checkRoleMiddleware from '../middleware/role.middleware';

const router = Router();
// api/auth
router.get('/product', controllers.allUsers);
router.post('/product', checkRoleMiddleware, controllers.registration);
router.put('/product',checkRoleMiddleware, controllers.registration);
router.delete('/product', checkRoleMiddleware, controllers.login);

module.exports = router;
