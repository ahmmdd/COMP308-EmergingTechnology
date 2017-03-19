// angular requirements
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule, RequestOptions } from '@angular/http';
import {APP_BASE_HREF} from '@angular/common';

// Components
import { AppComponent } from './app.component';

// App Routes
import { AppRoutes } from './app.routes';

// Custom Modules
import { GamesModule } from './games/games.module';

// Here is a comment

@NgModule({
  imports:      [BrowserModule, HttpModule, FormsModule,
                GamesModule, RouterModule.forRoot(AppRoutes)],
  providers:    [{provide: APP_BASE_HREF, useValue : '/' }],
  declarations: [AppComponent],
  bootstrap:    [AppComponent]
})
export class AppModule { }
