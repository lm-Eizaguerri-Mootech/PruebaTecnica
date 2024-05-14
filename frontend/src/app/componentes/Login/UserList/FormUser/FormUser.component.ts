import { UserService } from './../../../../services/user.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/componentes/models/user';

@Component({
  selector: 'app-FormUser',
  templateUrl: './FormUser.component.html',
  styleUrls: ['./FormUser.component.scss']
})
export class FormUserComponent implements OnInit {

  public userSelected : {idAux:object, nameAux:string, passwordAux:string, emailAux:string, index:number}| null;
  public edit: boolean= false;

  constructor(private router:Router, private userService:UserService, private route: ActivatedRoute) {
    this.userSelected = null;
    
   }
  
  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      const user = params['miUser']
      if(user){
        
        const useraux= JSON.parse(user);
        this.userSelected = {idAux:useraux['idAux'], nameAux:useraux['nameAux'], passwordAux:useraux['passwordAux'], emailAux:useraux['emailAux'], index:useraux['index']};        
      }else{
        this.userSelected = null;
       
      }
    })
    if(this.userSelected != null){
      this.edit= true;
    }else{
      this.edit= false;
    }
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
      this.returnList()
      return this.userService.createUser(us);
    }else{
      console.log("no ha entrado");
    }
  }

  returnList(){
    this.router.navigate(['userList']);
  }

  async updateUser(idAux:object, nameAux:string, passwordAux: string, emailAux:string, confirmPassword:string){
    if(confirmPassword != passwordAux){
      return null;
    }
    
    console.log(nameAux + " - " +passwordAux + " - " + emailAux);
    const userAux= {userId:idAux,userData:{ name:nameAux, password:this.userService.encoding(passwordAux), email:emailAux, online:false}};
    console.log(userAux);
    
    this.userSelected ={idAux: undefined,nameAux:"", passwordAux:"", emailAux:"", index:0};
    this.returnList()
    return this.userService.updateUser(userAux);
  }
  async delete(name:string){
    this.userService.delete(name);
    this.returnList();
  }

}
