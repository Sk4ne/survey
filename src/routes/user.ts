import '../middlewares/authFacebook'
import '../middlewares/authGoogle'
import {parse, stringify, toJSON, fromJSON} from 'flatted';
import { Request,Response, Router } from 'express'
import { check } from 'express-validator'
import { validateFields } from '../middlewares/validateFields';
import { validateJwt } from '../middlewares/validateJwt';
import { login } from '../controllers/auth'
import {
    addUser,
    deleteAllUsers,
    deleteUser,
    getUser,
    getUsers,
    googleSucess,
    googleFailure,
    loginOk,
    noAuth,
    updateDoc,
    updateUser
} from '../controllers/userController';
import { existEmail } from '../helpers/existEmailUser';
import { validPass } from '../helpers/regexPass';
import { userAdmin } from '../middlewares/validateRoles';
import { storage } from '../middlewares/multerConfig';
import passport from 'passport';
import { generateJWT } from '../helpers/generateJwt';
// import { facebookLogin } from '../services/authProviders';


const router: Router = Router();

/** 
 * validateJwt - Verify that a token is included in the request.  
 * validateFields - validates errors generated by express-validator
*/
router.get('/users',validateJwt,userAdmin,getUsers)
router.get('/user/:id',/* validateJwt ,userAdmin,*/getUser)
router.post('/user',storage.single('img'),[
  check('email')
    .custom(existEmail),
  check('email','Email is not valid')
    .isEmail(),
  check('password')
    .custom(validPass)
    .isLength({ min: 5 })
    .withMessage('must be at least 5 chars long'),
  validateFields
],addUser)

/** ruta login */
router.post('/user/login',login)
router.put('/user/:id', storage.single('img'),updateUser)

router.delete('/user/:id',
  validateJwt,
  /* userAdmin, */
  validateFields,
  deleteUser)
router.delete('/all-users',/* validateJwt, validateFields, */deleteAllUsers)

/* Test queries findOne */
// router.get('/only-doc',validPass)
router.put('/update-doc',updateDoc)


/**
 * Facebook
 */
/** This is the path that calls the login */
router.get('/auth/facebook',passport.authenticate('sign-up-facebook',{scope:['email']}));
/** Esta funcion se dispara cuando el usuario inicia sesión con su cuenta */
router.get('/auth/facebook/login',
  passport.authenticate('sign-up-facebook', { failureRedirect: '/login' }),
  (req:Request, res:Response)=>{
    res.json({
      data: req.user 
    })
  });

router.get('/login',noAuth)
router.get('/login-ok',loginOk) 

/**
 * Google
 */
router.get('/auth/google',passport.authenticate('sign-up-google',{scope:['email','profile']}));
router.get('/auth/google/login',passport.authenticate('sign-up-google',{failureRedirect:'/auth/google/failure'}),
(req:Request,res:Response)=>{
  res.json({
    data: req.user 
  })
})
/* 
router.get( '/auth/google/login',
    passport.authenticate( 'sign-up-google', {
        successRedirect: '/auth/google/success',
        failureRedirect: '/auth/google/failure'
})); 
Router original
*/

router.get('/auth/google/success',googleSucess)
router.get('/auth/google/failure',googleFailure)
export default router;

