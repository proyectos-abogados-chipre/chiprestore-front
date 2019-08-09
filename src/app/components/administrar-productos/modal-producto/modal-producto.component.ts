import { Component, OnInit, Inject  } from '@angular/core';
import {FormGroup, FormArray, FormBuilder} from '@angular/forms';


import { MatDialogRef } from '@angular/material/dialog';
import {MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';


import { PrendasService } from 'src/app/services/prendas.service';


import { State } from 'src/app/store/ui.reducer';
import { Store } from '@ngrx/store';
import { addProducto } from 'src/app/store/ui.actions';

@Component({
  selector: 'app-modal-producto',
  templateUrl: './modal-producto.component.html',
  styleUrls: ['./modal-producto.component.css']
})
export class ModalProductoComponent implements OnInit{

  public formNuevoProducto: FormGroup;
  public stock: FormGroup;
  private imgProducto: string = null;
  public nuevo: boolean;
  public tab: number;

  constructor(private fbuilder: FormBuilder,
              private prendasService: PrendasService,
              public store: Store<State>,
              private snackbar: MatSnackBar,
              public modalRef: MatDialogRef<ModalProductoComponent>,
              @Inject(MAT_DIALOG_DATA) private prenda?: any
              ) {}

  ngOnInit(): void {
    this.initFormProducto();
    this.tab = 0;
    if (this.prenda == null) {
      this.nuevo = true;
      this.imgProducto = 'assets/img/add-img.png';
    } else {
      this.setForm();
      this.nuevo = false;
    }
  }

  initFormProducto() {
// Datos del Reactive form
    this.formNuevoProducto = this.fbuilder.group ({
      codigo: '',
      prenda: '',
      marca: '',
      color: '',
      pCosto: undefined,
      pVenta: undefined,
      img: '',
      disp: this.fbuilder.array([])
    });
    this.stock = this.fbuilder.group({
      talle: undefined,
      cantidad: undefined
    });
  }
// Guarda la nueva prenda mediante un metodo post sobre el servicio de prendas
    guardarPrenda() {
      // this.guardarImg(); // Para almacenar la imagen en back-end
      const body = this.formNuevoProducto.value;
      body.disp = Object.assign({}, this.formNuevoProducto.value.disp);
      this.prendasService.postNuevaPrenda(body)
        .subscribe(
          (response: {name: string}) => {
            console.log(response.name);
            this.formNuevoProducto.controls.codigo.setValue(response.name);
            this.snackbar.open('Registrado con exito. Codigo:' + response.name, 'Aceptar');
            this.store.dispatch(addProducto(this.formNuevoProducto.value));
            this.modalRef.close(true);
          },
          (error: any) => {
            console.log(error);
            this.snackbar.open('Problema al registrar el producto. Reintente.', '', {
              duration: 3000,
            });
          }
        );
    }


// Post de la imagen seleccionada a traves del servicio prendas
  guardarImg() {
    console.log(this.imgProducto);
    this.prendasService.postImagen(this.formNuevoProducto.controls.img.value)
    .subscribe(response =>
      console.log(response)
      );
  }

// Agrega una linea de stock --> {talle, cantidad}
    agregarDisponibilidad() {
      const dispArray = this.formNuevoProducto.get('disp') as FormArray;
      dispArray.push( this.fbuilder.group({
        talle: this.stock.controls.talle.value,
        cant: this.stock.controls.cantidad.value
        })
      );
    }

// Carga los datos de la prenda recibidos por el componente modal y los asigna al form
    setForm() {
      this.formNuevoProducto.controls.codigo.setValue(this.prenda.codigo);
      this.formNuevoProducto.controls.prenda.setValue(this.prenda.nombre);
      this.formNuevoProducto.controls.marca.setValue(this.prenda.marca);
      this.formNuevoProducto.controls.color.setValue(this.prenda.color);
      this.formNuevoProducto.controls.img.setValue(this.prenda.img);
      this.formNuevoProducto.controls.pCosto.setValue(this.prenda.pCosto);
      this.formNuevoProducto.controls.pVenta.setValue(this.prenda.pVenta);
      this.prenda.disp.forEach(articulo => {
        const disp = this.formNuevoProducto.get('disp') as FormArray;
        disp.push(
          this.fbuilder.group({
            talle: articulo.talle,
            cant: articulo.cant
          })
        );
      });
      console.log(this.formNuevoProducto.value);
    }

// Guarda los datos de la imagen seleccionada
    seleccionarImg(event) {
      const frame = document.getElementById('frame');
      this.formNuevoProducto.controls.img.setValue(event.target.files[0]);
      console.log(this.formNuevoProducto.controls.img.value);
      frame['src'] = URL.createObjectURL(event.target.files[0]);
      // this.imgProducto = URL.createObjectURL(event.target.files[0]);
    }

// Guardar cambios en producto registrado
  guardarCambios() {
    console.log('cambios en un producto');
  }

}
