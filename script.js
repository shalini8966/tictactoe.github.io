const game = new ticTacToe();
game.start();

function ticTacToe() {
    const chart = new Chart();
    const person = new Person(chart);
    const computer = new Computer(chart);
    let chance = 0;

    this.start = function () {
        //to watch all the position for changes when change happens it tells what is next person chance
        const co = { childList: true };
        //MutationObserver built-in object that observes a DOM element and fires a callback when it detects a change
        //whenever child of div changes we note that in observer
        //whenever there is a change we will call function takeCahnce
        const observer = new MutationObserver(() => takeChance());

        //set the observer on different dom elements
        //this below line means that for each position we are observing element i.e. for ele element based on co
        chart.position.forEach((ele) => observer.observe(ele, co));
        // we are calling takeChance here coz first person need to take chance
        takeChance();

    }
    function takeChance() {
        if (chart.winner()) {
            return;
        }
        if (chance % 2 === 0) {
            person.takeChance();
        }
        else {
            computer.takeChance();
        }
        //chance decides which player chance is
        chance++;
    }
}
//constructor
function Chart() {
    //arrays for selecting all columns
    this.position = Array.from(document.querySelectorAll('.col'));

    this.winner = function () {
        let found = false;
        const possibilityWinner =
            [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [2, 4, 6], [0, 3, 6], [1, 4, 7], [2, 5, 8]];

        const position = this.position;

        possibilityWinner.forEach((poss) => {
            const position0 = position[poss[0]].innerText;
            const position1 = position[poss[1]].innerText;
            const position2 = position[poss[2]].innerText;

            const isPossibility = position0 !== '' &&
             position0 === position1 && position1 === position2;

            if (isPossibility) {
                found = true;
              }
        });
        return found;
    } 
}

function Person(chart) {
    this.takeChance = function () {
        //add event listener so that they can listen to the changes or clicks
        chart.position.forEach(ele => ele.addEventListener('click', handleChance));
    }
    function handleChance(event) {
        event.target.innerText = 'X';
        //below line remove event listener if we will not remove it will keep adding X
        chart.position.forEach(ele => ele.removeEventListener('click', handleChance));
    }
}

function Computer(chart) {
    this.takeChance = function () {
        //creating a variable emptyPosition which will be an array which contains all the position whose innerText is empty
        const emptyPosition = chart.position.filter((pos) => pos.innerText === '');

        const move = Math.floor(Math.random() * emptyPosition.length);
        emptyPosition[move].innerText = 'O';
    }
}