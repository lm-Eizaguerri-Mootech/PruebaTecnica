import { UserService } from './../../../../services/user.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/componentes/models/user';

@Component({
  selector: 'app-FormUser',
  templateUrl: './FormUser.component.html',
  styleUrls: ['./FormUser.component.scss']
})
export class FormUserComponent implements OnInit {

  public userSelected;

  constructor(private router:Router, private userService:UserService) {

    if(userService.userLiked != null){
      this.userSelected= userService.userLiked;
    }else{
      this.userSelected = null
    }

   }
  
  ngOnInit() {
    console.log("Hola mundo");
    console.log(this.userService.miMsg)
  }

  async createUser(name:string, email:string, password:string,newConfirmPassword:string){
    if(newConfirmPassword != password){
      return null;
    }
    if(name && email && password){
      console.log(password);   
      const pass = password+"";
      const encodedPass = this.userService.encoding(pass);
      console.log(encodedPass);
      const us:User= { name:name, password: encodedPass, email: email, online:false};
      return this.userService.createUser(us);
    }else{
      console.log("no ha entrado");
    }
  }

  returnList(){
    this.router.navigate(['userList']);
  }

  

}
