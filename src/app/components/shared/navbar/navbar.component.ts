import { Component, OnInit } from '@angular/core';
// import { MatFormField,  MatLabel,  MatSelect,  MatOption } from '@angular/material';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  option:string;
  usuarios:string[];
  constructor() { 
    this.option='';
    this.usuarios=['gerente', 'cajero'];
  }

  ngOnInit() {
  }

}
