import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from '../services/auth.service';

import { Observable } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-agregar',
  templateUrl: './app-agregar.component.html',
  styleUrls: ['./app-agregar.component.css']
})
export class AppAgregarComponent implements OnInit {
  links :  Observable<any[]>;
  
  titulo = '';
  link='';
  resumen = '';
  autor='';
  nombre='';
  email="";
  anio='';

  constructor(public db: AngularFireDatabase, public auth: AuthService){ 
    this.links = db.list('book-links').valueChanges();
  }

  ngOnInit() {
  }

  getIdAleatorio() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    let seg = String(today.getSeconds()).padStart(2, '0');
    let min = String(today.getMinutes()).padStart(2, '0');
    let hour = String(today.getHours()).padStart(2, '0');
    let r="";
    r = r+""+dd+""+mm+""+yyyy+""+hour+""+min+""+seg;

    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < charactersLength; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    r = r+result.substr(1,11);  
    return r;
}

  onSubmit(user:any){

    if(this.titulo!=""&&this.link!=""&&this.resumen!=""&&this.autor!=""&&this.anio!=""){
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, '0');
      let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      let yyyy = today.getFullYear();
      let seg = today.getSeconds();
      let min = today.getMinutes();
      let hour = today.getHours();
  
      let hoy = dd + '/' + mm + '/' + yyyy +" - "+String(hour).padStart(2, '0')+":"+String(min).padStart(2, '0')+":"+String(seg).padStart(2, '0');

      this.db.list('book-links').push({id: this.getIdAleatorio(), titulo: this.titulo, link: this.link, resumen: this.resumen, autor: this.autor, nombre: user.displayName , email: user.email, user_id: user.uid, fecha: hoy, estado:1, anio: this.anio });
      this.titulo = '';
      this.link = '';
      this.resumen = '';
      this.autor = '';
      this.nombre = '';
      this.email = '';
      this.anio = '';
      
      location.href = "/#/";
    }else{
      $('#modalValidation').modal('show');
    }
    
  }


}
