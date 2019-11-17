var scores, roundScore, activePlayer, maxScore, currentDice, previousDice, diceLog, gamePlaying;

init();

// Get random dice number
document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {

        // Random number
        var dice = Math.floor(Math.random() * 6) + 1;
        // var dice = 6;
        currentDice = dice;

        // Add to diceLog, check save previousDice
        diceLog.push(dice);
        previousDice = diceLog[diceLog.length-2];

        console.log('Previous: ', previousDice, ' Current: ', currentDice, ' Dicelog: ', diceLog);

        // Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        // Update the round score IF the rolled number was NOT a 1
        if (dice !== 1) {
            // Check if player has thrown 6 two times in a row
            if ((previousDice === currentDice) && (previousDice === 6 && currentDice === 6)) {
                alert('player threw two times 6 in a row, entire score is lost');
                roundScore = 0;
                nextPlayer();
            } else {
                // Add score 
                roundScore += dice;
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

            gamePlaying = false;
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
    
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0'; 

    // document.querySelector('.player-0-panel').classList.remove('active');   
    // document.querySelector('.player-1-panel').classList.add('active');

    document.querySelector('.player-0-panel').classList.toggle('active');   
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
};

// Start a new game
document.querySelector('.btn-new').addEventListener('click', init);

// Get max score on change
var maxScoreInput = document.getElementById('max-score');
maxScoreInput.addEventListener('change', getMaxScore);

function getMaxScore() {
    maxScore = parseInt(maxScoreInput.value);
}

// Initilize game

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    maxScore = 25;
    diceLog = [];

    document.querySelector('.btn-roll').classList.remove('inactive');
    document.querySelector('.btn-hold').classList.remove('inactive');

    document.querySelector('.dice').style.display = 'none';

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