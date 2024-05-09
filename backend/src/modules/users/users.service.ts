import { ConflictException, Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user-schema';
import { Model } from 'mongoose';
import { UserDto } from './dto/user-dto';


@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
  ){}


  async createUser(user){
    
    const newUser = await this.confirmUser(user.name, user.password, user.email);
    
    console.log(newUser);
    await newUser.save();

    return this.userModel.findOne({
      name: user.name
    })
  }

  async confirmUser(name:string, password:string, email:string){
    
    const userExistName = await this.userModel.findOne({
      name: name
    })

    if(userExistName){
      throw new ConflictException("Ya existe un usuario con este nombre")
    }

    const userExistMail = await this.userModel.findOne({
      email:email
    })

    if(userExistMail){
      throw new ConflictException("Ya existe un usuario con este Email")
    }


    return new this.userModel({
      name: name,
      password: password,
      email: email,
      online: false
    });
  }

  async getUsers(){
    const usersSeached = await this.userModel.find();
    return usersSeached;
  }

  async updateById(userId:object, data:{name:string, password:string, email:string, online:boolean}){

    const userExist = await this.userModel.findById(userId);
    console.log("usuario encontrado");
    console.log("El id es "+userId +" los datos son "+userId);
      
    if(data == undefined){
      throw new ConflictException("Los datos no estan definidos");
    }
    
    if(userExist){
      console.log("Definicion: "+userExist.name);

      const userExistName = await this.userModel.findOne({name: data.name});

      if(userExistName){
        if(userExist._id.toString() != userExistName._id.toString()){          
          throw new ConflictException("El nombre ya existe en otro usuario");
        }
      }

      const userExistMail = await this.userModel.findOne({email: data.email});
      if(userExistMail){
        console.log(userExistMail);
        
        if(userExist._id.toString() != userExistMail._id.toString()){
          console.log(userExist._id.toString() +" - " +userExistMail._id.toString());

          throw new ConflictException("El email ya existe en otro usuario");
        }
      }
      
      if(data.online != userExist.online){
        if(data.online){
          console.log("El usuario " +data.name +" se ha conectado");
        }else{
          console.log("El usuario " +data.name +" se ha desconectado");
        }
        
      }
      const userUpdated = await this.userModel.updateOne({name:userExist.name}, { name: data.name, password: data.password, email: data.email, online:data.online});      
      return userUpdated;
    }else{
      throw new ConflictException("El usuario no existe");
    }

  }



  async deleteUser(name: string){
    
    const userExist = await this.userModel.findOne({name});

    if(!userExist){
      throw new ConflictException("El usuario no existe")
    }else{
      return userExist.deleteOne();
    }
  }



  async setLoggin(name:string, password: string){
    const userSeached = await this.userModel.findOne({name,password});
    
    if (userSeached){
      return userSeached.toObject();
    }else{
      throw new ConflictException('No existe ese usuario con esa contraseña')
    }
  }
  
  async logIn_Out(userId){

    if(userId ==""){
      throw new ConflictException("Los datos no han sido enviados");
    }
    const userExist = await this.userModel.findById(userId);
    if(!userExist){
      throw new ConflictException("El usuario logueado no ha sido encontrado");
    }
    userExist.online = !userExist.online;
    if(userExist.online){
      console.log(`El usuario ${userExist.name} se ha conectado.`);
    }else{
      console.log(`El usuario ${userExist.name} se ha desconectado.`);
    }
    return this.userModel.findByIdAndUpdate(userId, userExist);
  }


  async getID(id:string){
    const userSeached = await this.userModel.findById(id);
    if(userSeached){
      return userSeached;
    }else{
      
    }
  }
  
}


