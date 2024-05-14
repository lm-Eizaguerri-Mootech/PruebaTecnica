import { User } from './../../models/user';
import { Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren, HostListener} from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UserModel } from '../../models/userModel';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-UserList',
  templateUrl: './UserList.component.html',
  styleUrls: ['./UserList.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  @ViewChildren('userIdLablel') userIdLables: QueryList<ElementRef>

  public userList: User[];
  public logedUser:any;
  public modalSwitch: boolean;
  public newUser: UserModel;
  public userEditable: {idAux:object, nameAux:string, passwordAux: string, emailAux:string, index:number}
  
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
  ) { 
    this.getUsers();
    this.newUser = {name:"", email:"", password:""}
    this.logedUser = null;
    this.userEditable= {idAux:undefined,nameAux:"", passwordAux:"", emailAux:"", index :0}
    
  }
  
  ngOnInit() {
    this.route.queryParams.subscribe(params =>{
      if(params && params.miUser){
        this.logedUser = JSON.parse(params.miUser);
      }
    })
   
  }

  ngOnDestroy(){
    this.userService.logAux(this.logedUser);
  }

  @HostListener('window:beforeunload', ['$event'])
  onBeforeUnload(evnt:Event){
    this.userService.logAux(this.logedUser);
  }

  async refres(){
    location.reload();
  }

  

  async getUsers(){
    this.userList =[];
    const data = await (await this.userService.getUsers()).toPromise();
    this.userList = <User[]>data;

    console.log(this.userList);  
  }

  async createUser(name:string, email:string, password:string,newConfirmPassword:string){
    if(newConfirmPassword != password){
      return null;
    }
    if(name && email && password){
      console.log(password);   
      const pass = password+"";
      const encodedPass = this.encoding(pass);
      console.log(encodedPass);
      const us:User= { name:name, password: encodedPass, email: email, online:false};
      this.newUser=null;
      return this.userService.createUser(us);
    }else{
      console.log("no ha entrado");
    }
  }
  
  async updateUser(idAux:object, nameAux:string, passwordAux: string, emailAux:string, confirmPassword:string){
    if(confirmPassword != passwordAux){
      return null;
    }
    
    console.log(nameAux + " - " +passwordAux + " - " + emailAux);
    const userAux= {userId:idAux,userData:{ name:nameAux, password:this.encoding(passwordAux), email:emailAux, online:false}};
    console.log(userAux);
    
    this.userEditable ={idAux: undefined,nameAux:"", passwordAux:"", emailAux:"", index:0};
    return this.userService.updateUser(userAux);
  }

  async delete(name:string){
    this.userService.delete(name);
    this.refres();
  }

  loadEdition(id:object, name:string, email:string,password:string, index:number){
    console.log(password);
    const auxPass = this.uncoding(password);
    console.log(auxPass);
    
    
    this.userEditable ={idAux:id, nameAux:name, passwordAux:auxPass, emailAux:email, index:index}
    console.log(this.userEditable);
    
    this.router.navigate(['form'], {queryParams: {miUser:JSON.stringify(this.userEditable)}});

  }

  showCreate(){

    this.userService.userLiked= null;
    this.router.navigate(['form']);
    
  }


  encoding(text:string):string{
    return this.userService.encoding(text);
  }

  uncoding(code:string):string{
    return this.userService.uncoding(code);

  }

  compare(){
    this.userService.compare();
  }

  tryDecode(example){
    this.userService.tryDecode(example);
  }

}
