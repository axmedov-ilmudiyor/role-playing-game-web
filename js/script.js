let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;

let fighting;
let monsterHealth;
let inventory = ["stick"];

const buttonOne = document.querySelector("#button1");
const buttonTwo = document.querySelector("#button2");
const buttonThree = document.querySelector("#button3");

const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

const weapons = [
  {
    name: "stick",
    power: 5,
  },
  {
    name: "dagger",
    power: 30,
  },
  {
    name: "claw hammer",
    power: 50,
  },
  {
    name: "sword",
    power: 100,
  },
];

const monsters = [
  {
    name: "slime",
    level: 2,
    health: 15,
  },
  {
    name: "fanged beast",
    level: 8,
    health: 60,
  },
  {
    name: "dragon",
    level: 20,
    health: 300,
  },
];

const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: 'You are in the town square. You see a sign that says "Store".',
  },
  {
    name: "store",
    "button text": [
      "Buy 10 health (10 gold)",
      "Buy weapon (30 gold)",
      "Go to town square",
    ],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You enter the store.",
  },
  {
    name: "cave",
    "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You enter the cave. You see some monsters.",
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You are fighting a monster",
  },
  {
    name: "kill monster",
    "button text": ["Go to town square", "Go to town square", "Go to town square"],
    "button functions": [goTown, goTown, goTown],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You die. ☠️"
  },
  {
    name: "win",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You defeat the dragon! YOU WIN THE GAME! 🎉"
  }
];

buttonOne.onclick = goStore;
buttonTwo.onclick = goCave;
buttonThree.onclick = fightDragon;

function update(location) {
    monsterStats.style.display = "none";

  buttonOne.innerText = location["button text"][0];
  buttonTwo.innerText = location["button text"][1];
  buttonThree.innerText = location["button text"][2];

  buttonOne.onclick = location["button functions"][0];
  buttonTwo.onclick = location["button functions"][1];
  buttonThree.onclick = location["button functions"][2];

  text.innerText = location.text;
}

function goTown() {
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    goldText.innerHTML = gold;
    health += 10;
    healthText.innerHTML = health;
  } else {
    text.innerHTML = "You do not have enough gold to buy health.";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "You now have a " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " In your inventory you have: " + inventory;
    } else {
      text.innerText = "You do not have enough gold to buy a weapon.";
    }
  } else {
    text.innerText = "You already have the most powerful weapon!";
    buttonTwo.innerText = "Sell weapon for 15 gold";
    buttonTwo.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerHTML = "You sold a " + currentWeapon + ".";
  }
}

function fightSlime() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerHTML = monsters[fighting].name;
  monsterHealthText.innerHTML = monsterHealth;
}

function attack() {
  text.innerHTML = "The " + monsters[fighting].name + "attacks.";
  text.innerHTML = " You attack it with your " + weapons[currentWeapon].name;
  health -= getMonsterAttackValue(monsters[fighting].level);
  monsterHealth -=
    weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
  healthText.innerHTML = health;
  monsterHealthText.innerHTML = monsterHealth;

  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    fighting === 2 ? winGame() : defeatMonster()
  }
}


function getMonsterAttackValue(level) {
    const hit = (level * 5) - (Math.floor(Math.random() * xp));
    return hit;
}

function dodge() {
  text.innerHTML = "Your dodge the attack from " + monsters[fighting].name;
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerHTML = gold;
  xpText.innerHTML = xp;
  update(locations[4]);
}

function lose() {
    update(locations[5])
}

function winGame(){
    update(locations[6])
}

function restart(){
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    inventory = ["stick"];
    goldText.innerHTML = gold;
    healthText.innerHTML = health;
    xpText.innerHTML = xp;
    goTown( )
}