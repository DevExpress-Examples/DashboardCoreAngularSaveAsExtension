import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { DxDashboardControlModule } from 'devexpress-dashboard-angular';
import { DevExtremeModule } from 'devextreme-angular';
import { InputPopupComponent } from './input-popup.component';

import { DeleteDashboardService } from './delete-dashboard.service';
@NgModule({
  declarations: [
    AppComponent,
	InputPopupComponent
  ],
  imports: [
    BrowserModule,
    DxDashboardControlModule,
    DevExtremeModule,
	HttpClientModule
  ],
  providers: [DeleteDashboardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
