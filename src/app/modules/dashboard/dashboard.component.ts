import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../core/auth/auth.service";
import {Observable} from "rxjs";
import {User} from "../../shared/models/user";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: User | null = null;
  presence$!: Observable<any>;
  constructor(public auth: AuthService) {
    auth.user$?.subscribe((res) => {
      this.user = res;
      if(res){
        this.presence$ = auth.getPresence(res.uid)
      }
    })

  }

  ngOnInit(): void {
  }

  signOut(){
    this.auth.signOut()
  }

}
