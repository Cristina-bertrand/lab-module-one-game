function Game() {
  this.dishes = [];
}

Game.prototype.getRandomDishes = function(num, common)  {
  var randomDishes = [];
  for (var i = 0; i < this.dishes.length && randomDishes.length < num; i++) {
    var dish = this.dishes[i];

    if (dish.name.includes(common)) {
      randomDishes.push(dish);
    }
  }

  return randomDishes;
};

// ready

var game = new Game();

$(function() {
  dataset.forEach(function(dish) {
      game.dishes.push(new Dish(dish));
  });
});

//evento onclick menú de inicio

$('.button-dishes').on('click', function(){
  $('#menu').hide();
  // $('#menu').addClass('hidden');
  $('.first-game').show();
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
