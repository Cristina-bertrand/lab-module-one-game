function Game() {
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
    //$('<div class="dish_blocks" />').appendTo('.dishes_board');
    $('<div class="dish dish_back dish_front" />').appendTo('.dishes_board');
    $('<div class="name" />').text(this.dishesBoard[i].name).appendTo('.dishes_board');
    $('.dish_front').append('<img src="this.dishesBoard[i].image" />');


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



  });

//evento onclick menú de inicio

$('.button-dishes').on('click', function() {
  $('#menu').hide();
  $('#dishes-game').removeClass('hidden');

Game.prototype.createBoard();

});

$('.button-prices').on('click', function() {
  $('#menu').hide();
  $('#prices-game').removeClass('hidden');
  $('#dishes-game').hide();

Game.prototype.createBoard();

});

$('.button-restaurants').on('click', function() {
  $('#menu').hide();
  $('#restaurant-game').removeClass('hidden');
  $('#dishes-game').hide();
  $('#prices-game').hide();

  Game.prototype.createBoard();

});

//function clic para los Platos

$('.dish').on('click', function(){
  var back= $(this).find('.dish_back');
  var frontStyle= $(this).find(".dish_front").attr('style');
  $(back).attr('style', frontStyle);
});

Game.prototype.selectedDishes = function() {

   // Determinamos si ya había un elemento guardado en la primera posición del array selectedDishes
     if (game.selectedDishes[0] === undefined) {
       // Si no había ningún elemento guardado, guardamos el objeto
       game.selectedDishes[0] = $(this);

       // Damos la vuelta a la primera carta para mostrar el front
    //   $(this).children('.dish_front').show();
    //   $(this).children('.dish_back').hide();
       voltearFront( game.selectedDishes[0] );

     } else {
       // Si había un elemento guardado, guardamos el nuevo objeto en la segunda posición
      game.selectedDishes[1] = $(this);
      // Damos la vuelta a la segunda carta para mostrar el front
       //$(this).children('.front').show();
      // $(this).children('.back').hide();
       voltearFront( game.selectedDishes[1]);

         // Comparamos los atributos name de los 2 objetos guardados
         if (game.selectedDishes[0].children(".back").attr("name") === game.selectedDishes[1].children(".back").attr("name")) {
           // Si son iguales
           game.correctPairs++;
           // Bloqueamos las cartas para siempre
           game.selectedDishes[0].addClass( ".blocked" );
           game.selectedDishes[1].addClass( ".blocked" );
           // Vaciamos array
           game.selectedDishes= [];
         } else {
           // Si son distintos
           $('.dish').addClass( ".blocked" );
           setTimeout(
             function() {
               // Damos la vuelta a las 2 cartas para mostrar el back
               voltearBack( game.selectedDishes[0] );
               voltearBack( game.selectedDishes[1] );
               game.selectedDishes= [];
               $('.dish').removeClass( ".blocked" );
             }, 1000);
             game.selectedDishes[0].removeClass( ".blocked" );
             game.selectedDishes[1].removeClass( ".blocked" );
         }
       game.pairsClicked++;
     }

     // Mostramos el Pairs Clicked y el Pairs Guessed actualizados
     $('#pairs_clicked').text(game.pairsClicked);
     $('#pairs_guessed').text(game.correctPairs);

//});
};
/*

*/
