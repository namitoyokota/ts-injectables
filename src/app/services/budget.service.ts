import { Injectable } from '@angular/core';
import { GoogleSheetsService } from '@namitoyokota/ng-services';

export interface Budget {
    category: string;
    budget: string;
}

export const BudgetMap = {
    category: 'Category',
    budget: 'Budget',
};

@Injectable({
    providedIn: 'root',
})
export class BudgetService extends GoogleSheetsService<Budget> {
    SPREADSHEET_ID = '12RnidOkxSYty8tn-nq9DfgrdDL7Fklf6VVvOogn9dnc';
    SPREADSHEET_NAME = 'Budgets';
    recordMap = BudgetMap;
}
