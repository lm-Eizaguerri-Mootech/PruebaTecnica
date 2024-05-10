import { Online } from './../componentes/models/online';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../componentes/models/user';
import * as _ from 'lodash';




@Injectable({
  providedIn: 'root'
})
export class UserService {

 
  public url:string;
  public listUsers: User[];

  constructor(private http: HttpClient) { 
    this.url="http://localhost:3085/api/v1/users";
    this.listUsers = [];
   
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

 
  

}
