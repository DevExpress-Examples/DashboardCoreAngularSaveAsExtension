import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { InputPopupComponent } from './home/input-popup.component';

import { DevExtremeModule } from 'devextreme-angular';

import { DeleteDashboardService } from './delete-dashboard.service';

import { DxDashboardControlModule } from 'devexpress-dashboard-angular';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    InputPopupComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    DevExtremeModule,
    DxDashboardControlModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' }
    ])
  ],
  providers: [DeleteDashboardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
