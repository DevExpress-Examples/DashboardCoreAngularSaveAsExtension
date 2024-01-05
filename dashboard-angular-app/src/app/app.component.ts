import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DxDashboardControlModule, DxDashboardControlComponent } from 'devexpress-dashboard-angular';
import { SaveAsDashboardExtension } from './extensions/save-as-dashboard-extension';
import { DeleteDashboardExtension } from './extensions/delete-dashboard-extension';
import { InputPopupComponent } from './input-popup.component';
import { DeleteDashboardService } from './delete-dashboard.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
  InputPopupComponent,
	CommonModule, 
	RouterOutlet, 
	DxDashboardControlModule, 
	HttpClientModule
  ],
  providers: [DeleteDashboardService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements AfterViewInit {
  @ViewChild(DxDashboardControlComponent, { static: false }) dashboardControl: DxDashboardControlComponent;
  @ViewChild(InputPopupComponent, { static: false }) inputPopup: InputPopupComponent;

  constructor(private element: ElementRef, private userService: DeleteDashboardService) {
    
  }
  ngAfterViewInit(): void {
    this.dashboardControl.instance.registerExtension(new SaveAsDashboardExtension(this.dashboardControl.instance, this.inputPopup));
    this.dashboardControl.instance.registerExtension(new DeleteDashboardExtension(this.dashboardControl.instance, this.userService));
  }
}
