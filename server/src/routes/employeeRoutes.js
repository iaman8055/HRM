import express from 'express';
import authMiddleware from '../util/auth.js';
import getAllEmployees from '../controllers/employees/getEmployee/getAllEmployee.js';
import updateEmployee from '../controllers/employees/update/updateEmployee.js';
import deleteEmployee from '../controllers/employees/delete/deleteEmployee.js';
import getAllEmployeeByStatus from '../controllers/employees/getEmployee/getAllEmployeeByStatus.js';

const router=express.Router();

router.use(authMiddleware);
router.get("/", getAllEmployees);
router.put("/:id", updateEmployee);
router.delete("/:id",deleteEmployee);
router.get("/status",getAllEmployeeByStatus);
export default router
