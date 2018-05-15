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


// this function gets the input from the customer, full fill customers order
// reduces inventory,  displays total cost. and runs the store again
function runManagement() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "choices",
                message: "What are you carrying in your hands??",
                choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
            }

        ]).then(function (user) {
            var item = user.choices;

            switch (item) {
                case "View Products for Sale":
                    currentStock();
                    break;

                case "View Low Inventory":
                    lowStock();
                    break;

                case "Add to Inventory":
                    updateInventory();
                    break;

                case "Add New Product":
                    AddNewStock();
                    break;
            }
        })

    function currentStock() {

        queryStr = 'SELECT * FROM products';


        connection.query(queryStr, function (err, res) {
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


        })

    }
    runManagement();
}

function lowStock() {
    connection.query(queryStr, function (err, res) {
        if (err) throw err;

        console.log('Current Inventory: ');
        console.log('...................\n');

        var invDisplay = '';
        for (var i = 0; i < res.length; i++) {
            if (res[i].quantity <= 5) {
                invDisplay = '';
                invDisplay += 'Item ID: ' + res[i].item_id + '  //  ';
                invDisplay += 'Product Name: ' + res[i].product + '  //  ';
                invDisplay += 'Department: ' + res[i].department + '  //  ';
                invDisplay += 'Price: $' + res[i].price + '  //  ';
                invDisplay += 'Quantity: ' + res[i].quantity + '\n';

                console.log(invDisplay);
            } else {
                invDisplay = '';
                invDisplay += 'Item ID: ' + res[i].item_id + '  //  ';
                invDisplay += 'Product Name: ' + res[i].product + '  //  ';
                invDisplay += 'Department: ' + res[i].department + '  //  ';
                console.log(invDisplay + "Stock is in good standing")
            }

            console.log("---------------------------------------------------------------------\n");

        }

    })
}

function updateInventory() {

    inquirer.prompt([
        {
            type: 'input',
            name: 'item',
            message: 'Please enter the item number to update quantity'
        },
        {
            type: 'input',
            name: 'update',
            message: 'Please enter the updated amount'
        }
    ]).then(function(input) {
        var item = input.item;
        var qtyUpdate = input.update;
        var queryUpdate = 'UPDATE products SET quantity = ' + (qtyUpdate + res.quantity) + ' WHERE item_id = ' + item;
        connection.query(queryUpdate, function (err, res) {
            if (err) throw err;

            console.log("The update is registered and the new quantity is " + res.quantity)
    
        })

    })
    runManagement();
}

function AddNewStock() {

    var insert = 'INSERT INTO products where ? and where ? and where and '
} 