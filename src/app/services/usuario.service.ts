import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from '../components/administrar-productos/administrar-productos.component';
import { State, Usuario } from '../store/ui.reducer';
import { iniciarSesion, cerrarSesion } from '../store/ui.actions';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private URL = 'http';
  constructor(private http: HttpClient,
              private store: Store<Usuario>) { }

  login(user: string, password: string) {
    // this.http.post(this.URL, {user: {user}, password: {password}})
    //   .subscribe(
    //     (resp: Usuario) => {
    //       if (resp != null) {
    //         this.store.dispatch(iniciarSesion(resp));
    //         return true;
    //       } else {
    //         return false;
    //       }
    //     },
    //     err => { console.log(err); },
    //   );


    if ( user === 'federicosamaniego' && password === '1234') {
      this.store.dispatch(iniciarSesion({
        userID: 40752791,
        nombre: 'federico samaniego',
        rol: 'administrador',
        sucursal: 0
      }));
      return true;
    } else {
      return false;
    }
  }

  logout() {
    this.store.dispatch(cerrarSesion());
  }

}

