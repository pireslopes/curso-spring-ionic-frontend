import { Injectable } from "@angular/core";
import { LocalUser } from "../models/local_user";
import { STORAGE_KEYS } from "../config/storage_keys.config";
import { Cart } from "../models/cart";

@Injectable()
export class StorageService {
  
  getLocalUser(): LocalUser {    
    let usr = localStorage.getItem(STORAGE_KEYS.localUser);
    if(usr === null) {
      return null;
    }
    return JSON.parse(usr);
  }

  setLocalUser(obj: LocalUser) {
    if(null === obj) {
      localStorage.removeItem(STORAGE_KEYS.localUser);
    } else {
      localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
    }
  }

  getCart(): Cart {    
    let crt = localStorage.getItem(STORAGE_KEYS.cart);
    if(crt === null) {
      return null;
    }
    return JSON.parse(crt);
  }

  setCart(obj: Cart) {
    if(null === obj) {
      localStorage.removeItem(STORAGE_KEYS.cart);
    } else {
      localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(obj));
    }
  }


}