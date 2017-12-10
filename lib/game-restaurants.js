function GameRestaurants() {
  this.dishes = [];
  this.dishesBoard = [];
  this.randomIndex = [];
  this.level = "";
  this.restaurantSearch = '';
  this.selectedDishes = [];
  this.pairsClicked = 0;
  this.correctPairs = 0;
}

// ready

var gameRestaurants = new GameRestaurants();

$(function() {
  dataset.forEach(function(dish) {
    gameRestaurants.dishes.push(new Dish(dish));

    $('#dishes-game').hide();
    $('#prices-game').hide();
    $('#restaurant-game').hide();

  });

});

//evento onclick menú de inicio platos

$('.button-restaurants').on('click', function() {
  $('#menu').hide();
  $('#restaurant-game').show();
  $('#dishes-game').hide();
  $('#prices-game').hide();
  $('#home').hide();

  gameRestaurants.createBoard();

});
