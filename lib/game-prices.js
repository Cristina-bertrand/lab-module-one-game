function GamePrices() {
  this.dishes = [];
  this.dishesBoard = [];
  this.randomIndex = [];
  this.level = "";
  this.restaurantSearch = '';
  this.selectedDishes = [];
  this.pairsClicked = 0;
  this.correctPairs = 0;
}

//función ready

//  

// ready

var gamePrices = new GamePrices();

$(function() {
  dataset.forEach(function(dish) {
    gamePrices.dishes.push(new Dish(dish));

$('#dishes-game').hide();
$('#prices-game').hide();
$('#restaurant-game').hide();

});

  });

//evento onclick menú de inicio precios

  $('.button-prices').on('click', function() {
    $('#menu').hide();
    $('#prices-game').show();
    $('#dishes-game').hide();
    $('#home').hide();

  GamePrices.prototype.createPricesBoard();

  });

//seleccionar un restaurante random

GamePrices.prototype.getRandomRestaurant = function() {
  var random = Math.floor(Math.random() * this.dishes.length);
  this.randomIndex.push(random);
  this.dishesBoard.push(this.dishes[random]);
  console.log('Random = ' + random);
  console.log(this.dishes[random]);

  this.restaurantSearch = this.dishes[random].restaurant;
  console.log('El restaurante buscado es: ' + this.restaurantSearch);

};


//conseguir los platos de un restaurante

GamePrices.prototype.getRestaurantDishes =function() {
  for (var i = 0; i < this.dishes.length; i++) {
    if (this.dishes[i].restaurant.indexOf(this.restaurantSearch) !== -1) {
      this.dishesBoard.push(this.dishes[i]);
    }else {
  console.log ("el restaurante no tiene más platos");
  }
}
};

//crear el Board

GamePrices.prototype.createPricesBoard = function () {
  for (var i = 0; i<1; i++) {
  gamePrices.getRandomRestaurant();
  gamePrices.getRestaurantDishes();
}

  gamePrices.paintDishes();
  this.restaurantSearch = '';
  this.randomIndex = '';
};

//pintar los dos Platos

GamePrices.prototype.paintDishes = function() {
  var dishLength;

  for (i = 0; i < this.dishesBoard.length; i++) {
    // $('<div class="dish_blocks" />').appendTo('.dishes_board');
    $('<div class="dish"/>').text(this.dishesBoard[i].name).appendTo('.dishes_board');
    dishLength = $('.dish');
    $('<div class="back">', {
      style: ""
    }).appendTo(dishLength[i]);
    $('.dish .back').attr('style', "display: block");
    $('<div class="front">', {
      style: ""
    }).appendTo(dishLength[i]);
    console.log("hemos pintado un div por item");
  }
  console.log(dishLength);
  for (var i = 0; i < this.dishesBoard.length; i++) {
    $('.front', dishLength[i]).attr('style', "background-image: url(" + "./images/" + this.dishesBoard[i].image + "); display: none");
    console.log("hemos pintado una imagen por item");
  }


};

//pintar los Precios

GamePrices.prototype.paintPrices = function() {
  $('<div class="restaurant-name" />').text(this.dishesBoard[i].restaurant).appendTo('.prices-board');
  for (i = 0; i < this.dishesBoard.length; i++) {
    $('<div class="dish"/>').text(this.dishesBoard[i].price).appendTo('.prices-board');

    console.log("hemos pintado los precios de cada div");
  }
  };
