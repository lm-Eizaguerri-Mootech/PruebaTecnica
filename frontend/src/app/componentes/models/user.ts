import * as _ from 'lodash';

export class User {

  //

  constructor(data){
    _.set(this, 'data', data);
    _.defaults(data, {online: false, id:null})
    
  }

  /*
  get id():string{
    return _.get(this, 'data._id');
  }
  */
  get name(): string{
    return _.get(this, 'data.name')
  }
  
  get password(): string{
    return _.get(this, 'data,password')
  }
  get email(): string{
    return _.get(this, 'data.email')
  }
  get online(): boolean{
    return _.get(this, 'data.online')
  }


}
