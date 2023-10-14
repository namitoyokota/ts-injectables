/**
 * Helpful utilities for components and service
 */
export class Utils {
    /**
     * Deep copies provided data
     * @param data Original data to copy
     * @returns Same data with new address
     */
    static deepCopy(data: unknown): any {
        return JSON.parse(JSON.stringify(data));
    }

    /**
     * Checks whether data within the objects are the same
     * @param data1 First data to compare
     * @param data2 Second data to compare
     * @returns Whether provided data are equal
     */
    static areEqual(data1: unknown, data2: unknown): boolean {
        return JSON.stringify(data1) === JSON.stringify(data2);
    }

    /**
     * Sanitizes the provided input
     * @param input The input to be sanitized
     */
    static sanitize(input: string): string {
        return input ? input.replace(/(<([^>]+)>)/gi, '') : '';
    }
}
