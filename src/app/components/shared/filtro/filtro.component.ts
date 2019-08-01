import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css']
})
export class FiltroComponent implements OnInit {
  @Input() type: string;
  @Input() tittle: string;
  @Input() options: any[];
  @Output() selected = new EventEmitter<string>();
  @Output() keyEnter = new EventEmitter<boolean>();
  filteredOptions: Observable<string[]>;

  input = new FormControl('');

  constructor() {}

  ngOnInit() {
    // Observa cambios en el input de busqueda para sugerir palabras
    this.filteredOptions = this.input.valueChanges
      .pipe(
        startWith(''),
        map( value => {
          if (this.options === undefined) {
            return undefined;
          }
          if (this.input.value !== '' && this.options.length > 0
          //   this.formQuery.controls.categoria.value.toLowerCase() !== 'codigo'
            ) {
            return this.filtro(value);
          }
        })
      );
    this.input.valueChanges.subscribe(output => this.selected.emit(output));
  }

    // Filtra todas las sugerencias por parametro obtenido
    filtro(value: string): string[] {
      const valueFilter: string = value.toLowerCase();
      // const categoria: string = this.formQuery.controls.categoria.value;
      return this.options.filter( arr => arr.includes(valueFilter));
    }
    emitir() {
      this.keyEnter.emit(true);
    }
}
