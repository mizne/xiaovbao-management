import { Injectable } from '@angular/core';

@Injectable()
export class UtilsService {

  constructor() { }

  objFrom(search) {
    if (!search) {
      return {}
    }
  
    const arr = search.slice(1).split('&')
    return arr.reduce((accu, curr) => {
      const [key, val] = curr.split('=')
      if (accu[key]) {
        accu[key] = [accu[key], val]
      } else {
        accu[key] = val
      }
  
      return accu
    }, {})
  }
}
