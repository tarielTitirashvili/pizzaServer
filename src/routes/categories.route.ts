import { Router } from 'express';
import controllers from '../controllers/categoryControllers';
import checkRoleMiddleware from '../middleware/role.middleware';

const router = Router();
// api/category
router.get('/', controllers.getAll);
router.post('/:category', checkRoleMiddleware, controllers.create);
router.delete('/:category', checkRoleMiddleware, controllers.deleteCategory);
router.put('/:category/:id', checkRoleMiddleware, controllers.addProduct);

module.exports = router;
