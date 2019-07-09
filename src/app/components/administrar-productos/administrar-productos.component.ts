import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ModalProductoComponent } from './modal-producto/modal-producto.component';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-administrar-productos',
  templateUrl: './administrar-productos.component.html',
  styleUrls: ['./administrar-productos.component.css']
})
export class AdministrarProductosComponent implements OnInit {

  prendas: Object = {
    prenda1: {
      nombre: 'remera abercombrie & fitch azul',
      precio: 500.00,
      talle: 's m xl',
      codigo: '1',
      img: `/assets/img/img1.png`
    }, prenda2: {
      nombre: 'camisa polo salmon',
      precio: 500.00,
      talle: 's m xl',
      codigo: '2',
      img: `/assets/img/img2.png`
    },
    prenda3: {
      nombre: 'remera tommy hilfiger blanca',
      precio: 500.00,
      talle: 's m xl',
      codigo: '3',
      img: `/assets/img/img3.png`
    },
    prenda4: {
      nombre: 'sueter abercombrie & fitch naranja',
      precio: 500.00,
      talle: 's m xl',
      codigo: '4',
      img: `/assets/img/img4.png`
    },
    prenda5  : {
      nombre: 'remera abercombrie & fitch roja',
      precio: 500.00,
      talle: 's m xl',
      codigo: '5',
      img: `/assets/img/img5.png`
    },
  };
  prendasArray: Object[] = [];
  constructor(public dialog: MatDialog) {
    this.prendasArray = this.getArray();
   }

  ngOnInit() {
  }

  getArray() {
    const prendas: Object[] = [];
    Object.keys(this.prendas).forEach(
      key => {
        const prenda = this.prendas[key];
        console.log(prenda);
        prendas.push(prenda);
      }
    );
    return prendas;
  }
  nuevoProducto() {
    const producto: Object = {
      nombre: '',
      precio: 0,
      talle: '',
      codigo: '',
      img: ``,
    };
    const modalRef = this.dialog.open(ModalProductoComponent, {
      width: 'auto',
      height: 'auto',
      data: producto
    });
    modalRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  openModal(prenda: Object) {
    console.log(prenda['nombre']);
    const modalRef = this.dialog.open(ModalProductoComponent,
      {
        height: '444px',
        width: '530px',
        minHeight: 'max-content',
        data: prenda
      }
      );

    modalRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    }
}
