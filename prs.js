const choices = [{ label: 'Paper', beats: ['Rock'] }, { label: 'Rock', beats: ['Scissors'] }, { label: 'Scissors', beats: ['Paper'] }];

// function to check winner
const getWinner = (choice1, choice2) => {
    if (choice1.beats.includes(choice2.label)) {
        // choice 1 wins
        return choice1;
    } else if (choice2.beats.includes(choice1.label)) {
        // choice 2 wins
        return choice2;
    } else if (choice1.label === choice2.label) {
        // this is a tie
        return false;
    }
};

const random = (min = 0, max = 2) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const afterPlayerChooses = choice => {
    const randomIndex = random();
    // randomize computer choice
    const computerChoice = choices[randomIndex];
    // get players selected choice
    const playersChoice = choices.find(c => c.label === choice);
    // see who the winner is
    const winningChoice = getWinner(playersChoice, computerChoice);
    // see if player or computer won
    if (playersChoice === winningChoice) {
        return displayResult(`Player picks ${playersChoice.label}<br>Computer picks ${computerChoice.label}<br><strong>Player Wins!</strong>`);
    } else if (computerChoice === winningChoice) {
        return displayResult(`Computer picks ${computerChoice.label}<br>Player picks ${playersChoice.label}<br><strong>Computer Wins!</strong>`, '#FC8181');
    } else if (computerChoice === playersChoice) {
        return displayResult(`Computer picks ${computerChoice.label}<br>Player picks ${playersChoice.label}<br><strong>It's a tie!</strong>`, '#ECC94B');
    }
};

const displayResult = (message, color = '#48BB78') => {
    const isNewResult = document.querySelector('#result') === null;
    const result = isNewResult ? document.createElement('div') : document.querySelector('#result');
    result.id = 'result';
    result.innerHTML = `<p>${message}</p>`;
    result.style.padding = '12px';
    result.style.marginTop = '10px';
    result.style.borderRadius = '.25rem';
    result.style.backgroundColor = color;
    result.textAlign = 'center';
    if (isNewResult) {
        document.body.appendChild(result);
    }
};

document.addEventListener('DOMContentLoaded', function() {
    choices.forEach(choice => {
        const button = document.createElement('button');
        button.addEventListener('click', event => {
            return afterPlayerChooses(choice.label);
        });
        button.style.display = 'inline-block';
        button.style.marginRight = '5px';
        button.innerHTML = choice.label;
        document.body.appendChild(button);
    });
});
