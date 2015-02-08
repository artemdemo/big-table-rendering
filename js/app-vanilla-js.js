/**
 * @class BigData
 */
var BigData = (function () {
    /**
     * @constructor
     * @memberof BigData
     */
    function BigData() {
        /**
         * Main data object
         * @memberof BigData
         * @private
         * @type {Object}
         */
        this.dataObject = {
            products: []
        };
        /**
         * Step index
         *
         * @memberof BigData
         * @private
         * @type {Number}
         */
        this.index = 1;
        /**
         * How much rows will be printed in each step
         *
         * @memberof BigData
         * @private
         * @type {Number}
         */
        this.stepAmount = 100;
        /**
         * Template for row in the data table
         *
         * @memberof BigData
         * @private
         * @type {String}
         */
        this.tableStringTmpl = [
            '<tr>',
            '<th>%index%</th>',
            '<td>%name%</td>',
            '<td>%price%</td>',
            '<td>%tax%</td>',
            '<td>%qty%</td>',
            '</tr>'
        ].join('');
        this.loadData("../json/products.json", this.outputData);
        this.$tableBody = $('#dataTable').find('tbody');
    }
    /**
     * Printing data
     *
     * @function outputData
     * @memberof BigData
     */
    BigData.prototype.outputData = function () {
        var _this = this;
        setTimeout(function () { return _this.printGroup(); });
    };
    /**
     * Definition of how to print each group
     *
     * @function printGroup
     * @memberof BigData
     */
    BigData.prototype.printGroup = function () {
        var _this = this;
        var start, finish;
        finish = this.index * this.stepAmount - 1;
        finish = finish > this.dataObject.products.length ? this.dataObject.products.length : finish + 1;
        start = (this.index - 1) * this.stepAmount;
        for (var i = start; i < finish; i++) {
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
        setTimeout(function () { return _this.printGroup(); });
    };
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
    BigData.prototype.loadData = function (strUrl, callback) {
        var _this = this;
        $.getJSON(strUrl, function (data) {
            _this.dataObject = data;
            callback.apply(_this); // Call callback in context of current object
        });
    };
    return BigData;
})();
window.onload = function () {
    var bData = new BigData();
};
//# sourceMappingURL=app-vanilla-js.js.map