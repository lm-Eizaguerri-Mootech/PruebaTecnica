import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

constructor() { }

  _id:object;
  index:number;
  name: string;
  password: string;
  email: string;

}
