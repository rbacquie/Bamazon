var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    password: 'Fuckyounow24_',
    database: 'bamazonDB'

});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
});


// this function checks to make sure the number entered it a number and a positive number 
function validateInput(value) {
	var integer = Number.isInteger(parseFloat(value));
	var sign = Math.sign(value);

	if (integer && (sign === 1)) {
		return true;
	} else {
		return 'Enter a number or one greater than 0';
	}
}

// this function gets the input from the customer, full fill customers order
// reduces inventory,  displays total cost. and runs the store again
function runStore() {
    inquirer
        .prompt([
			{
                name: "id",
                type: "input",
                message: "Please Provide the Product ID you desire",
                validate: validateInput,
                filter: Number
            },

            {
                name: "quantity",
                type: "input",
                message: "How many do you want? ",
                validate: validateInput,
                filter: Number
			}

		]).then(function (user) {
            var item = user.id;
            var quantity = user.quantity;

            // console / log(item);
			// console.log(quanity);
			
			// turn query string into a variable 
            var querySelect = 'SELECT * FROM products WHERE ?';

            connection.query(querySelect, {item_id: item}, function (err, res) {
			if (err) throw err;
			
			//checks to see it the item selected is an item
			if (res.length === 0) {
				console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
				currentStock();

			} else {
				var order = res[0];

				// checks if quantity is in stock and if so process the order and i not informs customer and reloads
				if (quantity <= order.quantity) {
					console.log('The product you requested is in stock! Placing order!');

					// tur
					var queryUpdate = 'UPDATE products SET quantity = ' + (order.quantity - quantity) + ' WHERE item_id = ' + item;


					// Update the inventory and updates the customer
					connection.query(queryUpdate, function(err, res) {
						if (err) throw err;

						console.log('Your oder has been placed! Your total is $' + order.price * quantity);
						console.log('Thank you for shopping with us!');
						console.log("\n---------------------------------------------------------------------\n");

						// calls the runAgain function
						runAgain();
					})
				} else {
					console.log('Sorry, we do not have the desired quantity, your order can not be placed');
					console.log('Please please update your order.');
					console.log("\n---------------------------------------------------------------------\n");

					currentStock();
				}
			}
		})
	})
}

// this function will ask the custoemr if they would like to re-order from the available inventory
function runAgain () {

	inquirer.prompt([
	{
		type: "confirm",
		name: "reorder",
		message: "Would you like to order again?",
		default: true
	  }
	])
	.then(function(input) {
	  // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
	  if (input.reorder) {

		// runs currentStock function
		runBamazon();
	  }
	  else {
		console.log("\nThank you for your business have a nice day!");
		console.log("--------------------------------------------\n");
		connection.end();
	  }
	});
}

// currentStock will display the available inventory from the database and display inventory
function currentStock() {

	queryStr = 'SELECT * FROM products';


	connection.query(queryStr, function(err, res) {
		if (err) throw err;

		console.log('Current Inventory: ');
		console.log('...................\n');

		var invDisplay = '';
		for (var i = 0; i < res.length; i++) {
			invDisplay = '';
			invDisplay += 'Item ID: ' + res[i].item_id + '  //  ';
			invDisplay += 'Product Name: ' + res[i].product + '  //  ';
			invDisplay += 'Department: ' + res[i].department + '  //  ';
			invDisplay += 'Price: $' + res[i].price + '  //  ';
			invDisplay += 'Quantity: ' + res[i].quantity + '\n';

			console.log(invDisplay);
		}

	  	console.log("---------------------------------------------------------------------\n");

	  	//Prompt the user for item/quantity they would like to purchase
	  	runStore();
	})
}

function runBamazon() {
	// console.log('___ENTER runBamazon___');

	// Display the available inventory
	currentStock();
}

// Run the application logic
runBamazon();