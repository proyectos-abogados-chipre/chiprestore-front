import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';

import { MatDialog } from '@angular/material';
import { ModalProductoComponent } from './modal-producto/modal-producto.component';
import { PrendasService } from 'src/app/services/prendas.service';
import { animate, trigger, state, style, transition, query, stagger } from '@angular/animations';

// for Redux
import { Store } from '@ngrx/store';
import { mostrar, ocultar } from 'src/app/store/ui.actions';
import { State } from 'src/app/store/ui.reducer';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Options } from 'selenium-webdriver';



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
  visibleSidebar: any;
  error: boolean;
  errorMsj: string;
  filteredOptions: Observable<string[]>;
  strAutocomplete = {
    prenda: [],
    marca: [],
    color: [],
    talle: []
  };

  // visibleSidebar: Observable<State> = this.store.select(state => state.visible);

  constructor(public dialog: MatDialog,
              private prendasService: PrendasService,
              public store: Store<{visible: boolean}>
              ) {}

  ngOnInit() {
    this.loading = true;
    this.visibleFilter = false;
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
      console.log ('recibe: ', resp);
    });

    this.agruparCategorias();

    // Observa cambios en el input de busqueda para sugerir palabras
    this.filteredOptions = this.formQuery.controls.valor.valueChanges
      .pipe(
        startWith(''),
        map( value => {
          if (this.formQuery.controls.valor.value !== '' &&
            this.formQuery.controls.categoria.value !== '' &&
            this.formQuery.controls.categoria.value.toLowerCase() !== 'codigo') {
            return this.filtro(value);
          }
          return undefined;
        })
      );
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
    console.log(this.formPrenda.value);
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

// Abre el sidebar, solo disponible en width < 450px
  toggleSidebar() {
      this.store.dispatch(mostrar);
  }

  // Filtra todas las sugerencias por parametro obtenido
  filtro(value: string): string[] {
    const valueFilter: string = value.toLowerCase();
    const categoria: string = this.formQuery.controls.categoria.value;
    return this.strAutocomplete[categoria].filter( arr => arr.includes(valueFilter));
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
