const userValues = {
    name: null,
    numberSmall: 0,
    numberLarge: 25,
    attempts: 0,
};
let correctNumber = parseInt(Math.random() * (userValues.numberLarge - userValues.numberSmall) + userValues.numberSmall);
const reviewAnswer = (answer) => {
    if (answer == "Ja") {
        assignPrompt('Je hebt nog ' + (5 - userValues.attempts) + ' pogingen. Welk nummer tussen de ' + userValues.numberSmall + ' en ' + userValues.numberLarge + ' wordt het? Raad het nummer!', 'vul hier jouw nummer in', playGame)
    } if (answer == "Nee") {
        assignAlert("oke, jammer. Dag " + userValues.name);
        return;
    } else {
        assignPrompt('Dat is een ongeldige invoer. Probeer het opnieuw', 'Ja of Nee', reviewAnswer);
    }
}
const playGame = (answer) => {
    if (userValues.attempts <= 4) {
        userValues.attempts++
        if (answer < userValues.numberSmall || answer > userValues.numberLarge) {
            assignPrompt('Helaas dat valt buiten jouw eigen range! Maar telt wel mee als een beurt :(. Wil je opnieuw raden?', 'Ja of Nee', reviewAnswer);
        } else {
            if (correctNumber === parseInt(answer)) {
                alert("Gefeliciteerd! Het was goed. Het spel is nu ten einde");
                return;
            } else {
                assignPrompt('Helaas, dat is niet goed. Wil je opnieuw raden?', 'Ja of Nee', reviewAnswer);
            }
        }
    } else {
        assignAlert("Helaas, het is niet gelukt. Het spel is ten einde gekomen");
        return;
    }
}
const assignHighNumber = (highNumber) => {
    if (!isNaN(parseInt(highNumber))) {
        userValues.numberLarge = parseInt(highNumber);
        assignPrompt('Leuk! We gaan beginnen. Je hebt 5 pogingen om het juiste cijfer te raden. Je zelfgekozen range is tussen de ' + userValues.numberSmall + ' en ' + userValues.numberLarge + '. Raad het nummer!', 'vul hier jouw nummer in', playGame);
    } else {
        assignAlert('Ho! Dit was geen nummer, valsspeler! Je moet opnieuw beginnen');
        window.location.href = window.location.href;
    }
}
const assignLowNumber = (lowNumber) => {
    if (!isNaN(parseInt(lowNumber))) {
        userValues.numberSmall = parseInt(lowNumber);
        assignPrompt('En wat is het hoogste nummer dat je wilt raden?', 'hoogste nummer', assignHighNumber);
    } else {
        assignAlert('Ho! Dit was geen nummer, valsspeler! Je moet opnieuw beginnen');
        window.location.href = window.location.href;
    }
}
const assignName = (name) => {
    userValues.name = name;
    assignPrompt('Hey ' + userValues.name + ', Het spel start! Wat is het laagste nummer dat je wilt raden?', 'laagste nummer', assignLowNumber);
}
const assignPrompt = (question, value, callback) => {
    let answer = prompt(question, value);
    if (answer === null) {
        assignAlert('Ho! Je hebt of op annuleren geklikt, of het veld leeg gelaten. Dat mag niet. We beginnen opnieuw met een refresh');
        window.location.href = window.location.href;
    } else {
        callback(answer);
    }
}
const assignAlert = (value) => {
    alert(value);
    return;
}
assignPrompt('Welkom! Wat is je naam?', 'Vul je naam in', assignName);