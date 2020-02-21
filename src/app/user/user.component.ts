import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AngularFireDatabase } from '@angular/fire/database';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  links :  Observable<any[]>;
  users :  Observable<any[]>;
  linksUsers: any = [];

  constructor(public auth: AuthService, public db: AngularFireDatabase) {
    this.users = this.auth.user$;
    this.links = db.list('book-links').valueChanges();

    this.users.subscribe(u =>{
      this.links.subscribe(result => { 
        let i = 0;
        for (let index = 0; index < result.length; index++) {
          if(result[index].user_id==u['uid']){
            this.linksUsers[i] = result[index];
            i=i+1; 
          }
          
        }
      });

      
    });

    

  }

  ngOnInit() {
  }

}
