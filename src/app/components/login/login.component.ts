import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  name: string;
  password: string;
  constructor(private userService: UsuarioService, private route: Router) { }

  ngOnInit() {
    this.name = '';
    this.password = '';
  }
  iniciarSesion() {
    console.log(this.name);
    const valid = this.userService.login(this.name, this.password);
    if (valid) {
      this.route.navigate(['product/admin']);
    }
  }
}