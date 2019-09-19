import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Usuario } from './store/ui.reducer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: []
})
export class AppComponent {
  title = 'Chiprestore';
  constructor(private store: Store<Usuario>, private route: Router) {
  //   this.store.select('adminState').subscribe(
  //     state => {
  //       if (state.usuario.userID === undefined) {
  //         this.route.navigate(['login']);
  //       }
  //     });
  }
}

