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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validPass = void 0;
const user_1 = __importDefault(require("../models/user"));
const validPass = (password = '') => __awaiter(void 0, void 0, void 0, function* () {
    yield user_1.default.findOne({ password });
    let mayus = /[A-Z]+/;
    let minus = /[a-z]+/;
    let digito = /[0-9]+/;
    let character = /[!"#$%&'()*+,\-./:;<=>?@^_`{|}]+/;
    if ((mayus.test(password) && minus.test(password) && digito.test(password) && character.test(password)) != true) {
        // throw new Error(`Password must be contain one uppercase and lowercase letter one digito and one special character`);
        throw new Error(`La contrasena debe contener al menos una letra minuscula, una mayuscula un digito y un caracter especial`);
    }
});
exports.validPass = validPass;
