import { Component, OnInit, Inject  } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material';
import { PrendasService } from 'src/app/services/prendas.service';
import {FormControlName, FormGroup, FormControl, FormArray} from '@angular/forms';

@Component({
  selector: 'app-modal-producto',
  templateUrl: './modal-producto.component.html',
  styleUrls: ['./modal-producto.component.css']
})
export class ModalProductoComponent {
// Datos del Reactive form
  formNuevoProducto = new FormGroup ({
    codigo: new FormControl(''),
    prenda: new FormControl(''),
    marca: new FormControl(''),
    color: new FormControl(''),
    pCosto: new FormControl(0),
    pVenta: new FormControl(0),
    img: new FormControl(''),
    disp: new FormArray([
      new FormGroup({
        talle: new FormControl(''),
        cant: new FormControl('0')
      })
    ])
  });
  private imgProducto: string = null;
  public nuevo: boolean;

  constructor(private modalRef: MatDialogRef<ModalProductoComponent>,
              private prendasService: PrendasService,
              @Inject(MAT_DIALOG_DATA) private prenda?: any) {
                if (this.prenda == null) {
                  this.nuevo = true;
                  this.imgProducto = 'assets/img/add-img.png';
                } else {
                  this.setForm();
                  this.nuevo = false;
                }
              }
// Guarda la nueva prenda mediante un metodo post sobre el servicio de prendas
    guardarPrenda() {
      this.guardarImg();
      const body = this.formNuevoProducto.value;
      body.disp = Object.assign({}, this.formNuevoProducto.value.disp);
      console.log(body);
      this.prendasService.postNuevaPrenda(body)
        .subscribe(response => {
          console.log(response);
          this.formNuevoProducto.controls.codigo.setValue(response);
        });
      this.modalRef.close(true);
    }

// Agrega una linea de stock --> {talle, cantidad}
    agregarDisponibilidad() {
      const dispArray = this.formNuevoProducto.get('disp') as FormArray;
      dispArray.push( new FormGroup({
        talle: new FormControl(''),
        cant: new FormControl('0')
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
          new FormGroup({
            talle: new FormControl(articulo.talle),
            cant: new FormControl(articulo.cant)})
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

// Post de la imagen seleccionada a traves del servicio prendas
    guardarImg() {
      console.log(this.imgProducto);
      this.prendasService.postImagen(this.formNuevoProducto.controls.img.value)
      .subscribe(response =>
        console.log(response)
        );
    }
}
