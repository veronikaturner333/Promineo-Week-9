//Card class holds our card suits and values
class Card {
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
        this.rank = this.assignRank(value);
    }
    //assignRank method - maps card values to their ranks for comparison
    assignRank(value) {
        const valueMap = {
            '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7,
            '8': 8, '9': 9, '10': 10,
            'Jack': 11, 'Queen': 12, 'King': 13, 'Ace': 14
        };
        return valueMap[value] || value; // Return the rank of the card
    }
}

//Deck class in which we hold deck array, as well as create and shuffle our deck
class Deck {
    constructor() {
        this.cards = []; // Initialize an empty array for the deck
        this.createDeck(); // Fill the deck with cards
        this.shuffle(); // Shuffle the deck
    }
    // Creates a standard 52-card deck
    createDeck() {
        const suits = ['♠︎', '♥︎', '♣︎', '♦︎'];
        const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
        // Loop through each suit and value combination and add it to the deck
        for (let suit of suits) {
            for (let value of values) {
                this.cards.push(new Card(suit, value));
            }
        }
    }

    //shuffle method shuffles the deck using the Fisher-Yates shuffle algorithm
    //algorithm takes a list of all the elements of the sequence
    //continually determines next element in the shuffled sequence
    //by randomly drawing an element from the list until no elements remain
    shuffle() {
        //for loop loops through each card, decrements by one each time
        for (let i = this.cards.length - 1; i > 0; i--) {
            //Elements swapped between temp and i
            //stopping when the while loop iterates through all the possibilities
            const temp = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[temp]] = [this.cards[temp], this.cards[i]];
        }
    }
    //dealCards method pushes cards evenly to each player's deck
    dealCards(player1, player2) {
        //Deal cards to both players until we have gotten through the array of cards
        while (this.cards.length) {
            //.shift() removes first element from array and returns it
            player1.hand.push(this.cards.shift());
            player2.hand.push(this.cards.shift());
        }
    }
}

//Player class stores name of player, their hand and score
class Player {
    constructor(name) {
        this.name = name; // Assign the player's name
        this.hand = []; // Initialize an empty array to hold the player's cards
        this.score = 0; // Initialize the player's score
    }
}

//Game class where we actually "play" the game and compare cards
class Game {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.deck = new Deck(); // Creates, populates, and shuffles the deck
        this.deck.dealCards(player1, player2); // call on dealCards method, deal cards to players
    }

    //For each player turn, we must compare the values of each player's card. Add to the score of the winner.
    compareCards(card1, card2) {
        if (card1.rank > card2.rank) {
            this.player1.score++;
            return `${this.player1.name} wins this round.`; //player1 wins the round with a higher card value
        } else if (card1.rank < card2.rank) {
            this.player2.score++;
            return `${this.player2.name} wins this round.`; //player2 wins the round with a higher card value
        } else {
            //if they both draw a card of the same value, this round is a tie
            return "It's a tie!";
        }
    }

    //playGame method
    playGame() {
        let gameResults = ''; //game result starts out empty and is populated as we go through the while loop
        //Keep playing a card until both players runs out of cards
        while (this.player1.hand.length > 0 && this.player2.hand.length > 0) {
            const card1 = this.player1.hand.shift();
            const card2 = this.player2.hand.shift();
            //call upon compareCard method to compare cards of the round
            let roundResult = this.compareCards(card1, card2);
            //Use template literal to display player's names and card values. Then who won that round.
            gameResults += `Round: ${this.player1.name} plays ${card1.value} of ${card1.suit}, ${this.player2.name} plays ${card2.value} of ${card2.suit}. ${roundResult}\n`;
        }

        // After all cards have been played, determine the winner
        if (this.player1.score > this.player2.score) {
            gameResults += `${this.player1.name} wins the game!`; //if player1 has a higher total score, they won
        } else if (this.player1.score < this.player2.score) {
            gameResults += `${this.player2.name} wins the game!`; //if player2 has a higher total score, they won
        } else {
            gameResults += "The game ends in a tie!"; //if the total score is even, it is a tie
        }
        return gameResults;
    }
}
// Initialize new game
let player1 = new Player("Veronika");
let player2 = new Player("Mark");
let game = new Game(player1, player2); //deal cards to both players
console.log(game.playGame()); // Display the outcome in the console






