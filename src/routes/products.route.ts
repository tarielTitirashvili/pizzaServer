import { Router } from 'express';
import controllers from '../controllers/productControllers';
import checkRoleMiddleware from '../middleware/role.middleware';

const router = Router();
// api/product
router.get('/product', controllers.getAll);
router.post('/product', checkRoleMiddleware, controllers.create);
router.put('/product', checkRoleMiddleware, controllers.getAll);
router.delete('/product', checkRoleMiddleware, controllers.deleteCategory);

module.exports = router;
