import { Component, OnInit, HostBinding } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import { trigger, transition, style, animate, query, stagger, state } from '@angular/animations';
import { async, timeout } from 'q';
import { PrendasService } from 'src/app/services/prendas.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('pageAnimations', [
      state('loading', style({
        opacity: 0.4,
      })),
      transition(':enter', [
        style({opacity: 0}),
        animate(400 )
      ]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition('notloading => loading',
        animate(4000, style({opacity: 0.4})))
      ]),

  ]
})
export class LoginComponent implements OnInit {
  name: string;
  password: string;
  visible: boolean;
  invalid: boolean;
  loading: boolean;
  constructor(private userService: UsuarioService, private route: Router, private prendasService: PrendasService) { }

  ngOnInit() {
    this.loading = false;
    this.visible = false;
    this.name = '';
    this.password = '';
    this.invalid = false;
    console.log('usuario: federicosamaniego');
    console.log('contraseña: 1234');
  }
  iniciarSesion() {
    this.loading = true;
    const valid = this.userService.login(this.name, this.password);
    if (valid) {
      this.loading = false;
      this.route.navigate(['admin']);
    } else {
      this.invalid = true;
    }
  }
}
