import { Injectable } from '@angular/core';
import {first, firstValueFrom, Observable, pluck} from "rxjs";
import { Router } from "@angular/router";
import { User } from "../../shared/models/user";

import { Auth, GoogleAuthProvider, signInWithPopup, signOut, authState } from '@angular/fire/auth'
import { Database, set, ref, serverTimestamp, object, update } from "@angular/fire/database";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$!: Observable<User | null> | null;
  constructor(private auth: Auth, private router: Router, private realtimeDB: Database) {
      this.user$ = authState(auth);
  }

  signInWithGoogle(){
    signInWithPopup(this.auth, new GoogleAuthProvider())
      .then(() => {
        this.router.navigate(["/dashboard"])
      })
      .catch(() => console.log("login failed"));
  }

  signOut(){
    signOut(this.auth)
      .then(() => {
        this.router.navigate(["/landing"])
      })
      .catch((err) => console.log("signout failed " + err))
  }

  getPresence(uid: string) {
    return object(ref(this.realtimeDB, `status/${uid}`))
  }

  getUser() {
    return firstValueFrom(authState(this.auth));
  }

  async setPresence(status: string) {
    const user: User | null = await this.getUser();
    if(user){
      return update(ref(this.realtimeDB, `status/${user.uid}`), {
        status, timestamp: serverTimestamp()
      })
    }else {
      return null;
    }
  }

  updateOnUser(){

  }



}
