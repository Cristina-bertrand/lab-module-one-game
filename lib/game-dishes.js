//¿por qué los botones no entran en menú-blocks?
//¿cómo se pueden meter las letras del comidillas en la imagen?
//¿alinear los botones?
//cambiar tamaño de caja de búsqueda?

function GameDishes() {
  this.dishes = [];
  this.dishesBoard = [];
  this.randomIndex = [];
  this.level = "";
  this.dishSearchWord = '';
  this.selectedDishes = [];
  this.pairsClicked = 0;
  this.correctPairs = 0;
}

// ready

var gameDishes = new GameDishes();

$(function() {
  dataset.forEach(function(dish) {
    gameDishes.dishes.push(new Dish(dish));

    $('#dishes-game').hide();
    $('#prices-game').hide();
    $('#restaurant-game').hide();

  });

});

//evento onclick menú de inicio platos

$('.button-dishes').on('click', function() {
  $('#menu').hide();
  $('#dishes-game').show();
  $('#home').hide();

  gameDishes.createDishesBoard();

});

//generar un plato random

GameDishes.prototype.getRandomDish = function() {
  var random = Math.floor(Math.random() * this.dishes.length);
  this.randomIndex.push(random);
  this.dishesBoard.push(this.dishes[random]);
  console.log('Random = ' + random);
  console.log(this.dishes[random]);

  this.dishSearchWord = this.dishes[random].name.split(' ')[0];
  console.log('La palabra de búsqueda es: ' + this.dishSearchWord);

};

//encontrar un plato igual y meterlo en dishesBoard

GameDishes.prototype.searchEqual = function() {
  for (var i = 0; i < this.dishes.length; i++) {
    if (this.dishes[i].name.indexOf(this.dishSearchWord) !== -1) {
      this.dishesBoard.push(this.dishes[i]);
      break;
    } else {
      console.log("el plato es igual y no hay mas");
    }
  }
};

//desordenar los platos seleccionados

GameDishes.prototype.shuffleDishes = function() {
  this.dishesBoard.sort(function() {
    return Math.random() - 0.5;
  });
};

//crear el board  ¿¿¿como pintarlos una vez???¿¿¿saltando el orden?

GameDishes.prototype.createDishesBoard = function() {
  for (var i = 0; i < 3; i++) {
    gameDishes.getRandomDish();
    gameDishes.searchEqual();
  }

  gameDishes.shuffleDishes();
  gameDishes.paintDishes();
  this.dishSearchWord = '';
  this.randomIndex = '';
};



//pintar los dos Platos e interactuar con ellos

GameDishes.prototype.paintDishes = function() {
  var dishLength;

  for (i = 0; i < this.dishesBoard.length; i++) {
    // $('<div class="dish_blocks" />').appendTo('.dishes_board');
    $('<div class="dish"/>').appendTo('.dishes_board');
    dishLength = $('.dish');
    $('<div class="back">', {style: ""}).appendTo(dishLength[i]);
    $('.dish .back').attr('style', "display: block");
    $('.back', dishLength[i]).attr('name', gameDishes.dishesBoard[i].name);
    $('<div class="front">', {style: ""}).appendTo(dishLength[i]);
    console.log("hemos pintado un div por item");
  }
  console.log(dishLength);
  for (var i = 0; i < this.dishesBoard.length; i++) {
    $('.front', dishLength[i]).attr('style', "background-image: url(" + "./images/" + this.dishesBoard[i].image + "); display: none");
    $('.front', dishLength[i]).attr('name', gameDishes.dishesBoard[i].name);
    console.log("hemos pintado una imagen por item");
  }


  // START GAME : click on card event
  $(".back").on('click', function() {
    console.log('Entro en el click del div back');
    // variables and functions
    var nameDish = $(this).attr("name");
    var dishesToBeTurned = $(".wrongClicked");
    var block = function() {
      $(".back, .front").addClass("blocked");
    };
    var unblock = function() {
      $(".back, .front").removeClass("blocked");
    };
    var victoryMessage = function() {
      $(".dish").remove();
      $("#dishes_board").text("NEXT LEVEL!");
    };


    // show image of card aka flip
    $(this).hide();
    $(this).next().addClass("back");
    $(this).next().css("display", "block");


    // adds a class to the clicked card to remove later
    $(this).addClass("marked");

    // save card name in array
    gameDishes.pickDish(nameDish);

    // check how many cards in array
    if (gameDishes.selectedDishes.length == 2) {
      // block click possibility, will unblock after 1 sec
      block();
      setTimeout(unblock, 1000);

      // if cards are equal
      if (gameDishes.compareDishes()) {
        $(".marked").removeClass("marked");
        
        // if all pairs are found
        if (gameDishes.winCheck()) {
          victoryMessage();
        }
      }
      // if cards are no match, flip the cards again after 1 sec
      else {
        var hideDishes = function() {
          $(".marked").show();
          $(".marked").next().removeClass("back");
          $(".back").next().hide();
        };

        setTimeout(hideDishes, 1000);
      }

      // updates scoreboard
      $("#pairs_guessed").text(gameDishes.correctPairs);
      $("#pairs_clicked").text(gameDishes.pairsClicked);
    }

  });

};



//función añadir los platos al array de platos vacios
GameDishes.prototype.pickDish = function(dish) {
  this.selectedDishes.push(dish);
};

//funcion comparar los dishes

GameDishes.prototype.compareDishes = function() {
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

GameDishes.prototype.winCheck = function() {
  if (this.correctPairs === 3) {
    return true;
  }
};
