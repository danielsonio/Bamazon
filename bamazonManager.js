var inquirer = require('inquirer');
var mysql = require('mysql');
var Table = require('cli-table');



//Connects to mySQL server
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'bamazon'
});

connection.connect(function(err) {
  if (err) throw err;
});

// instantiate
var table = new Table({
    head: ['Item ID', 'Product Name', 'Department', 'Price', 'Stock Quantity']
  , colWidths: [15, 15, 15, 15, 15]
});







var start = function() {
  manager();

}


var manager = function() {

  // * List a set of menu options:
  //
  //   * View Products for Sale
  //   * View Low Inventory
  //   * Add to Inventory
  //   * Add New Product
  //
  // * If a manager selects `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities.
  //
  // * If a manager selects `View Low Inventory`, then it should list all items with a inventory count lower than five.
  //
  // * If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.
  //
  // * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.


  inquirer.prompt([
    {
      type: "list",
      message: "Select Action",
      choices: ["View Products for Sale","View Low Inventory","Add to Inventory","Add New Product"],
      name: "choices"
    }

  ]).then(function(answer) {
    if(answer.choices === "View Products for Sale"){
      connection.query("SELECT * FROM products", function(err, res){
        if(err) throw err;
      // table is an Array, so you can `push`, `unshift`, `splice` and friends
        for(var i = 0; i < res.length; i++) {
          table.push(
              [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
          );
        }

        console.log(table.toString());
        connection.end();
      });
    } else if (answer.choices === "View Low Inventory") {
      connection.query("SELECT * FROM products", function(err, res){
        if(err) throw err;
      // table is an Array, so you can `push`, `unshift`, `splice` and friends
        for(var i = 0; i < res.length; i++) {
          if(res[i].stock_quantity < 5) {
            table.push(
                [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
            );
          }
        }
        console.log(table.toString());
        connection.end();
      });
    } else if (answer.choices === "Add to Inventory") {
      addInventory();

    } else if (answer.choices === "Add New Product") {
      newProduct();

    }

  });

}




var newProduct = function() {
  inquirer.prompt([
    {
      type: "input",
      message: "Name of product you want to add: ",
      name: "product",
    },
    {
      type: "input",
      message: "Give it an id number: ",
      name: "id",
      validate: function(value) {
      if (isNaN(value) === false) {
        return true;
      }
      return false;
      }
    },
    {
      type: "input",
      message: "Name of the dept it belongs to: ",
      name: "dept",
    },
    {
      type: "input",
      message: "Quantity to order: ",
      name: "quantity"
    },
    {
      type: "input",
      message: "Set sales price at: ",
      name: "price"
    }
  ]).then(function(answer) {
    connection.query("INSERT INTO products SET ?", {
      item_id: answer.id,
      product_name: answer.product,
      department_name: answer.dept,
      price: answer.price,
      stock_quantity: answer. quantity
    }, function(err) {
      if (err) throw err;
      console.log("Your new item was ordered successfully!");
      connection.end();
    })
  });
}

var addInventory = function() {
  inquirer.prompt([
    {
      type: "input",
      message: "What is the product id number: ",
      name: "id",
      validate: function(value) {
      if (isNaN(value) === false) {
        return true;
      }
      return false;
      }
    },
    {
      type: "input",
      message: "Quantity to order: ",
      name: "quantity"
    }
  ]).then(function(answer) {
    connection.query("SELECT * FROM products WHERE ?", [{
          item_id: answer.id
        }], function(err, res){
          var currentInv = res[0].stock_quantity
          connection.query("UPDATE products SET ? WHERE ?", [{
            stock_quantity: currentInv + parseInt(answer.quantity)
          }, {
            item_id: answer.id
          }], function(error) {
            if (error) throw err;
            console.log("Inventory updated.");
          });
          connection.end();
        });
  });
}





start();
// {
//   type: "input",
//   message: "Enter the id number of the item you would like to buy: ",
//   name: "id",
//   validate: function(value) {
//   if (isNaN(value) === false) {
//     return true;
//   }
//   return false;
// }
