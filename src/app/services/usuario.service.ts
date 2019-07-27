import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from '../components/administrar-productos/administrar-productos.component';
import { State, Usuario } from '../store/ui.reducer';
import { iniciarSesion } from '../store/ui.actions';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private URL = 'http';
  constructor(private http: HttpClient,
              private store: Store<Usuario>) { }

  login(user: string, password: string) {
    this.http.post(this.URL, {user: {user}, password: {password}})
      .subscribe(
        (resp: Usuario) => {
          this.store.dispatch(iniciarSesion(resp));
        },
        err => { console.log(err); },
      );
  }

}
