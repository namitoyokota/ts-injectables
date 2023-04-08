import { Component } from '@angular/core';
import { BudgetService } from './services/budget.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    constructor(private budgetService: BudgetService) {
        this.budgetService.getRecords().then((budgets) => {
            console.log(budgets);
        });
    }

    echo(text?: string, value?: string): void {
        console.log(text, value ? ': ' + value : '');
    }
}
