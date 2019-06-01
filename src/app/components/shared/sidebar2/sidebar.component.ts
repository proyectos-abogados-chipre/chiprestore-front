import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    admin: boolean;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Inicio',  icon: 'dashboard', class: '', admin: false },
    { path: '/commissions', title: 'Comisiones',  icon:'local_atm', class: '', admin: false },
    { path: '/categories', title: 'Categorías',  icon:'category', class: '', admin: true },
    { path: '/products', title: 'Productos',  icon:'person', class: '', admin: true },
    { path: '/orders', title: 'Catálogo',  icon:'store_mall_directory', class: '', admin: false },
    { path: '/purchases', title: 'Mis Compras',  icon:'local_offer', class: '', admin: false },
    { path: '/users', title: 'Distribuidores',  icon:'person', class: '', admin: true },
    { path: '/memberships', title: 'Membresías',  icon:'star_rate', class: '', admin: true },
    { path: '/configurations', title: 'Configuración',  icon:'settings', class: '', admin: true },
    
    //{ path: '/table-list', title: 'Table List',  icon:'content_paste', class: '', admin: false },
    //{ path: '/typography', title: 'Typography',  icon:'library_books', class: '', admin: false },
    //{ path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '', admin: false },
//    { path: '/maps', title: 'Maps',  icon:'location_on', class: '', admin: false },
    //{ path: '/notifications', title: 'Notifications',  icon:'notifications', class: '', admin: false },
];

@Component({
  selector: 'app-sidebar2',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent2 implements OnInit {
  menuItems: any[];
  datos: any;
  constructor( ) { }

  ngOnInit() {
  }
  filterMenu(){
    let adminId = 1;
    let userId = (typeof(this.datos.roles[0]) == "undefined") ? 2 : this.datos.roles[0].id;
    let userIsAdmin = (adminId == userId);
    this.menuItems = ROUTES.filter(menuItem => {
        return (userIsAdmin === menuItem.admin) || menuItem.admin === false;
    });
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

}
