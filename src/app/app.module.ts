import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AngularMaterialModule } from './modules/angular-material/angular-material.module';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { AppComponent } from './app.component';
import { PullRequestListComponent } from './pull-request-list/pull-request-list.component';
import { PullRequestFormComponent } from './pull-request-form/pull-request-form.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { NavContentComponent } from './nav-content/nav-content.component';
import { MatInputModule } from '@angular/material/input';

const appRoutes: Routes = [
  { path: '', component: PullRequestListComponent },
  { path: 'pullrequests', component: PullRequestListComponent },
  { path: 'pullrequest/:number', component: PullRequestFormComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    PullRequestListComponent,
    PullRequestFormComponent,
    NavComponent,
    NavContentComponent
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    NoopAnimationsModule,
    AngularMaterialModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    MatInputModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
