var BigData = function () {

	/**
	 * Main data object
	 */
	var dataObject = {
		products: []
	};

	/**
	 * Fetching deep data from objects is resource consuming operation, therefore it is better to store it in the variable
	 */
	var dataObjectLength;

	/**
	 * Main print object
	 */
	var printWorker;


	/*
	 * Initialisaion
	 */
	this.init = function () {
		var searchForm;

		printWorker = new PrintWorker();
		printWorker.init();

		loadData(function(){
			printWorker.outputData( dataObject.products );

			searchForm = document.forms[0];
			searchForm.addEventListener("submit", function(evt){
				evt.preventDefault();
				searchFor( searchForm.elements['query'].value );
			});
		});
	}

	/**
	 * Proceede search in array
	 */
	function searchFor ( query ) {
		var product;
		var results = [];

		console.log( "Search for -> " + query );

		for (var i = 0; i < dataObjectLength; i++) {
			product = dataObject.products[i];
			if ( product.name.indexOf( query ) > -1 ) results.push( product );
		};

		console.log( results );
		printWorker.outputData( results );
	}
	

	/*
	 * Loading table data
	 */
	function loadData ( callback ) {
		var request = new XMLHttpRequest();
		request.open('GET', '../json/products.json', true);

		console.log( request );

		request.onload = function() {
			if (request.status >= 200 && request.status < 400) {
				// Success!
				dataObject = JSON.parse(request.responseText);
				dataObjectLength = dataObject.products.length;
				callback();
			} else {
				// We reached our target server, but it returned an error
			}
		};

		request.onerror = function() {
			// There was a connection error of some sort
		};

		request.send();
	}
}


/************************************************************************
 * Print worker knows how to print big amount of data
 */
function PrintWorker () {

	/**
	 * Main property that contain array of data
	 */
	var arrayOfData;

	/**
	 * Fetching deep data from objects is resource consuming operation, therefore it is better to store it in the variable
	 */
	var arrayOfDataLength;

	/**
	 * Step index
	 */
	var stepIndex = 1;

	/**
	 * How much rows will be printed in each step
	 */
	var stepAmount = 100;

	/**
	 * Dom element of the table
	 */
	var $table;

	/**
	 * Dom element of the table body
	 */
	var $tableBody;

	this.init = function() {
		$table = document.getElementById('dataTable');
	}

	/**
	 * Printing data
	 */
	this.outputData = function ( newArrayOfData ) {
		var $tbody;
		arrayOfData = newArrayOfData;
		arrayOfDataLength = newArrayOfData.length;

		$tbody = $table.getElementsByTagName('tbody')[0];
		$tbody.parentNode.removeChild($tbody);
		$tbody = document.createElement('tbody');
		$table.appendChild( $tbody );

		$tableBody = $table.getElementsByTagName('tbody')[0];

		printNextStep();
	}

	/**
	 * Definition of how to print each group
	 */
	function printNextStep () {
		var fragment, product;
		var tr, th, td;
		var start, finish;
		
		finish = stepIndex * stepAmount - 1;
		finish = finish > arrayOfDataLength ? arrayOfDataLength : finish + 1;
		start = (stepIndex - 1) * stepAmount;

		// Creating fragment that will be hold next group of rows
		fragment = document.createDocumentFragment();

		for( var i=start; i < finish; i++) {
			product = arrayOfData[i];
			tr = document.createElement('tr');
			th = document.createElement('th');
			th.appendChild(document.createTextNode( i.toString() ));
			tr.appendChild( th );

			td = document.createElement('td');
			td.appendChild(document.createTextNode( product.name ));
			tr.appendChild( td );
			td = document.createElement('td');
			td.appendChild(document.createTextNode( product.price ));
			tr.appendChild( td );
			td = document.createElement('td');
			td.appendChild(document.createTextNode( product.tax ));
			tr.appendChild( td );
			td = document.createElement('td');
			td.appendChild(document.createTextNode( product.quantity ));
			tr.appendChild( td );

			fragment.appendChild( tr );
		}

		$tableBody.appendChild( fragment );

		stepIndex++;

		if (stepIndex * stepAmount < arrayOfDataLength + stepAmount) {
			setTimeout(function(){
				printNextStep();
			});
		} else {
			console.log('%cTable is ready', 'font-weight: 700');
			stepAmount = 100;
			stepIndex = 1;
		}
	}

}


/************************************************************************
 * Let's go!
 */
window.onload = function(){
	var bData = new BigData();
	bData.init();
};