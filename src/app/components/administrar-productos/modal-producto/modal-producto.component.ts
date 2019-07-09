import { Component, OnInit, Inject  } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-modal-producto',
  templateUrl: './modal-producto.component.html',
  styleUrls: ['./modal-producto.component.css']
})
export class ModalProductoComponent {

    constructor(private modalRef: MatDialogRef<ModalProductoComponent>,
                @Inject(MAT_DIALOG_DATA) private prenda?: any) {
                 }

    closeModal() {
      this.modalRef.close(this.prenda);
    }

    cargarImagen(event) {
      console.log(event);
    }
}
