import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { DashboardControl, DashboardControlArgs } from 'devexpress-dashboard';
import { SaveAsDashboardExtension } from './extensions/save-as-dashboard-extension';
import { DeleteDashboardExtension } from './extensions/delete-dashboard-extension';
import { InputPopupComponent } from './input-popup.component';
import { DeleteDashboardService } from '../delete-dashboard.service';
import { DxDashboardControlComponent } from 'devexpress-dashboard-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})

export class HomeComponent implements AfterViewInit {
  @ViewChild(DxDashboardControlComponent, { static: false }) dashboardControl: DxDashboardControlComponent;
  @ViewChild(InputPopupComponent, { static: false }) inputPopup: InputPopupComponent;

  constructor(private element: ElementRef, private userService: DeleteDashboardService) {
    
  }
  ngAfterViewInit(): void {
    this.dashboardControl.instance.registerExtension(new SaveAsDashboardExtension(this.dashboardControl.instance, this.inputPopup));
    this.dashboardControl.instance.registerExtension(new DeleteDashboardExtension(this.dashboardControl.instance, this.userService));
  }
}
