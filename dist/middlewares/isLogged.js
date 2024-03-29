"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLoggedIn = void 0;
const isLoggedIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // CODE ORIGINAL
    /* if (req.isAuthenticated()){
      // next();
      // console.log(req.isAuthenticated())
      
      return next()
    }else{
      res.status(401).json({
        msg: 'Not Logged In'
      });
    } */
    if (req.user) {
        next();
    }
    else {
        res.status(401).send('Not Logged In');
    }
});
exports.isLoggedIn = isLoggedIn;
