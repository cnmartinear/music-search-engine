import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SongListComponent } from './songs/song-list/song-list.component';
import { NapsterComponent } from './songs/song-list/napster/napster.component';
import { HomeComponent } from './home/home.component';

@NgModule({ declarations: [
        AppComponent,
        SongListComponent,
        NapsterComponent,
        HomeComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        FormsModule,
        MatPaginatorModule,
        MatFormFieldModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
