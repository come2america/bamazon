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
  // console.log('The connection is: good ' + connection.threadId);
  start()
  
});
console.log( "Welcome to the Liquors Store Black Market")
function start() {
  inquirer
    .prompt({
      name: "start",
      type: "rawlist",
      message: "Would you like to [Enter] or [Exit] the store?",
      choices: ["Enter", "EXit"]
    })
    .then(function (answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.start === "Enter") {
        showproducts();
      }
      else {
       connection.end()
      }
    });
}

// function to handle posting new items up for auction


function showproducts() {
  var choiceArray = []
  var price = ""
    ;// query the database for all items being auctioned
  connection.query("SELECT * FROM products", function (err, results) {
    if (err) throw err;
    for (var i = 0; i < results.length; i++) {
      choiceArray.push(results[i].product_name);
     
    }
    
   
    inquirer
      .prompt([
        {
          name: "choice",
          type: "list",
          message: "What Item Do u Want TO bUY?",
          choices: choiceArray

        },
        {
          name: "amount",
          type: "input",
          message: "How much would you like to buy?"
        },

        // {
        //   name: "price",
        //   type: "confirm",
        //   message: "that will be   " + price,


        // },


      ])
      .then(function (answer) {

        // get the information of the chosen item
        var chosenItem = answer.choice;
        var howmany = answer.amount



        var query = ("UPDATE products  SET  stock_quantity = stock_quantity - 1 WHERE product_name = ? and stock_quantity > 0");
        connection.query(query, [chosenItem], function () {

          console.log("sold")

        })
        var query=("SELECT price FROM products WHERE product_name = ?")
        connection.query(query,[chosenItem], function (err, results) {
          if (err) throw err;
          // console.log(results)
          var cost = Number(results[0].price)
          console.log("That Will be  "+ howmany +"  " + chosenItem + "  for   $" + (howmany * cost))
        })
      })


  },

  )
}


