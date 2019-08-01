import { Component, OnInit } from '@angular/core';
import { Store, State } from '@ngrx/store';
import { Usuario } from 'src/app/store/ui.reducer';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public rol: string;
  public nombre: string;
  constructor(public store: Store<Usuario>) { }

  ngOnInit() {
    this.store.select('adminState').subscribe( state => {
      this.nombre = state.usuario.nombre;
      this.rol = state.usuario.rol;
      switch (state.usuario.rol) {
        case 'administrador':
          return this.rol = 'administrador';
        case 'vendedor':
          return this.rol = 'vendedor';
      }
    });
  }

}
