import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';

import { MatDialog } from '@angular/material';
import { ModalProductoComponent } from './modal-producto/modal-producto.component';
import { PrendasService } from 'src/app/services/prendas.service';
import { animate, trigger, style, transition, query, stagger } from '@angular/animations';

// for Redux
import { Store } from '@ngrx/store';
import { mostrar, ocultar } from 'src/app/store/ui.actions';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';



@Component({
  selector: 'app-administrar-productos',
  templateUrl: './administrar-productos.component.html',
  styleUrls: ['./administrar-productos.component.css'],
  animations: [
    trigger('animationFilter', [
      transition(':enter', [
        style({opacity: 0}),
        animate(200 )
      ]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(':leave',
        animate(200, style({opacity: 0})))
    ]),
    trigger('imageAnimation', [
      // this will ignore animations on enter and when there are none to display
      transition(':enter, * => 0, * => -1', []),
      transition(':increment', [
        query(':enter', [
          style({ opacity: 0, width: '0px' }),
          stagger(50, [
            animate('300ms ease-out', style({ opacity: 1, width: '*' })),
          ]),
        ])
      ]),
      transition(':decrement', [
        query(':leave', [
          stagger(50, [
            animate('300ms ease-out', style({ opacity: 0, width: '0px' })),
          ]),
        ])
      ]),
    ])
  ]
})

export class AdministrarProductosComponent implements OnInit {


  prendasArray: any[] = [];
// Parametros de busqueda de productos con reactive forms
  formPrenda: FormGroup;
// Filtro con el que se completa los parametros de busqueda
  formQuery: FormGroup;

  itemsChip = [];
  removable = true;
  loading: boolean;
  visibleFilter: boolean;
  error: boolean;
  errorMsj: string;
  strAutocomplete = {
    prenda: [],
    marca: [],
    color: [],
    talle: []
  };
  heigthModal: string;

  // visibleSidebar: Observable<State> = this.store.select(state => state.visible);

  constructor(public dialog: MatDialog,
              private prendasService: PrendasService,
              public store: Store<{visible: boolean}>,
              private fbuilder: FormBuilder,
              public breakpointObserver: BreakpointObserver
              ) {}

  ngOnInit() {
    this.breakpointObserver
    .observe(['(min-width: 450px)'])
    .subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.heigthModal = '75%';
      } else {
        this.heigthModal = '90%';
      }
    });
    this.loading = true;
    this.visibleFilter = false;
    this.initForms();
    this.prendasArray = Object.values(this.prendasService.getPrendasEj());
    this.itemsChip = Object.entries(this.formPrenda.value);
    // Obtiene todos los productos en un arreglo
    this.prendasService.getPrendas()
      .subscribe(
        response => {
          // console.log(response);
        },
        (error: any) => {
          this.error = true;
          this.errorMsj = error.message;
          this.prendasArray = []; // SOLO EN DESARROLLO, UTILIZADO PARA MOSTRAR ERROR EN REQUEST
        },
        () => {this.loading = false; }
      );
    this.store.select('adminState').subscribe(resp => {
      // console.log ('recibe: ', resp);
    });
    this.agruparCategorias();
  }

  initForms() {
    this.formPrenda = this.fbuilder.group ({
      codigo: '',
      prenda: '',
      marca: '',
      color: '',
      talle: '',
    });
    this.formQuery = this.fbuilder.group({
      categoria: '',
      valor: '',
    });
  }

// Transforma el conjunto de prendas recibida como un objeto a un array
  getArray(prendasAsObject) {
    const prendas: any[] = [];
    Object.keys(prendasAsObject).forEach(
      key => {
        const prenda = prendasAsObject[key];
        prendas.push(prenda);
      }
    );
    return prendas;
  }

// Abre la modal para crear un nuevo producto
  nuevoProducto() {
    const modalRef = this.dialog.open(ModalProductoComponent, {
      // width: '40rem',
      height: this.heigthModal,
      maxHeight: 'calc(100% - 30px)',
      autoFocus: false,
    });
  }

// Abre la modal con los datos del producto seleccionado
  openModal(prenda: any) {
    const modalRef = this.dialog.open(ModalProductoComponent,
      {
        // width: '40rem',
        height: this.heigthModal,
        maxHeight: 'calc(100% - 30px)',
        autoFocus: false,
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
    const result = this.prendasService.searchPrendas(this.formPrenda.value);
    this.prendasArray = result;
  }

// agrega un parametro (categoria) al form para buscar un producto
  agregarCategoria() {
    const tipo = this.formQuery.controls.categoria.value;
    const valor = this.formQuery.controls.valor.value.toLowerCase();
    this.formPrenda.controls[tipo].setValue(valor);
    this.itemsChip = Object.entries(this.formPrenda.value);
    this.buscarProductos();
  }

// Remueve un matChip
  removerCategoria(categoria: string) {
    this.formPrenda.controls[categoria].setValue('');
    this.itemsChip = Object.entries(this.formPrenda.value);
    this.buscarProductos();
  }



// Agrupa en un objeto todas las opciones de cada categoria a sugerir
  agruparCategorias() {
    this.prendasArray.forEach(
      (value: any) => {
        value.nombre.split(' ').forEach(str => {
          if (!this.strAutocomplete.prenda.includes(str)) {
            this.strAutocomplete.prenda.push(str);
          }
        });
        if (!this.strAutocomplete.marca.includes(value.marca)) {
          this.strAutocomplete.marca.push(value.marca);
        }
        if (!this.strAutocomplete.color.includes(value.color)) {
          this.strAutocomplete.color.push(value.color);
        }
      }
    );
    this.strAutocomplete.talle = ['xs', 's', 'm', 'l', 'xl'];
  }
}


export interface AppState {
  visible: boolean;
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
