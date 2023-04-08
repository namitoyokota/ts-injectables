import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { API_KEY } from 'ng-google-sheets-db';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, HttpClientModule],
    providers: [
        {
            provide: API_KEY,
            useValue: 'AIzaSyC-qTb8hSeyLY4skpHLN34tt7z91H2yeDY',
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
