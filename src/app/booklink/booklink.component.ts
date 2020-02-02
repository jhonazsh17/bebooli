import { Component, OnInit } from '@angular/core';

//para obtener un parametro desde la ruta
import { ActivatedRoute } from '@angular/router';

//database Firebase
import { AngularFireDatabase } from '@angular/fire/database';

import { Observable } from 'rxjs';

//----------- imports area ------------//

@Component({
  selector: 'app-booklink',
  templateUrl: './booklink.component.html',
  styleUrls: ['./booklink.component.css']
})
export class BooklinkComponent implements OnInit {
  id : any = "";
  links :  Observable<any[]>;
  linkEncontrado : any = {};
  linkE : any = {};
  
  
  constructor(private route: ActivatedRoute, public db: AngularFireDatabase) {
    let len: any = 0;
    this.links = db.list('book-links').valueChanges();
    
    //recorre el array observable y almacena el encontrado y lo envia a la funcion printlink()
    this.links.subscribe(result => { 
      len = result.length; 
      for (let index = 0; index < len; index++) {
        if(result[index]['id']==this.id){
          this.linkEncontrado = result[index];
          this.printLink(this.linkEncontrado);
        }
      }
    });
    
    
  }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
  }

  printLink(link:any){
    this.linkE = link;
  }

  

}
