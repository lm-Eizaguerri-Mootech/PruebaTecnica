import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InfoService } from 'src/app/services/info.service';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  public modalSwitch: boolean;
  public info:InfoService;
  constructor(private router: Router,private route:ActivatedRoute) {  }

  ngOnInit(): void {
  }


  @HostListener('window:beforeunload', ['$event'])
  onBeforeUnload(evnt:Event){
    this.route.params.subscribe(params =>{
      this.info = params['info'];
    })  
    console.log(this.info);
    
  }

  closeModal(){
    this.router.navigate(['userList']);
  }

}
