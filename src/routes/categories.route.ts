import { Router } from 'express';
import controllers from '../controllers/categoryControllers';
import checkRoleMiddleware from '../middleware/role.middleware';

const router = Router();
// api/auth
router.get('/', controllers.getAll);
router.post('/:category/create', checkRoleMiddleware, controllers.create);
router.delete('/:category/delete', checkRoleMiddleware, controllers.deleteCategory);

module.exports = router;
