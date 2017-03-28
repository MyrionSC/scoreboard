import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AdminComponentComponent } from './admin-component/admin-component.component';
import {Routes, RouterModule } from "@angular/router";
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { SocketService } from './socket.service'

const appRoutes: Routes = [
  { path: 'scoreboard', component:  ScoreboardComponent},
  { path: 'admin', component: AdminComponentComponent },
  { path: '', redirectTo: '/scoreboard', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    AdminComponentComponent,
    ScoreboardComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
