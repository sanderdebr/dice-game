var scores, roundScore, activePlayer, maxScore, gamePlaying;
var currentDice, currentDice2, previousDice, previousDice2, diceLog, diceLog2, twoDices;

init();

// Get random dice number
document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {

        // Random number
        var dice = Math.floor(Math.random() * 6) + 1;
        currentDice = dice;

        // Random number second dice if exists
        if (twoDices) {
            var dice2 = Math.floor(Math.random() * 6) + 1;
            currentDice2 = dice2;
        }

        // Add to diceLog, check save previousDice
        diceLog.push(dice);
        previousDice = diceLog[diceLog.length-2];
        console.log('Previous: ', previousDice, ' Current: ', currentDice, ' Dicelog: ', diceLog);

        // Add to diceLog2 if exists
        if (twoDices) {
            diceLog2.push(dice2);
            previousDice2 = diceLog2[diceLog2.length-2];
            console.log('Previous 2: ', previousDice2, ' Current 2: ', currentDice2, ' Dicelog 2: ', diceLog2);
        }

        // Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        // Display result for second dice
        if (twoDices) {
            var diceDOM2 = document.querySelector('.dice2');
            diceDOM2.style.display = 'block';
            diceDOM2.src = 'dice-' + dice2 + '.png';
        }

        // Update the round score IF the rolled number was NOT a 1
        if (dice !== 1 && dice2 !== 1) {
            // Check if player has thrown 6 two times in a row
            if ((previousDice === 6 && currentDice === 6) || (previousDice2 === 6 && currentDice2 === 6)) {
                alert('player threw two times 6 in a row, entire score is lost');
                roundScore = 0;
                nextPlayer();
            } else {
                // Add score twice if playing with two dices
                twoDices ? roundScore = roundScore + dice + dice2 : roundScore += dice;
                console.log('roundscore: ', roundScore);
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
            }
        } else {
            // Next player
            nextPlayer();
        }
    }
});

// Store the current round in hold
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {

        // Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        // Update UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Check if player won the game
        if (scores[activePlayer] >= maxScore) {
            document.querySelector('#name-' + activePlayer).innerText = 'winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.btn-roll').classList.add('inactive');
            document.querySelector('.btn-hold').classList.add('inactive');
            document.querySelector('.btn-settings').classList.add('inactive');
            document.querySelector('.settings').classList.remove('active');

            gamePlaying = false;
            twoDices = false;
        // Check if 6 trown 2 times in a row
        } else {
            nextPlayer();
        }
    }
});

// next player
function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    currentDice = 0;
    previousDice = 0;
    diceLog = [];
    currentDice2 = 0;
    previousDice2 = 0;
    diceLog2 = [];
    
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0'; 

    // document.querySelector('.player-0-panel').classList.remove('active');   
    // document.querySelector('.player-1-panel').classList.add('active');

    document.querySelector('.player-0-panel').classList.toggle('active');   
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
};

// Start a new game
document.querySelector('.btn-new').addEventListener('click', init);

// Get max score on change
var maxScoreInput = document.getElementById('max-score');
maxScoreInput.addEventListener('change', getMaxScore);

function getMaxScore() {
    maxScore = parseInt(maxScoreInput.value);
}

// Toggle settings
document.querySelector('.btn-settings').addEventListener('click', function() {
    if (gamePlaying) {
        document.querySelector('.settings').classList.toggle('active');
    }
});

// Toggle two dices
document.getElementById('two-dices').addEventListener('click', function() {
    twoDices = document.getElementById('two-dices').checked;
});

// Initilize game

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    twoDices = false;
    maxScore = 25;
    diceLog = [];
    diceLog2 = [];

    document.querySelector('.btn-roll').classList.remove('inactive');
    document.querySelector('.btn-hold').classList.remove('inactive');
    document.querySelector('.btn-settings').classList.remove('inactive');

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';

    document.getElementById('two-dices').checked = false;
    document.getElementById('max-score').value = '';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').innerText = 'Player 1';
    document.getElementById('name-1').innerText = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');
};