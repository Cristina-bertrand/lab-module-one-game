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
// Creamos un evento click
 +  $('.card').click(function() {
 +    $(this).addClass( "blocked" );
 +    // Determinamos si ya había un elemento guardado en la primera posición del array selectedCards
 +    if (memoryGame.selectedCards[0] === undefined) {
 +      // Si no había ningún elemento guardado, guardamos el objeto
 +      memoryGame.selectedCards[0] = $(this);
 +
 +      // Damos la vuelta a la primera carta para mostrar el front
 +      $(this).children('.front').show();
 +      $(this).children('.back').hide();
 +      // voltearFront( memoryGame.selectedCards[0] );
 +
 +    } else {
 +      // Si había un elemento guardado, guardamos el nuevo objeto en la segunda posición
 +      memoryGame.selectedCards[1] = $(this);
 +
 +      // Damos la vuelta a la segunda carta para mostrar el front
 +      $(this).children('.front').show();
 +      $(this).children('.back').hide();
 +
 +
 +
 +        // voltearFront( memoryGame.selectedCards[1]);
 +
 +        // Comparamos los atributos name de los 2 objetos guardados
 +        if (memoryGame.selectedCards[0].children(".back").attr("name") === memoryGame.selectedCards[1].children(".back").attr("name")) {
 +          // Si son iguales
 +          memoryGame.correctPairs++;
 +          // Bloqueamos las cartas para siempre
 +          memoryGame.selectedCards[0].addClass( "blocked-forever" );
 +          memoryGame.selectedCards[1].addClass( "blocked-forever" );
 +          // Vaciamos array
 +          memoryGame.selectedCards= [];
 +        } else {
 +          // Si son distintos
 +          $('.card').addClass( "blocked" );
 +          setTimeout(
 +            function() {
 +              // Damos la vuelta a las 2 cartas para mostrar el back
 +              voltearBack( memoryGame.selectedCards[0] );
 +              voltearBack( memoryGame.selectedCards[1] );
 +              memoryGame.selectedCards= []
 +              $('.card').removeClass( "blocked" );
 +
 +            }, 1000);
 +            memoryGame.selectedCards[0].removeClass( "blocked" );
 +            memoryGame.selectedCards[1].removeClass( "blocked" );
 +        }
 +      memoryGame.pairsClicked++;
 +    }
 +
 +    // Mostramos el Pairs Clicked y el Pairs Guessed actualizados
 +    $('#pairs_clicked').text(memoryGame.pairsClicked);
 +    $('#pairs_guessed').text(memoryGame.correctPairs);
 +  });
 +
  });		  });
 +
 +function voltearFront( card ) {
 +  card.children(".back").hide();
 +  card.children(".front").show();
 +}
 +
 +function voltearBack( card ) {
 +  card.children(".back").show();
 +  card.children(".front").hide();
 +}
*/
