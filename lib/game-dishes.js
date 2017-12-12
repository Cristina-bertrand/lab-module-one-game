//¿por qué los botones no entran en menú-blocks?
//¿cómo se pueden meter las letras del comidillas en la imagen?
//¿alinear los botones?
//cambiar tamaño de caja de búsqueda?
//<img src="./images/chefimages/chef1.gif" alt="" class="chef-1">

function GameDishes() {
  this.dishes = [];
  this.dishesBoard = [];
  this.randomIndex = [];
  this.level = 3;
  this.dishSearchWord = '';
  this.totallySearchedWords = [];
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

  $('.chef').attr('style', "background-image: url(" + "./images/chefimages/chef1.gif" + ");");

  gameDishes.createDishesBoard();

});

// funcion mostrar platos al principio

GameDishes.prototype.showDishesForAMoment = function() {
    setTimeout(showAtTheStart, 3000);
    setTimeout(hideAfterTheStart, 6000);
};

var showAtTheStart = function() {
  $(".back").hide();
  $(".front").show();
};

var hideAfterTheStart = function() {
  $(".back").show();
  $(".front").hide();
};

//generar un plato random

GameDishes.prototype.getRandomDish = function() {

  var random = Math.floor(Math.random() * this.dishes.length);
  this.randomIndex.push(random);
  this.dishesBoard.push(this.dishes[random]);

  console.log('Random = ' + random);
  console.log(this.dishes[random]);

  this.dishSearchWord = this.dishes[random].name.split(' ')[0];
  console.log('La palabra de búsqueda es: ' + this.dishSearchWord);
  this.totallySearchedWords.push(this.dishSearchWord);

};

//encontrar un plato igual y meterlo en dishesBoard

GameDishes.prototype.searchEqual = function() {
  for (var i = 0; i < this.dishes.length; i++) {
    if (this.dishes[i].name.indexOf(this.dishSearchWord) !== -1) {
      this.dishesBoard.push(this.dishes[i]);
      break;
    } else {
      //this.dishesBoard.pop();
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


//funcion niveles

GameDishes.prototype.selectLevel = function() {
    for (var i = 0; i < 10; i++) {
      if(this.correctPairs < 1){
        this.level = 3;
      } else if (this.correctPairs < 4 && this.correctPairs > 1){
        this.level = 4;
      } else if (this.correctPairs < 7 && this.correctPairs > 4){
        this.level = 5;

      } else {
        console.log("pasé dos niveles");
      }
    }
};



//crear el board

GameDishes.prototype.createDishesBoard = function() {

this.selectLevel();
this.dishesBoard = [];
console.log("el nivel es " + this.level);

  for (var i = 0; i < this.level; i++) {

    this.getRandomDish();
    this.searchEqual();

  }

  this.shuffleDishes();
  this.paintDishes();
  this.showDishesForAMoment();
    this.dishSearchWord = '';
    this.randomIndex = [];
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
      $(".front, .back ").addClass("blocked");
    };
    var unblock = function() {
      $(".front, .back ").removeClass("blocked");
    };
    var victoryMessage = function() {
      $(".dish").remove();

    };


    // show image of card aka flip
    $(this).hide();
    $(this).next().addClass("back");
    $(this).next(".front, .back").css("display", "block");


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
          $('<p class="platos-iguales-title">Enhorabuena pero no te confíes ;-)</p>').appendTo('.dishes_board');
          $('<button class="button-next-level">Siguiente Nivel</a>').appendTo('.dishes_board');
          $('.button-next-level').on('click', function() {
            $('.button-next-level').hide();

            gameDishes.createDishesBoard();

          });
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
  if (this.selectedDishes[0].split(' ')[0] === this.selectedDishes[1].split(' ')[0]) {
    this.correctPairs++;
    this.selectedDishes = [];
    $('.chef').attr('style', "background-image: url(" + "./images/chefimages/chef2-1.gif" + ");");
    return true;
  } else {
    this.wrongPairs++;
    this.selectedDishes = [];
    $('.chef').attr('style', "background-image: url(" + "./images/chefimages/chef3-2.gif" + ");");
    return false;
  }
};

//función fin del nivel ¿¿¿¿¿como hacer que recargue el panel con nuevos niveles?

GameDishes.prototype.winCheck = function() {
  if (this.correctPairs === 3) {
    return true;
  }
};
