import { Component, OnInit } from '@angular/core';
import { BookLinksService } from '../booklinks.service';
import { AngularFireDatabase } from '@angular/fire/database';

import { Observable } from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  links :  Observable<any[]>;
  links2 = [];
  linksEncontrados = [];
  stateSearch:boolean = true;
  wordSearch = "";
  cantidadLinks : any = 0; 

  constructor(public db: AngularFireDatabase){ 
    this.links = db.list('book-links').valueChanges();
    

    //cantidad de links
    this.links.subscribe(result => { 
      
      let i=0;
      for (let index = 0; index < result.length; index++) {
        if(result[index].estado==1){
          this.links2[i] = result[index];
          i=i+1;
          this.cantidadLinks = this.cantidadLinks + 1;
        }
      }
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
          
          
          let w = this.wordSearch.toUpperCase();

          for (let index = 0; index < result.length; index++) {
            let cadena = result[index]['titulo'].toUpperCase();
            if(cadena.includes(w)&&result[index].estado==1){
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

  pushViews(link:any){

    // $.getJSON('https://api.ipify.org?format=json', function(data){
    //   let views: Observable<any[]>;
    //   views = this.db.list('views-links').valueChanges();
    //   views.subscribe(result=>{
    //     if(result.length>0){
    //       for (let index = 0; index < result.length; index++) {
    //         if(result[index].ip==data.ip){
    //           //db.list('views-links').push({ip: data.ip, link_id: link.id});
    //           if(result[index].link_id==link.id){
    //             console.log('no se agrega');
    //           }else{
    //             //db.list('views-links').push({ip: data.ip, link_id: link.id});
    //             console.log('se agrega');
    //           }
    //         }else{
    //           if(result[index].link_id==link.id){
    //             console.log('no se agrega');
    //           }else{
    //             //db.list('views-links').push({ip: data.ip, link_id: link.id});
    //             console.log('se agrega');
    //           }
    //         }
            
    //       }
    //     }else{
    //       //inserta la primera vez :)
    //       this.db.list('views-links').push({ip: data.ip, link_id: link.id});
    //     }
        
        
    //   });
      
    // });
  }

   
}
