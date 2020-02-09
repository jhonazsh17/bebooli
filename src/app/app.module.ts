import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CursosComponent } from './cursos/cursos.component';
import { AppAgregarComponent } from './app-agregar/app-agregar.component';
import { InicioComponent } from './inicio/inicio.component';
import { IngresarComponent } from './ingresar/ingresar.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { BooklinkComponent } from './booklink/booklink.component';

// 1. Import the libs you need
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FilterPipe } from './filter.pipe';
import { UserComponent } from './user/user.component';

//Mis rutas de la app
const router: Routes = [
  { 
    path: '',
    component: InicioComponent
  },
  { 
    path: 'agregar',
    component: AppAgregarComponent
  },
  { 
    path: 'ingresar',
    component: IngresarComponent
  },
  { 
    path: 'booklink/:id',
    component: BooklinkComponent
  },
  { 
    path: 'user/:uid',
    component: UserComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    CursosComponent,
    AppAgregarComponent,
    InicioComponent,
    IngresarComponent,
    BooklinkComponent,
    FilterPipe,
    UserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(router),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
