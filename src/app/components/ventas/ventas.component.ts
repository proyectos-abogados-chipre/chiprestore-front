import { Component, OnInit } from '@angular/core';
import { VentasService } from 'src/app/services/ventas.service';
import { PrendasService } from 'src/app/services/prendas.service';
import { FormControl, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataTable: any;
  displayedColumns: string[] = ['codigo', 'detalle', 'cantidad', 'costo', 'subtotal'];
  formBusqueda = new FormControl();
  formVenta = new FormGroup({
    lineas: new FormArray([]),
    total: new FormControl(0),
    medio: new FormControl(),
    cuotas: new FormControl(),
    fecha: new FormControl(),
    idUsuario: new FormControl(),
    sucursal: new FormControl(),
  });
  disableCredito: boolean = true;
  intereses = 15.00;

  constructor(public ventasService: VentasService,
              public prendasService: PrendasService) { }

  ngOnInit() {
    // this.dataTable = this.ventasService.getLineas();
    this.dataTable = [];
    console.log(this.dataTable);
    // this.displayedColums = Object.keys(this.dataTable[0]);
  }

  buscarPrenda() {
    const result: any = this.prendasService.searchPrendas({codigo: this.formBusqueda.value})[0];
    const linea = {
      idProducto: result.codigo,
      detalle: result.nombre + ' ' + result.marca,
      stock: result.disp,
      talle: '',
      cantidad: 0,
      costoU: result.pVenta,
    };
    this.dataTable.push(linea);
    console.log(this.formVenta.value);
  }
  calcularTotal() {
    console.log(this.dataTable);
  }
  registrarVenta() {
    console.log(this.formVenta.value);
  }

}

// const linea = new FormGroup({
//   idProducto: new FormControl(result.codigo),
//   detalle: new FormControl (result.nombre + ' ' + result.marca),
//   stock: new FormControl (result.disp),
//   cantidad: new FormControl (0),
//   costoU: new FormControl (result.pVenta)
// });
// const formLinea = this.formVenta.get('lineas') as FormArray;
// formLinea.push(linea);
