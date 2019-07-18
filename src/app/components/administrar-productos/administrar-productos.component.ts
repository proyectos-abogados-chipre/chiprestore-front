import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';

import { MatDialog } from '@angular/material';
import { ModalProductoComponent } from './modal-producto/modal-producto.component';
import { PrendasService } from 'src/app/services/prendas.service';

@Component({
  selector: 'app-administrar-productos',
  templateUrl: './administrar-productos.component.html',
  styleUrls: ['./administrar-productos.component.css']
})

export class AdministrarProductosComponent implements OnInit {


  prendasArray: Object[] = [];
// Parametros de busqueda de productos con reactive forms
  formPrenda = new FormGroup ({
    codigo: new FormControl(''),
    prenda: new FormControl(''),
    marca: new FormControl(''),
    color: new FormControl(''),
    talle: new FormControl(''),
  });
// Filtro con el que se completa los parametros de busqueda
  formQuery = new FormGroup({
    categoria: new FormControl(''),
    valor: new FormControl(''),
  });

  itemsChip = [];
  removable = true;
  loading: boolean;
  visibleFilter: boolean;

  constructor(public dialog: MatDialog, private prendasService: PrendasService) {
    this.loading = true;
    this.visibleFilter = false;
    this.prendasArray = Object.values(this.prendasService.getPrendasEj());
    this.itemsChip = Object.entries(this.formPrenda.value);
    this.prendasService.getPrendas()
      .subscribe( response => {
        console.log(response);
        this.loading = false;
      }
      );
  }
  ngOnInit() {
  }

// Transforma el conjunto de prendas recibida como un objeto a un array
  getArray(prendasAsObject) {
    const prendas: Object[] = [];
    Object.keys(prendasAsObject).forEach(
      key => {
        const prenda = prendasAsObject[key];
        prendas.push(prenda);
      }
    );
    console.log(prendas);
    return prendas;
  }

// Abre la modal para crear un nuevo producto
  nuevoProducto() {
    const modalRef = this.dialog.open(ModalProductoComponent, {
      width: 'auto',
      height: '600px',
      maxHeight: 'calc(100% - 30px)'
    });
  }

// Abre la modal con los datos del producto seleccionado
  openModal(prenda: Object) {
    const modalRef = this.dialog.open(ModalProductoComponent,
      {
        width: 'auto',
        height: '600px',
        maxHeight: 'calc(100% - 30px)',
        data: prenda
      }).afterClosed()
      .subscribe( response =>
          this.prendasService.getPrendas()
            .subscribe( prendas =>
              console.log(prendas)
              )
        );
    }
// Realiza un get para obtener los productos filtrados por parametros del form
  buscarProductos() {
    console.log('yendo a buscar');
    console.log(this.formPrenda.value);
    const result = this.prendasService.searchPrendas(this.formPrenda.value);
    this.prendasArray = result;
  }

  agregarCategoria() {
    console.log('agregando categoria');
    const tipo = this.formQuery.controls.categoria.value;
    const valor = this.formQuery.controls.valor.value;
    this.formPrenda.controls[tipo].setValue(valor);
    this.itemsChip = Object.entries(this.formPrenda.value);
    this.buscarProductos();
  }

// Remueve un matChip
  removerCategoria(categoria: string) {
    console.log('quitando categoria');
    this.formPrenda.controls[categoria].setValue('');
    this.itemsChip = Object.entries(this.formPrenda.value);
    console.log(this.itemsChip);
    this.buscarProductos();
  }
  abrirFiltro() {
    console.log('funca');
  }
}


export interface Producto {
  codigo: string;
  prenda: string;
  marca: string;
  color: string;
  pCosto: number;
  pVenta: number;
  disp: [
    {talle: string, cant: number}
  ];

}
