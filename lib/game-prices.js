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
    $('<div class="dish"/>').appendTo('.prices-dishes-board');
    dishLength = $('.dish');
    $('<div class="back">', {style: ""}).appendTo(dishLength[i]);
    $('.dish .back').attr('style', "display: block");
    $('.back', dishLength[i]).attr('name', gamePrices.dishesBoard[i].name);
    $('<div class="front">', {style: ""}).appendTo(dishLength[i]);
    console.log("hemos pintado un div por item");
  }
  console.log(dishLength);
  for (var i = 0; i < this.dishesBoard.length; i++) {
    $('.front', dishLength[i]).attr('style', "background-image: url(" + "./images/" + this.dishesBoard[i].image + "); display: none");
    $('.front', dishLength[i]).attr('name', gamePrices.dishesBoard[i].name);
    console.log("hemos pintado una imagen por item");
  }


  // START GAME : click on card event
  $(".back").on('click', function() {
    console.log('Entro en el click del div back');
    // variables and functions
    var nameDish = $(this).attr("name");
    var dishesToBeTurned = $(".wrongClicked");
    var block = function() {
      $(".front, .back ").addClass("blocked");
    };
    var unblock = function() {
      $(".front, .back ").removeClass("blocked");
    };
    var victoryMessage = function() {
      $(".dish").remove();
      $(".prices-dishes-board").text("NEXT LEVEL!");
    };


    // show image of card aka flip
    $(this).hide();
    $(this).next().addClass("back");
    $(this).next(".front, .back").css("display", "block");


    // adds a class to the clicked card to remove later
    $(this).addClass("marked");

    // save card name in array
    gamePrices.pickDish(nameDish);

    // check how many cards in array
    if (gamePrices.selectedDishes.length == 2) {
      // block click possibility, will unblock after 1 sec
      block();
      setTimeout(unblock, 1000);

      // if cards are equal
      if (gamePrices.compareDishes()) {
        $(".marked").removeClass("marked");

        // if all pairs are found
        if (gamePrices.winCheck()) {
          victoryMessage();
        }
      }
      // if cards are no match, flip the cards again after 1 sec
      else {
        var hideDishes = function() {
          $(".marked").show();
          $(".marked").next().hide();
          //$(".back").next().hide();
        };

        setTimeout(hideDishes, 1000);
      }

      // updates scoreboard
      $("#pairs_guessed").text(gamePrices.correctPairs);
      $("#pairs_clicked").text(gamePrices.pairsClicked);
    }

  });

  };



  //función añadir los platos al array de platos vacios
  GamePrices.prototype.pickDish = function(dish) {
  this.selectedDishes.push(dish);
  };

  //funcion comparar los dishes

  GamePrices.prototype.compareDishes = function() {
  this.pairsClicked++;
  if (this.selectedDishes[0] === this.selectedDishes[1]) {
    this.correctPairs++;
    this.selectedDishes = [];

    return true;
  } else {
    this.wrongPairs++;
    this.selectedDishes = [];
    return false;
  }
  };

  //función fin del nivel ¿¿¿¿¿como hacer que recargue el panel con nuevos niveles?

  GamePrices.prototype.winCheck = function() {
  if (this.correctPairs === 3) {
    return true;
  }
  };
