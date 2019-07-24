import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';

import { MatDialog } from '@angular/material';
import { ModalProductoComponent } from './modal-producto/modal-producto.component';
import { PrendasService } from 'src/app/services/prendas.service';
import { animate, trigger, state, style, transition, query, stagger } from '@angular/animations';

// for Redux
import { Store } from '@ngrx/store';
import { mostrar, ocultar } from 'src/app/ui.actions';
import { State } from 'src/app/ui.reducer';
import { Observable } from 'rxjs';

export interface AppState {
  visible: boolean;
}

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
  // visibleSidebar: Observable<State> = this.store.select(state => state.visible);
  constructor(public dialog: MatDialog,
              private prendasService: PrendasService,
              public store: Store<{visible: boolean}>
              ) {
    this.loading = true;
    this.visibleFilter = false;
    this.prendasArray = Object.values(this.prendasService.getPrendasEj());
    this.itemsChip = Object.entries(this.formPrenda.value);
    this.prendasService.getPrendas()
      .subscribe( response => {
        this.loading = false;
      });
  }

  ngOnInit() {
    // console.log(this.visibleSidebar);
    const prop =
    this.store.select('controlerUI').subscribe(state => {
      console.log ('recibe: ', state.visible);
      this.visibleSidebar = state.visible;

      return state.visible;
    });
    // console.log(this.visibleSidebar);

    // const getState = store => store.controlerUI;
    // const getProp = state => state.visible;
    // const getState = str => str.select('controlerUI');
    // const getProp = st => st.select('visible');
    // const prueba = this.store.select(_state => {
    //   // const _state = getState(_store);
    //   const _prop = getProp(_state);
    //   return _state.visible;
    // });
    // console.log(prueba);

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
    console.log('yendo a buscar');
    console.log(this.formPrenda.value);
    const result = this.prendasService.searchPrendas(this.formPrenda.value);
    this.prendasArray = result;
  }

// agrega un parametro (categoria) al form para buscar un producto
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


  toggleSidebar() {
    console.log('pre action', this.visibleSidebar);
    if (!this.visibleSidebar) {
      this.store.dispatch(mostrar);
    } else {
      this.store.dispatch(ocultar);
    }
    console.log('post action', this.visibleSidebar);

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
