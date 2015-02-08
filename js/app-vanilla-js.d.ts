/**
 * @class BigData
 */
declare class BigData {
    /**
     * Main data object
     * @memberof BigData
     * @private
     * @type {Object}
     */
    dataObject: {
        products: any[];
    };
    /**
     * Step index
     *
     * @memberof BigData
     * @private
     * @type {Number}
     */
    index: number;
    /**
     * How much rows will be printed in each step
     *
     * @memberof BigData
     * @private
     * @type {Number}
     */
    stepAmount: number;
    /**
     * Dom element of the table body
     *
     * @memberof BigData
     * @private
     * @type {Object}
     */
    $tableBody: any;
    /**
     * Template for row in the data table
     *
     * @memberof BigData
     * @private
     * @type {String}
     */
    tableStringTmpl: string;
    /**
     * @constructor
     * @memberof BigData
     */
    constructor();
    /**
     * Printing data
     *
     * @function outputData
     * @memberof BigData
     */
    outputData(): void;
    /**
     * Definition of how to print each group
     *
     * @function printGroup
     * @memberof BigData
     */
    printGroup(): void;
    /**
     * Loading data from the server
     *
     * @function loadData
     * @memberof BigData
     * @public
     * @param strUrl
     * @param callback
     * @return {any} Promise
     * @descritpion
     * Return promise
     */
    loadData(strUrl: string, callback: any): void;
}
