import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public modeSidebar: string;
  constructor(public breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
    this.breakpointObserver
      .observe(['(min-width: 450px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.modeSidebar = 'side';
          console.log(state.matches);
        } else {
          this.modeSidebar = 'over';
          console.log(state.matches);
        }
      });
  }

}
