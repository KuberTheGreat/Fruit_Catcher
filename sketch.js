// Global variable section
var database;

var back_img;

var gameState = 0;
var playerCount = 0;

var allPlayers;

var score = 45;

var player, form, game;

var player1,player2;

var players;

var fruits;
var fruitGroup;

var fruit1_img, fruit2_img, fruit3_img, fruit4_img, fruit5_img;

var player_img;

var player1score = 0;
var player2score = 0;

// Function to load all the images
function preload(){
	back_img = loadImage("images/jungle.jpg");

	player_img = loadImage("images/basket2.png");

	fruit1_img = loadImage("images/apple2.png");
	fruit2_img = loadImage("images/banana2.png");
	fruit3_img = loadImage("images/melon2.png");
	fruit4_img = loadImage("images/orange2.png");
	fruit5_img = loadImage("images/pineapple2.png");
}

function setup() {
	// Creates the canvas
	createCanvas(1000, 600);

	// Creates the google firebase database
	database = firebase.database();

	// Creates a new game using the Game class
	game = new Game();

	// Gets the game state from the database and starts the game
	game.getState();
	game.start();

	// Creates a new fruit Group
	fruitGroup = new Group();
}

function draw() {
	// Sets the background to an background image
  	background(back_img);

	  // Condition to update the database after every player logs inn
	if(playerCount === 2){
		game.update(1);
	}

	// Condition to check the game state
	if(gameState === 1){
		clear();
		game.play();
	}

	if(gameState === 2){
		game.end();
	}
}