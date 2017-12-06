function Game() {
  this.dishes = [];
  this.dishesBoard = [];
  this.randomIndex = [];
  this.level = "";
  this.dishSearchWord = '';
}

//generar un plato random

Game.prototype.getRandomDish = function() {
  var random = Math.floor(Math.random() * this.dishes.length);
  this.randomIndex.push(random);
  this.dishesBoard.push(this.dishes[random]);
  console.log('Random = ' + random);
  console.log(this.dishes[random]);

  this.dishSearchWord = this.dishes[random].name.split(' ')[0];
  console.log('La palabra de búsqueda es: ' + this.dishSearchWord);

};

//encontrar un plato igual y meterlo en dishesBoard

Game.prototype.searchEqual = function() {
  for (var i = 0; i < this.dishes.length; i++) {
    if (this.dishes[i].name.indexOf(this.dishSearchWord) !== -1){
        this.dishesBoard.push(this.dishes[i]);
        break;
    }  else {
  console.log ("el plato es igual y no hay mas");
    }
  }
};

//crear el board

Game.prototype.createBoard = function () {
  for (var i = 0; i<2; i++) {
  game.getRandomDish(i);
  game.searchEqual(i);
  game.paintDishes(i);}
  this.dishSearchWord = '';
  this.randomIndex = '';
};


//pintar los dos Platos

Game.prototype.paintDishes = function() {
  for (i = 0; i < this.dishesBoard.length; i++) {
    $('<div class="back" />').text(this.dishesBoard[i]).appendTo('.dishesBoard');
    console.log("hemos pintado un div por item");
  }
};

// ready

var game = new Game();

$(function() {
  dataset.forEach(function(dish) {
    game.dishes.push(new Dish(dish));

$('#dishes-game').addClass('hidden');
$('#prices-game').addClass('hidden');
$('#restaurant-game').addClass('hidden');
});

Game.prototype.createBoard();

  });

//evento onclick menú de inicio

$('.button-dishes').on('click', function() {
  $('#menu').hide();
  $('#dishes-game').removeClass('hidden');
});

$('.button-prices').on('click', function() {
  $('#menu').hide();
  $('#prices-game').removeClass('hidden');
});

$('.button-restaurants').on('click', function() {
  $('#menu').hide();
  $('#restaurant-game').removeClass('hidden');
});
/*

function voltearFront("card") {
card.children(".back").hide();
card.children(".front").show();
}

function voltearBack( card ) {
card.children(".back").show();
card.children(".front").hide();
}
*/
