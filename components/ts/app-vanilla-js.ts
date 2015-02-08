declare var $: any;

/**
 * @class BigData
 */
class BigData {

    /**
     * Main data object
     * @memberof BigData
     * @private
     * @type {Object}
     */
    dataObject = {
        products: []
    };

    /**
     * Step index
     *
     * @memberof BigData
     * @private
     * @type {Number}
     */
    index = 1;

    /**
     * How much rows will be printed in each step
     *
     * @memberof BigData
     * @private
     * @type {Number}
     */
    stepAmount = 100;

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
    tableStringTmpl = [
        '<tr>',
            '<th>%index%</th>',
            '<td>%name%</td>',
            '<td>%price%</td>',
            '<td>%tax%</td>',
            '<td>%qty%</td>',
        '</tr>'
    ].join('');

    /**
     * @constructor
     * @memberof BigData
     */
    constructor() {
        this.loadData("../json/products.json", this.outputData);
        this.$tableBody = $('#dataTable').find('tbody');
    }

    /**
     * Printing data
     *
     * @function outputData
     * @memberof BigData
     */
    outputData() {
        setTimeout( () => this.printGroup() );
    }

    /**
     * Definition of how to print each group
     *
     * @function printGroup
     * @memberof BigData
     */
    printGroup() {
        var start, finish;
        finish = this.index * this.stepAmount - 1;
        finish = finish > this.dataObject.products.length ? this.dataObject.products.length : finish + 1;
        start = (this.index - 1) * this.stepAmount;

        for( var i=start; i < finish; i++) {
            var product = this.dataObject.products[i];
            var newRow = this.tableStringTmpl;
            newRow = newRow.replace('%index%', i.toString());
            newRow = newRow.replace('%name%', product.name);
            newRow = newRow.replace('%price%', product.price);
            newRow = newRow.replace('%tax%', product.tax);
            newRow = newRow.replace('%qty%', product.quantity);
            this.$tableBody.append(newRow);
        }

        this.index++;
        setTimeout( () => this.printGroup() );
    }

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
    loadData( strUrl:string, callback ) {
        $.getJSON(strUrl, ( data ) => {
            this.dataObject = data;
            callback.apply(this); // Call callback in context of current object
        });
    }
}

window.onload = function(){
    var bData = new BigData();
};