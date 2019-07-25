import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

// for Redux
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/ui.reducer';
import { Observable } from 'rxjs';
import { ocultar } from 'src/app/store/ui.actions';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public modeSidebar: string;
  // visibleSidebar: Observable<State> = this.store.select(state=> state.visible);
  visibleSidebar: any = true;
  constructor(public breakpointObserver: BreakpointObserver,
              public store: Store<State>) {
               }

  ngOnInit() {
    this.breakpointObserver
      .observe(['(min-width: 450px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.modeSidebar = 'side';
        } else {
          this.modeSidebar = 'over';
        }
      });
    this.store.select('adminState')
      .subscribe(state => {
        this.visibleSidebar = state.visible;
      });
  }
  cierraSidebar() {
    this.store.dispatch(ocultar);
  }
}
