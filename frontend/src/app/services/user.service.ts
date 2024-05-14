import { Online } from './../componentes/models/online';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../componentes/models/user';
import * as _ from 'lodash';
import * as CryptoJS from 'crypto-js';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  public key:string;
  public url:string;
  public listUsers: User[];
  public userLiked;
  public miMsg:string;

  constructor(private http: HttpClient) { 
    this.url="http://localhost:3085/api/v1/users";
    this.listUsers = [];
    this.key="miclavesecreta";
  }


  async confirmUser(online:Online){
    const finalUrl = this.url +"/loggin?name=" +online.name +"&password="+online.password;

    const user= await this.http.get(finalUrl);
    console.log(user);
    return user;
    
  }


  async getUsers(){
    this.listUsers =[];
    return   this.http.get(this.url);
  }
  
  async createUser(user: User){
    return this.http.post(this.url, user).subscribe();
  }

  async updateUser(user:{userId:object, userData:{name:string, password:string, email:string, online:boolean}}){
    console.log(JSON.stringify(user));
    return this.http.put(this.url+'/id',user).subscribe();
  }

  async delete(name:string){
   return this.http.delete(this.url+"/"+name).subscribe(); 
  }


  async logAux(user:{userId:object, userData:{name:string, password:string, email:string, online:boolean}}){
    
    user.userData.online = !user.userData.online;

    this.updateUser(user);

  }

  encoding(text:string):string{
    return CryptoJS.AES.encrypt(text, this.key).toString();
  }

  uncoding(code:string):any{
    return CryptoJS.AES.decrypt(code, this.key).toString(CryptoJS.enc.Utf8);
  }


  compare(){

    const msj = 1234+""
    const code1 = this.encoding(msj);
    const code2 = this.encoding(msj);
    console.log(code2);
    console.log(code1);
    const decodent1 = this.uncoding(code1);
    const decodent2 = this.uncoding(code2);
    console.log(decodent1);
    console.log(decodent2);
    console.log((decodent1 === decodent2));
  }

  tryDecode(example){
    const decoded = this.uncoding(example);
    console.log(example +"\n" +decoded +" = desencriptado");
  }
  

}
