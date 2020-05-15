import { Component, AfterViewInit, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { DashboardControl, ResourceManager } from 'devexpress-dashboard';
import { SaveAsDashboardExtension } from './extensions/save-as-dashboard-extension';
import { DeleteDashboardExtension } from './extensions/delete-dashboard-extension';
import { InputPopupComponent } from './input-popup.component';
import { DeleteDashboardService } from '../delete-dashboard.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})

export class HomeComponent implements AfterViewInit, OnDestroy {
  private dashboardControl!: DashboardControl;
  @ViewChild(InputPopupComponent, { static: false }) inputPopup: InputPopupComponent;

  constructor(private element: ElementRef, private userService: DeleteDashboardService) {
    ResourceManager.embedBundledResources();
  }
  ngAfterViewInit(): void {
    this.dashboardControl = new DashboardControl(this.element.nativeElement.querySelector(".dashboard-container"), {
      // Specifies a URL of the Web Dashboard's server.
      endpoint: "api/dashboard",
    });

    this.dashboardControl.registerExtension(new SaveAsDashboardExtension(this.dashboardControl, this.inputPopup));
    this.dashboardControl.registerExtension(new DeleteDashboardExtension(this.dashboardControl, this.userService));

    this.dashboardControl.render();
  }
  ngOnDestroy(): void {
    this.dashboardControl && this.dashboardControl.dispose();
  }
}
