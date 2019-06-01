import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AdminComponent } from './components/userlayout/admin/admin.component';
import { ResumenComponent } from './components/resumen/resumen.component';
import { AdministrarProductosComponent } from './components/administrar-productos/administrar-productos.component';
import { SucursalesComponent } from './components/sucursales/sucursales.component';

const routes: Routes = [
    { path: '', component: AdminComponent, children:[
        { path: 'resume', component: ResumenComponent },
        { path: 'marketplaces', component: SucursalesComponent },
        { path: 'product/administrate', component: AdministrarProductosComponent },
        // { path: 'product/stock', component: FeatureComponent },
        { path: '**', redirectTo:'/resume'},

    ] },

    
    { path: '**', component: AdminComponent },

    //{ path: 'path/:routeParam', component: MyComponent },
    //{ path: 'staticPath', component: ... },
    //{ path: '**', component: ... },
    //{ path: 'oldPath', redirectTo: '/staticPath' },
    //{ path: ..., component: ..., data: { message: 'Custom' }
];

export const appRoutes= RouterModule.forRoot(routes)
