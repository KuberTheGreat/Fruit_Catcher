// This is a class for the game's functioning
class Game{
    constructor(){}

    // Function to get/read the gamestate changes from the database
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })
    }

    // Function to update/write the gamestate changes in the database
    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }

    // An asyncronous function to await till the players have logged in
    async start() {
        if (gameState === 0) {
            // Adds a new player
            player = new Player();
            // To await for the player count to become 2
            var playerCountRef = await database.ref('playerCount').once("value");

            if (playerCountRef.exists()) {
                playerCount = playerCountRef.val();
                player.getCount();
            }
            // Creates a new form and displays it
            form = new Form()
            form.display();
        }
        // Creates the player sprites and adds the images to it
        player1 = createSprite(200,500);
        player1.addImage("player1",player_img);
        
        player2 = createSprite(800,500);
        player2.addImage("player2", player_img);

        // Adds the player sprites to the array
        players = [player1,player2];
    }
    
    // Function for the play of the game
    play(){
        // Hides the form
        form.hide();

        // Gets the player information i.e. the name, distance and score
        Player.getPlayerInfo();
        // Adds the image to something
        image(back_img, 0, 0, 1000, 800);

        var x = 100;
        var y = 200;

        var index = 0;

        drawSprites();

        // For loop to check the game settings
        for(var plr in allPlayers){
            // Increases the index by 1
            index = index + 1;
            // Changes the distance of the player as per the movement
            x = 500 - allPlayers[plr].distance;
            y = 500;
            
            // Sets the player.x to x and so on
            players[index -1].x = x;
            players[index - 1].y = y;

            // Differentiate the main player by printing
            // The name of the player on the basket. 
            if(index === player.index){
                fill(145, 34, 34);
                textSize(25);
                text(allPlayers[plr].name, x - 25, y + 25); 
            }
        }

        // Give movements for the players using arrow keys
        // Moves by the right arrow key
        if(keyIsDown(RIGHT_ARROW) && player.index !== null){
            player.distance -= 10;
            player.update();
        }
        // Moves by the left arrow key
        if(keyIsDown(LEFT_ARROW) && player.index !== null){
            player.distance += 10;
            player.update();
        }

        // Create and spawn fruits randomly
        if(frameCount % 20 === 0){
            // Creates the fruit sprite and makes it fall
            fruits = createSprite(random(100, 1000), 0, 100, 100);
            fruits.velocityY = 6;

            // Sets random images to the fruit according to the random number
            var rand = Math.round(random(1, 5));

            // Switch/Case statement for the adding of images
            switch(rand){
                case 1:
                    fruits.addImage("fruit1", fruit1_img);
                    break;
                case 2:
                    fruits.addImage("fruit2", fruit2_img);
                    break;
                case 3:
                    fruits.addImage("fruit3", fruit3_img);
                    break;
                case 4:
                    fruits.addImage("fruit4", fruit4_img);
                    break;
                case 5:
                    fruits.addImage("fruit5", fruit5_img);
                    break;
            }
            // Adds the fruit sprite to the fruitGroup
            fruitGroup.add(fruits);
        }

        // Condition to destroy the fruits
        // And maybe increase the score
        if(player.index !== null){
            for(var i = 0; i < fruitGroup.length; i++){
                if(fruitGroup.get(i).isTouching(players)){
                    fruitGroup.get(i).destroy();
                    player.score += 1;
                    player.update();
                }
            }
        }

        // Prints the score on the screen
        fill(255, 255, 255);
        text("player1's score: " + player.score, 100, 100);

        // Condition to end the game
        if(player.score >= 10){
            gameState = 2;
        }
    }

    // Function of the end state
    end(){
       game.update(2);
       clear();
       fill(123, 123, 213);
       textSize(15);
       text("Game Ended!!", 700, 700);
       console.log("Game Ended!!! Now stop Playing");
    }
}