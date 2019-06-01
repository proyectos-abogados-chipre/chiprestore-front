import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './components/userlayout/admin/admin.component';
import { appRoutes } from './app.routing';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { ResumenComponent } from './components/resumen/resumen.component';
import { AdministrarProductosComponent } from './components/administrar-productos/administrar-productos.component';
import { SucursalesComponent } from './components/sucursales/sucursales.component';

//Angular material
// import {  MatFormField, MatLabel, MatSelect, MatOption, MatFormFieldModule, MatSelectModule, MatOptionModule } from '@angular/material';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    
    AdminComponent,
    NavbarComponent,
    SidebarComponent,
    ResumenComponent,
    AdministrarProductosComponent,
    SucursalesComponent,



  
  ],
  imports: [
    BrowserModule,
    appRoutes,

    
    // MatFormFieldModule,
    // MatLabel,
    // MatSelectModule,
    // MatOptionModule,
    // BrowserAnimationsModule,
    // MatButtonModule, MatCheckboxModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
