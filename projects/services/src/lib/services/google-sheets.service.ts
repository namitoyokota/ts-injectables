import { Injectable } from '@angular/core';
import { GoogleSheetsDbService } from 'ng-google-sheets-db';

@Injectable({
    providedIn: 'root',
})
export abstract class GoogleSheetsService<T> {
    /** Id of the spreadsheet to read */
    abstract SPREADSHEET_ID: string;

    /** Name of the page in the spreadsheet */
    abstract SPREADSHEET_NAME: string;

    /** Map of each column name to property */
    abstract recordMap: Object;

    constructor(private googleSheetsDbService: GoogleSheetsDbService) {}

    /** Call Google Sheets Service to get records */
    async getRecords(): Promise<T[]> {
        return new Promise((resolve) => {
            this.googleSheetsDbService
                .get<T>(this.SPREADSHEET_ID, this.SPREADSHEET_NAME, this.recordMap)
                .toPromise()
                .then((records) => {
                    if (records) {
                        resolve(records);
                    } else {
                        resolve([]);
                    }
                })
                .catch((error: unknown) => {
                    console.error(error);
                    resolve([]);
                });
        });
    }
}
