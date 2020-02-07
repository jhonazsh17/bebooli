import { Component, OnInit } from '@angular/core';
import { BookLinksService } from '../booklinks.service';
import { AngularFireDatabase } from '@angular/fire/database';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  links :  Observable<any[]>;
  linksEncontrados = [];
  stateSearch:boolean = true;
  wordSearch = "";
  cantidadLinks : any = 0; 

  constructor(public db: AngularFireDatabase){ 
    this.links = db.list('book-links').valueChanges();

    //cantidad de links
    this.links.subscribe(result => { 
      this.cantidadLinks = result.length;
    });   
  }

  ngOnInit() {
  }

  
  sendWordToSearch() {
    if(this.wordSearch!=''){
      this.stateSearch = false;
        let i = 0;  
        //recorre el array observable y almacena el encontrado y lo envia a la funcion printlink()
        this.links.subscribe(result => { 
          let len : any = result.length; 

          this.cantidadLinks = len;
          let w = this.wordSearch.toUpperCase();

          for (let index = 0; index < len; index++) {
            let cadena = result[index]['titulo'].toUpperCase();
            if(cadena.includes(w)){
              this.linksEncontrados[i] = result[index];          
              i=i+1;
            }
          }
        });
        this.linksEncontrados = [];
    }else {
      this.stateSearch = true;
    }
    
    
  } 

   
}
