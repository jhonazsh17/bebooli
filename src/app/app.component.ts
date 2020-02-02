import { Component } from '@angular/core';
import { BookLinksService } from './booklinks.service';
import { InicioComponent } from './inicio/inicio.component';
import { AuthService } from './services/auth.service';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-root',
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  word = "";
  libros: any = [];  

  constructor(public auth: AuthService, public dbs: AngularFireDatabase){
    
  }
  
  sendWordToSearch(){
    let inicio = new InicioComponent(this.dbs);
  }
}
