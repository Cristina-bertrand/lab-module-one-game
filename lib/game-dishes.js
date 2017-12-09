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
    if (this.dishes[i].name.indexOf(this.dishSearchWord) !== -1){
        this.dishesBoard.push(this.dishes[i]);
        break;
    }  else {
  console.log ("el plato es igual y no hay mas");
    }
  }
};

//crear el board  ¿¿¿como no pintarlos en orden???

GameDishes.prototype.createBoard = function () {
  for (var i = 0; i<2; i++) {
  gameDishes.getRandomDish(i);
  gameDishes.searchEqual(i);
  gameDishes.paintDishes(i);}
  this.dishSearchWord = '';
  this.randomIndex = '';
};


//pintar los dos Platos ¿¿¿¿¿¿por qué no pinta front????

GameDishes.prototype.paintDishes = function() {

/*
gameDishes.dishesBoard.forEach(function(pic, index) {
  var sanitizedName = pic.name.split(' ').join('_');

  html += '<div class= "dish" name="dish_' + sanitizedName + '">';
  html += '<div class="back"';
  html += '    name="' + pic.name + '">';
  html += '</div>';
  html += '<div class="front" ';
  html += 'style="background: url(img/' + pic.img + ') no-repeat"';
  html += '    name="'       + pic.name +  '">';
  html += '</div>';
  html += '</div>';
});

// Add all the divs to the HTML
document.getElementById('memory_board').innerHTML = html;
*/

//mi opción
for (i = 0; i < this.dishesBoard.length; i++) {
  //$('<div class="dish_blocks" />').appendTo('.dishes_board');
  $('<div class=" back name" />').text(this.dishesBoard[i].name).appendTo('.dishes_board');
  $('.front').append(src="" + this.dishesBoard[i].imagen + "");
  console.log("hemos pintado un div por item");
}
};

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

//evento onclick menú de inicio

$('.button-dishes').on('click', function() {
  $('#menu').hide();
  $('#dishes-game').show();
  $('#home').hide();

GameDishes.prototype.createBoard();

});

$('.button-prices').on('click', function() {
  $('#menu').hide();
  $('#prices-game').show();
  $('#dishes-game').hide();
  $('#home').hide();

GameDishes.prototype.createBoard();

});

$('.button-restaurants').on('click', function() {
  $('#menu').hide();
  $('#restaurant-game').show();
  $('#dishes-game').hide();
  $('#prices-game').hide();
  $('#home').hide();

  GameDishes.prototype.createBoard();

});

/*//función seleccionar los platos
GameDishes.prototype.clickFirstDish = function () {
$('.dish').click(function(){
  $(".dish_back").hide();
});
};

GameDishes.prototype.clickSecondDish = function () {
$('.dish').click(function(){
  $(".dish_back").show();
});
};
*/

//función añadir los platos al array de platos vacios
GameDishes.prototype.pickDish = function (dish) {
    this.selectedDishes.push(dish);
    };

//funcion comparar los dishes

 GameDishes.prototype.compareDishes = function () {
   this.pairsClicked++;
   if (this.selectedCards[0] === this.selectedCards[1]) {
     this.correctPairs++;
     this.selectedCards = [];
     return true;
   }
   else {
     this.wrongPairs++;
     this.selectedCards = [];
     return false;
   }
 };

//función fin del nivel ¿¿¿¿¿como hacer que recargue el panel con nuevos niveles?

GameDishes.prototype.winCheck = function () {
   if (this.correctPairs === 3) {
    return true;
   }
  };

  // START GAME : click on card event
    $(".back").click(function(){

      // variables and functions
      var nameDish = $(this).attr("name");
      var dishesToBeTurned = $(".wrongClicked");
      var block = function () {$(".back, .front").addClass("blocked");};
      var unblock = function () {$(".back, .front").removeClass("blocked");};
      var victoryMessage = function () {$(".dish").remove(); $("#dishes_board").text("NEXT LEVEL!");};


      // show image of card aka flip
      $(this).hide();
      $(this).next().addClass("back");

      // adds a class to the clicked card to remove later
      $(this).addClass("marked");

      // save card name in array
      gameDishes.pickedDish(nameDish);

      // check how many cards in array
      if (gameDishes.selectedCards.length == 2) {
        // block click possibility, will unblock after 1 sec
        block();
        setTimeout(unblock, 1000);

        // if cards are equal
        if(gameDishes.compareDishes()) {
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
            };

        setTimeout(hideCards, 1000);
        }

        // updates scoreboard
        $("#pairs_guessed").text(gameDishes.correctPairs);
        $("#pairs_clicked").text(gameDishes.pairsClicked);
      }

  });
