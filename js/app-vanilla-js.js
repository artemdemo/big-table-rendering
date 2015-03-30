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
	 * Step index
	 */
	var stepIndex = 1;

	/**
	 * How much rows will be printed in each step
	 */
	var stepAmount = 100;

	/**
	 * Dom element of the table body
	 */
	var $tableBody;

	/**
	 * Template for row in the data table
	 */
	var tableStringTmpl = [
		'<tr>',
			'<th>%index%</th>',
			'<td>%name%</td>',
			'<td>%price%</td>',
			'<td>%tax%</td>',
			'<td>%qty%</td>',
		'</tr>'
	].join('');

	/*
	 * Initialisaion
	 */
	this.init = function () {
		var searchForm;

		loadData(function(){
			outputData();
			//$tableBody = $('#dataTable').find('tbody');
			$tableBody = document.getElementById('dataTable').getElementsByTagName('tbody')[0];

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

	}

	/**
	 * Printing data
	 */
	function outputData () {
		setTimeout(function(){
			printNextStep();
		});
	}

	/**
	 * Definition of how to print each group
	 */
	function printNextStep () {
		var fragment, product;
		var tr, th, td;
		var start, finish;
		
		finish = stepIndex * stepAmount - 1;
		finish = finish > dataObjectLength ? dataObjectLength : finish + 1;
		start = (stepIndex - 1) * stepAmount;

		// Creating fragment that will be hold next group of rows
		fragment = document.createDocumentFragment();

		for( var i=start; i < finish; i++) {
			product = dataObject.products[i];
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

		if (stepIndex * stepAmount < dataObjectLength + stepAmount) {
			outputData();
		} else {
			console.log('%cTable is ready', 'font-weight: 700');
			stepAmount = 100;
			stepIndex = 1;
		}
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



window.onload = function(){
	var bData = new BigData();
	bData.init();
};