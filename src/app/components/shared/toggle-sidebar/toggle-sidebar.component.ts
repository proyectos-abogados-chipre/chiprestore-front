import { Component, OnInit } from '@angular/core';
import { mostrar } from 'src/app/store/ui.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-toggle-sidebar',
  templateUrl: './toggle-sidebar.component.html',
  styleUrls: ['./toggle-sidebar.component.css']
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
