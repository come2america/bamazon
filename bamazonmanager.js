var mysql = require('mysql');
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'bamazon'
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The connection is: good ' + connection.threadId);
  start()
  
});
function start() {
    inquirer
      .prompt({
        name: "start",
        type: "rawlist",
        message: "Would you like to do in the store?",
        choices: ["View_Products_for_Sale", "View_Low_Inventory","Add_to_Inventory", "Add_New_Product" ]
      })
      .then(function (answer) {
        // based on their answer, either call the bid or the post functions
        if (answer.start === "View_Products_for_Sale") {
          showproducts();
        }

        else if (answer.start === "View_Low_Inventory") {
            lowproducts();
          }
  
        else {
         connection.end()
        }
      });
  }

  function showproducts() {
    var choiceArray = []
    var price = ""
      ;// query the database for all items being auctioned
    connection.query("SELECT ID, product_name, price, stock_quantity FROM products", function (err, results) {
      if (err) throw err;
      for (var i = 0; i < results.length; i++) {
        choiceArray.push(results[i].product_name);
  console.log("ID:  "+results[i].ID +"\n"
              + "Product_ Name:  "+ results[i].product_name +"\n"
              + "Price:  "+ results[i].price +"\n"
              + "Stock_Quantity:  "+ results[i].stock_quantity +"\n" )     
      }

    })}

   
  function lowproducts() {
    
      ;// query the database for all items being auctioned
    connection.query("SELECT ID, product_name, price, stock_quantity FROM products WHERE stock_quantity < 5", function (err, results) {
        for (var i = 0; i < results.length; i++) {
        console.log("ID:  "+results[i].ID +"\n"
        + "Product_ Name:  "+ results[i].product_name +"\n"
        + "Price:  "+ results[i].price +"\n"
        + "Stock_Quantity:  "+ results[i].stock_quantity +"\n" )  }   
})}