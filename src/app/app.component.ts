import { Component } from '@angular/core';
import { FirebaseService, Test } from '@namitoyokota/services';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    test: Test = new Test();
    firebase: FirebaseService = new FirebaseService();

    echo(text?: string, value?: string): void {
        console.log(text, value ? ': ' + value : '');
    }
}
