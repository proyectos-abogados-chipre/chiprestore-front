import { Component, OnInit } from '@angular/core';
import { mostrar } from 'src/app/store/ui.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-toggle-sidebar',
  template: `
  <div class="row">
  <div class="col-sm-12">
      <a class="toggleButton" (click)="toggleSidebar()">
          <mat-icon>list</mat-icon>
      </a>
  </div>
</div>  `,
  styles: [`
  .toggleButton {
    cursor: pointer;
    visibility: hidden;
    height: 24px; width: 24px;
 }


 @media(max-width: 450px) {
   .toggleButton {
       visibility: visible;
   }
}
mat-icon {
    font-size: 30px!important;
    display: flex;
    height: auto;
    width: auto;
}
  `]
})
export class ToggleSidebarComponent implements OnInit {
  visibleSidebar: any;

  constructor(private store: Store<{visible: boolean}>) { }

  ngOnInit() {
  }
  // Abre el sidebar, solo disponible en width < 450px
  toggleSidebar() {
    this.store.dispatch(mostrar);
  }

}
