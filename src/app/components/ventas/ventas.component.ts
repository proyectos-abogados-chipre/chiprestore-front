import { Component, OnInit} from '@angular/core';
import { VentasService } from 'src/app/services/ventas.service';
import { PrendasService } from 'src/app/services/prendas.service';
import { FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Usuario } from 'src/app/store/ui.reducer';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
  // displayedColumns: string[] = ['codigo', 'detalle', 'cantidad', 'costo', 'subtotal'];
  formBusqueda = new FormControl();
  formVenta: FormGroup;
  stock: any[] = [];
  disableCredito = true;
  selectedToDelete = [];
  noResult = false;
  loading = false;

  constructor(public ventasService: VentasService,
              public prendasService: PrendasService,
              private fbuilder: FormBuilder,
              private store: Store<Usuario>,
              public snackbar: MatSnackBar) { }

  ngOnInit() {
    this.initFormVenta();
    this.formVenta.controls.intereses.valueChanges.subscribe(
      () => this.calcularMonto()
    );
    this.formVenta.controls.nroCuotas.valueChanges.subscribe(
      () => this.calcularMonto()
    );
  }

  initFormVenta() {
    const fecha = new Date();
    this.formVenta = this.fbuilder.group({
      lineas: this.fbuilder.array([]),
      montoNeto: 0,
      medioPago: undefined,
        montoFinal: 0,
        intereses: 0,
        nroCuotas: 0,
        valorCuota: undefined,
      fecha: fecha.toLocaleDateString(),
      idUsuario: undefined,
      sucursal: undefined,
    });
    this.store.pipe(select('adminState'), select('usuario'))
      .subscribe( usuario =>
        this.formVenta.patchValue({
          idUsuario: usuario.userID,
          sucursal: usuario.sucursal
        })
      );
  }

// Busca una prenda a traves de su codigo mediante metodos del servicio de prendas
  buscarPrenda() {
    const result: any = this.prendasService.searchPrendas({codigo: this.formBusqueda.value})[0];
    if (result) {
      const linea = this.fbuilder.group({
        idProducto: result.codigo,
        detalle: result.nombre + ' ' + result.marca,
        talle: undefined,
        cantidad: 0,
        costoU: result.pVenta,
      });
      const formLinea = this.formVenta.get('lineas') as FormArray;
      formLinea.push(linea);
      this.stock.push({
        idProducto: result.codigo, disponibilidad: result.disp
      });
      this.noResult = false;
    } else {
      this.noResult = true;
    }
    this.formBusqueda.reset();
  }

// Calcula el monto neto a abonar cada vez que se cambia la cantidad del articulo seleccionado
  acumularTotal(monto: number) {
    let acc = 0;
    for (const linea of this.formVenta.controls.lineas.value) {
      acc = acc + linea.costoU * linea.cantidad;
    }
    this.formVenta.patchValue({
      montoNeto: acc
    });
    console.log('total acum', this.formVenta.controls.montoNeto.value);
  }

// Metodos para seleccionar y eliminar items añadidos
  agregarSeleccionado(item: any) {
    this.selectedToDelete.push(item);
  }
  quitarSeleccionado(item: any) {
    const index = this.selectedToDelete.indexOf(item);
    this.selectedToDelete.splice(index, 1);
  }
  borrarItems() {
    if (this.selectedToDelete.length > 0) {
      const lineas = this.formVenta.controls.lineas as FormArray;
      for (const item of this.selectedToDelete) {
        const index = lineas.value.indexOf(item);
        lineas.removeAt(index);
      }
    }
  }

// Calcula el monto final a pagar de acuerdo a la forma de pago
  calcularMonto() {
    switch (this.formVenta.value.medioPago) {
      case 'efectivo': {
        this.formVenta.controls.nroCuotas.setValue(0);
        break;
      }
      case 'debito': {
        this.formVenta.controls.nroCuotas.setValue(0);
        break;
      }
      case 'credito': {
        const aumento = this.formVenta.controls.montoNeto.value * (this.formVenta.controls.intereses.value / 100);
        const varMontoFinal = this.formVenta.controls.montoNeto.value + aumento;
        const varValorCuota = varMontoFinal / this.formVenta.controls.nroCuotas.value;
        this.formVenta.patchValue({
          montoFinal: varMontoFinal,
          valorCuota: varValorCuota,

        });
        break;
      }

    }
  }

// Registra la venta
  registrarVenta() {
    this.loading = true;
    this.ventasService.postVenta(this.formVenta.value)
      .subscribe(
        resp => {
          this.formVenta.reset();
          this.snackbar.open('Venta registrada con exito', 'Aceptar', {
            duration: 1000,
          });
        },
        err => {
          this.snackbar.open('Problema al registrar', 'Reintentar', {
            duration: 2000,
          });
        },
        () => this.loading = false
        );
  }

}
