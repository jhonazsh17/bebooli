import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

//para obtener un parametro desde la ruta
import { ActivatedRoute } from '@angular/router';

//database Firebase
import { AngularFireDatabase } from '@angular/fire/database';

import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';

//----------- imports area ------------//

declare var $: any;

@Component({
  selector: 'app-booklink',
  templateUrl: './booklink.component.html',
  styleUrls: ['./booklink.component.css']
})
export class BooklinkComponent implements OnInit {
  id : any = "";
  links :  Observable<any[]>;
  linksd :  Observable<any[]>;
  linkEncontrado : any = {};
  linkE : any = {};
  linkDownE : any = {};
  thePrevIp : any = "";
  theIp : any = "";

  //variables de estado en template
  editar = false;
  darDeBaja = false;
  firstTemplate = true;

  //----
  messageBaja="";
  messageValidationBaja="";
  
  
  constructor(public auth: AuthService, private route: ActivatedRoute, public db: AngularFireDatabase) {
    let len: any = 0;
    this.links = db.list('book-links').valueChanges();
    this.linksd = db.list('links-down').valueChanges();
    
    //recorre el array observable y almacena el encontrado y lo envia a la funcion printlink()
    this.links.subscribe(result => { 
      len = result.length; 
      for (let index = 0; index < len; index++) {
        if(result[index]['id']==this.id){
          this.linkEncontrado = result[index];
          this.db.list('book-links').snapshotChanges().subscribe(c => {
            this.linkEncontrado.key = c[index].key
          });
          this.printLink(this.linkEncontrado, db);
        }
      }
    });
    
    this.linksd.subscribe(result => { 
      for (let index = 0; index < result.length; index++) {
        if(result[index]['link_id']==this.linkE.id){
          this.linkDownE = result[index];
        }
      }
    });

  }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
  }

  printLink(link:any, db:AngularFireDatabase){
    this.linkE = link;
    this.pushViews(this.linkE, db);
  }

  pushViews(link:any, db:AngularFireDatabase){
    // $.getJSON('https://api.ipify.org?format=json', function(data){
    //   let views: Observable<any[]>;
    //   views = db.list('views-links').valueChanges();
    //   let band=0;
    //   views.subscribe(result=>{
        
    //     if(result.length>0&&band==0){
    //       console.log('es mayor');
    //       console.log(result);
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
    //       db.list('views-links').push({ip: data.ip, link_id: link.id});
    //       band=1;
    //     }
        
        
    //   });
      
    // });
  }


  //acción de editar booklink
  onClickEditar(){
    this.editar = true;
    this.firstTemplate = false;
    this.darDeBaja = false;
  }

  //acción de guardar cambios
  onSubmitUpdate(key:string){

    if(this.linkE.autor!=""&&this.linkE.link!=""&&this.linkE.resumen!=""&&this.linkE.titulo!=""&&this.linkE.anio!=""){
      // console.log(this.db.list('book-links').update(key, {titulo:this.linkE.titulo}));
      this.db.list('book-links').set(key, {
        autor: this.linkE.autor,
        email: this.linkE.email,
        fecha: this.linkE.fecha,
        id: this.linkE.id,
        link: this.linkE.link,
        nombre: this.linkE.nombre,
        resumen: this.linkE.resumen,
        titulo: this.linkE.titulo,
        user_id: this.linkE.user_id,
        estado: 1,
        anio: this.linkE.anio
      });

      location.href = "/booklink/"+this.linkE.id;
    }else{
      $('#modalValidationEdit').modal('show');
    }
    
  }

  onClickDarDeBaja(link:any, band:any){
    if(band==1){
      if(this.messageBaja==""){
        this.messageValidationBaja = "Debes colocar alguna razón.";
      }else{
        $('#exampleModal').modal('hide');
        $('#exampleModal2').modal('show');
        this.db.list('links-down').push({link_id: link.id, reason: this.messageBaja});
  
        this.db.list('book-links').set(link.key, {
          autor: this.linkE.autor,
          email: this.linkE.email,
          fecha: this.linkE.fecha,
          id: this.linkE.id,
          link: this.linkE.link,
          nombre: this.linkE.nombre,
          resumen: this.linkE.resumen,
          titulo: this.linkE.titulo,
          user_id: this.linkE.user_id,
          estado: 0,
          anio:this.linkE.anio
        });
  
        
      }
    }else{
      // nada
    }
    
  }

  eliminarLink(band:any){
    if(band==1){
      const itemLinkDel = this.db.list('book-links');
      itemLinkDel.remove(this.linkE['key']);

      this.db.list('links-down').valueChanges().subscribe(c => {
        for (let index = 0; index < c.length; index++) {
          if(c[index]['link_id']==this.linkE.id){
            this.db.list('links-down').snapshotChanges().subscribe(r => {
              const itemLinkDelDef = this.db.list('links-down');
              itemLinkDelDef.remove(r[index].key);
            });
          }
        }
      });

      $('#exampleModalEliminar').modal('hide');
      $('#messageEliminarConfirmar').modal('show');
    }else{
      location.href = '/';
    }
    
  }

  onClickVolver(){
    this.editar = false;
    this.firstTemplate = true;
    this.darDeBaja = false;
  }
  

}
