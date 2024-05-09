"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("./schemas/user-schema");
const mongoose_2 = require("mongoose");
let UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async createUser(user) {
        const newUser = await this.confirmUser(user.name, user.password, user.email);
        console.log(newUser);
        await newUser.save();
        return this.userModel.findOne({
            name: user.name
        });
    }
    async confirmUser(name, password, email) {
        const userExistName = await this.userModel.findOne({
            name: name
        });
        if (userExistName) {
            throw new common_1.ConflictException("Ya existe un usuario con este nombre");
        }
        const userExistMail = await this.userModel.findOne({
            email: email
        });
        if (userExistMail) {
            throw new common_1.ConflictException("Ya existe un usuario con este Email");
        }
        return new this.userModel({
            name: name,
            password: password,
            email: email,
            online: false
        });
    }
    async getUsers() {
        const usersSeached = await this.userModel.find();
        return usersSeached;
    }
    async updateById(userId, data) {
        const userExist = await this.userModel.findById(userId);
        console.log("usuario encontrado");
        console.log("El id es " + userId + " los datos son " + userId);
        if (data == undefined) {
            throw new common_1.ConflictException("Los datos no estan definidos");
        }
        if (userExist) {
            console.log("Definicion: " + userExist.name);
            const userExistName = await this.userModel.findOne({ name: data.name });
            if (userExistName) {
                if (userExist._id.toString() != userExistName._id.toString()) {
                    throw new common_1.ConflictException("El nombre ya existe en otro usuario");
                }
            }
            const userExistMail = await this.userModel.findOne({ email: data.email });
            if (userExistMail) {
                console.log(userExistMail);
                if (userExist._id.toString() != userExistMail._id.toString()) {
                    console.log(userExist._id.toString() + " - " + userExistMail._id.toString());
                    throw new common_1.ConflictException("El email ya existe en otro usuario");
                }
            }
            if (data.online != userExist.online) {
                if (data.online) {
                    console.log("El usuario " + data.name + " se ha conectado");
                }
                else {
                    console.log("El usuario " + data.name + " se ha desconectado");
                }
            }
            const userUpdated = await this.userModel.updateOne({ name: userExist.name }, { name: data.name, password: data.password, email: data.email, online: data.online });
            return userUpdated;
        }
        else {
            throw new common_1.ConflictException("El usuario no existe");
        }
    }
    async deleteUser(name) {
        const userExist = await this.userModel.findOne({ name });
        if (!userExist) {
            throw new common_1.ConflictException("El usuario no existe");
        }
        else {
            return userExist.deleteOne();
        }
    }
    async setLoggin(name, password) {
        const userSeached = await this.userModel.findOne({ name, password });
        if (userSeached) {
            return userSeached.toObject();
        }
        else {
            throw new common_1.ConflictException('No existe ese usuario con esa contraseña');
        }
    }
    async logIn_Out(userId) {
        if (userId == "") {
            throw new common_1.ConflictException("Los datos no han sido enviados");
        }
        const userExist = await this.userModel.findById(userId);
        if (!userExist) {
            throw new common_1.ConflictException("El usuario logueado no ha sido encontrado");
        }
        userExist.online = !userExist.online;
        if (userExist.online) {
            console.log(`El usuario ${userExist.name} se ha conectado.`);
        }
        else {
            console.log(`El usuario ${userExist.name} se ha desconectado.`);
        }
        return this.userModel.findByIdAndUpdate(userId, userExist);
    }
    async getID(id) {
        const userSeached = await this.userModel.findById(id);
        if (userSeached) {
            return userSeached;
        }
        else {
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
//# sourceMappingURL=users.service.js.map