import { Component, OnInit, HostBinding } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

// for Redux
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/ui.reducer';
import { ocultar } from 'src/app/store/ui.actions';
import { trigger, query, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styles: [`
    .side-bar{
      display: inline-flex
    }
    .buttonToggle {
        display: none;
        position: fixed;
        top: 15px;
        z-index: 3;
        left: 40px;
        height: 24px; width: 24px;
    }
    @media(max-width: 450px) {
        .side-bar{
        display:none

        }
        .buttonToggle {
            display: block;
        }
    }`],
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
