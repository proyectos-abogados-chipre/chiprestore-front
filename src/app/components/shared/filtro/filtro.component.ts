import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-filtro',
  template: `
  <mat-form-field style="width: -webkit-fill-available">
    <mat-label>{{tittle}}</mat-label>
    <input
    type="{{type}}"
    matInput
    [formControl]="input"
    [matAutocomplete]="sugerencias"
    (keyup.enter)="this.keyEnter.emit(true);">
  </mat-form-field>

  <mat-autocomplete #sugerencias="matAutocomplete">
    <mat-option *ngFor="let option of filteredOptions | async" [value]="option">
      {{option}}
    </mat-option>
  </mat-autocomplete>`,
  styles: [``]
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
