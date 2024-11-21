import { Router } from 'express';
import TransactionController from '../controller/Transaction';
import UserController from '../controller/User';
import UpiController from '../controller/upiController';
import AccountController from '../controller/accountController';
import PostController from '../controller/post';

const router = Router();

router.post('/create', TransactionController.create);
router.get('/read', TransactionController.read);
router.patch('/update/:id', TransactionController.update);
router.delete('/delete/:id', TransactionController.delete)
router.patch('/accept/:id', TransactionController.completed)
//create user
router.post('/create/user',UserController.create);
router.get('/get/data', UserController.getData);
router.get('/get/email', UserController.getEmail);
router.patch('/update/:id/password', UserController.updatePassword);

//create Upi
router.post('/create/upi',UpiController.create);
router.get('/payment/conditions',UpiController.paymentCondition)
router.get('/payment/status/check', UpiController.statusCheck)


//create account
router.post('/create/account',AccountController.create)
router.get('/get/sbi',AccountController.SBI)


//create post
router.post('/create/post',PostController.create)
//getPostwithUser
router.get('/get/post/user',PostController.getPostwithUser)
export default router;
