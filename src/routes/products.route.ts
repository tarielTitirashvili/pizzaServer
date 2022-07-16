import { Router } from 'express';
import verifyToken from '../middleware/auth.token.middleware';
import controllers from '../controllers/userControllers';

const router = Router();
// api/auth
router.get('/product', controllers.allUsers);
router.post('/product', controllers.registration);
router.put('/product', controllers.registration);
router.delete('/product', controllers.login);

module.exports = router;
