import { Router } from 'express';
import verifyToken from '../middleware/auth.token.middleware';
import userControllers from '../controllers/userControllers';

console.log(userControllers.validateToken);
const router = Router();
// api/auth
router.post('/', verifyToken, userControllers.validateToken);
router.post('/register', userControllers.registration);
router.post('/login', userControllers.login);

module.exports = router;
