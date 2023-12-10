import { Observable, Subscription, timer } from 'rxjs';
import { first } from 'rxjs/operators';

export abstract class StoreService<T> {
    /** List of items that are loaded */
    protected items = new Map<string, T>();

    /** Full list of items have been loaded */
    protected listLoaded = false;

    /** Observable for timer ticks */
    private timer$: Observable<number>;

    /** Subscription listening to timer */
    private timerSubscription: Subscription;

    /** Frequency of the timer tick in milliseconds (5 minutes) */
    private readonly tickFrequency = 300000;

    /** Triggers next data request to call API */
    refreshList(): void {
        this.listLoaded = false;
    }

    /** Returns an item in list by id */
    getItem(id: string): Promise<T> {
        return new Promise((resolve) => {
            if (this.items.has(id)) {
                resolve(this.items.get(id));
            } else {
                this.getItemFromApi(id).then((item) => {
                    this.items.set(id, item);
                    resolve(item);
                });
            }
        });
    }

    /** Returns already loaded list if exists */
    getList(): Promise<T[]> {
        return new Promise((resolve) => {
            if (this.listLoaded) {
                resolve([...this.items.values()]);
            } else {
                this.getListFromApi().then((map) => {
                    this.startTimer();
                    this.listenToTimer();

                    this.items = new Map([...this.items.entries(), ...map.entries()]);
                    resolve([...this.items.values()]);
                });
            }
        });
    }

    /** Calls API to create new item */
    abstract createItem(request: unknown): Promise<T[]>;

    /** Calls API to delete item */
    abstract deleteItem(id: string, additionalInfo?: unknown): Promise<T[]>;

    /** Calls API to duplicate item */
    abstract duplicateItem(id: string, newId: string): Promise<T[]>;

    /** Calls API to get item */
    abstract getItemFromApi(id: string): Promise<T>;

    /** Calls API to get list of objects */
    abstract getListFromApi(): Promise<Map<string, T>>;

    /** Starts timer to refresh list */
    private startTimer(): void {
        this.listLoaded = true;
        this.timerSubscription?.unsubscribe();
        this.timer$ = timer(this.tickFrequency);
    }

    /** Empties store on timer finish */
    private listenToTimer(): void {
        this.timerSubscription = this.timer$.pipe(first()).subscribe(() => {
            this.refreshList();
        });
    }
}
