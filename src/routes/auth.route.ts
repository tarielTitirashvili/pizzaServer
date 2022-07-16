import { Router } from 'express';
import verifyToken from '../middleware/auth.token.middleware';
import controllers from '../controllers/userControllers';
import checkRoleMiddleware from '../middleware/role.middleware';

const router = Router();
// api/auth
router.get('/allUsers', checkRoleMiddleware, controllers.allUsers);
router.post('/', verifyToken, controllers.validateToken);
router.post('/register', controllers.registration);
router.post('/login', controllers.login);

module.exports = router;
