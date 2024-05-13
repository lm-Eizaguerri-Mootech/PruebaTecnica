import { Online } from './../models/online';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { IUser } from '../interfaces/iuser';
import { User } from '../models/user';
import { isArray } from 'util';

@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.scss']
})
export class LoginComponent implements OnInit {

  public error:boolean;
  public name: string;
  public password: string;
  public exist: boolean;
  public online: Online;
  public log :boolean;
  public static user:User;

  constructor(private userService: UserService, private router: Router) { 
    this.name = null;
    this.password = null;
    this.exist = null;
    this.online = {
      name : '',
      password: ''
    };
    this.log = false;
    this.error= false;
  }

  ngOnInit() {    
    
  }


  async login(){

    this.exist= false;
    this.log = false;

    try {


      const user = await (await this.userService.confirmUser(this.online)).toPromise();
      LoginComponent.user =<User>user;
      console.log(user['_id']);
      console.log(LoginComponent.user);
      if(user){
        this.log = true;
        this.error = false;
        const miUser:{userId:object, userData:{name:string, password:string, email:string, online:boolean}}= {userId:user['_id'], userData:{name:user['name'], password:user['password'], email:user['email'], online:user['online']}};
        if(!miUser.userData.online){
          this.userService.logAux(miUser);
          this.router.navigate(['userList'],{queryParams:{miUser: JSON.stringify(miUser)}});
        }
        
      }
      return user;
    }catch (exception) {      
      this.error= true;
    }
  }
}
