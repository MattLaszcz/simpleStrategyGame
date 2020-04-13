
const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 14;
const STRONG_ATTACK_VALUE = 17;
const HEAL_VALUE = 20;

const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG_ATTACK';
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';

const enteredValue = prompt('Maximum life for you and the monster','100');

let battleLog = [];



//let currentMonsterHealth = chosenMaxLife;
let lastLoggedEntry; 

function getMaxLifeValues () {
  const enteredValue = prompt('Maximum life for you and the monster','100');
  const parsedValue = parseInt(enteredValue);
  if (isNaN(parsedValue || parsedValue <= 0)) { //chosenMaxLife is NaN is checked first before running the OR operator.
    throw {message: 'Invalid user input, not a number!' };
  }
return parsedValue;
}

let chosenMaxLife;

try {
chosenMaxLife = getMaxLifeValues();
} catch (error) { // error can be any name it will get its value from "throw" in the getMaxLifeValues function.
  console.log(error);
  chosenMaxLife = 100;
} finally { //code in finally will always run no matter what. 
  
}


let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function writeToLog (event,value, monsterHealth, playerHealth) {
  let logEntry = {

        event:event,
        value: value,
        finalMonseterHealth: monsterHealth,
        finalPlayerHealth: playerHealth
      };

      switch(event) { //this has replaced the if else statements commented out below.
        case LOG_EVENT_PLAYER_ATTACK: // behind the scence the case is always asuming the use of a === i.e if event === LOG_EVENT_PLAYER_ATTACK
          logEntry.target = 'MONSTER';
          break; // if this case has not been handled then no other case should be handled, default cases below will all be executed. Break will only execute the case above it.
        case LOG_EVENT_PLAYER_ATTACK:
          logEntry = {
            event:event,
            value: value,
            target: 'MONSTER',
            finalMonseterHealth: monsterHealth,
            finalPlayerHealth: playerHealth
          };
          break;
        case LOG_EVENT_MONSTER_ATTACK:
        logEntry = {
            event:event,
            value: value,
            target: 'PLAYER',
            finalMonseterHealth: monsterHealth,
            finalPlayerHealth: playerHealth
          };
          break;
        case LOG_EVENT_PLAYER_HEAL:
        logEntry = {
          event:event,
          value: value,
          target: 'PLAYER',
          finalMonseterHealth: monsterHealth,
          finalPlayerHealth: playerHealth
          };
          break;
        case LOG_EVENT_GAME_OVER:
        logEntry = {
          event:event,
          value: value,
          finalMonseterHealth: monsterHealth,
          finalPlayerHealth: playerHealth
            };
            break;
            default: logEntry = {}; //define default code just in case none of the cases are met. 
      }
      
    /*} else if (event === LOG_EVENT_PLAYER_STRONG_ATTACK) {
      logEntry = {
        event:event,
        value: value,
        target: 'MONSTER',
        finalMonseterHealth: monsterHealth,
        finalPlayerHealth: playerHealth
  };

} else if (event === LOG_EVENT_MONSTER_ATTACK) {
  logEntry = {
    event:event,
    value: value,
    target: 'PLAYER',
    finalMonseterHealth: monsterHealth,
    finalPlayerHealth: playerHealth
};

} else if (event === LOG_EVENT_PLAYER_HEAL) {
logEntry = {
  event:event,
  value: value,
  target: 'PLAYER',
  finalMonseterHealth: monsterHealth,
  finalPlayerHealth: playerHealth
};

} else if (event === LOG_EVENT_GAME_OVER) {
  logEntry = {
  event:event,
  value: value,
  finalMonseterHealth: monsterHealth,
  finalPlayerHealth: playerHealth
    };
  } */
  battleLog.push(logEntry);
}

function reset() {
  currentMonsterHealth = chosenMaxLife;
  currentPlayerHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
}

function endRound (){
  const initialPlayerHealth = currentPlayerHealth;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;
  writeToLog(
    LOG_EVENT_MONSTER_ATTACK, 
    playerDamage, 
    currentMonsterHealth, 
    currentPlayerHealth
    );

  
  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealth;
    setPlayerHealth(initialPlayerHealth); 
    alert('BONUS LIFE SAVED YOU');
    }
  
  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert('YOU WIN');
    reset();
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert('YOU LOST HA');
    reset();
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
    alert('YOU HAVE A DRAW')
    reset();
  }

}

function attackMonster(mode){
  let maxDamage;
  if (mode === MODE_ATTACK){
  maxDamage = ATTACK_VALUE;
} else if (mode === MODE_STRONG_ATTACK) {
    maxDamage = STRONG_ATTACK_VALUE;
  }

  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;
  
  endRound();

}

function attackHandler(){
 attackMonster(MODE_ATTACK);
}

function strongAttackHandler () {
  attackMonster(MODE_STRONG_ATTACK);

}

function healPlayerHandler () {
let healValue;
if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
  alert('YOU CANT HEAL TO MORE THAN MAX INITIAL HEALTH');
  healValue = chosenMaxLife - currentPlayerHealth;
  
} else {
  healValue = HEAL_VALUE;
}
increasePlayerHealth(healValue); 
currentPlayerHealth += healValue;
endRound();
}

function printLogHandler () {
  for (let i = 0; i< 3; i++){ // i++ will run after your last semicolon in the loop.
    console.log('-------');
  }
 /*for ( let i = 0; i < battleLog.length; i++) {
    console.log(battleLog[i]);
  }*/
  let i = 0;
  for (const logEntry of battleLog) { // The const defined is created for every loop iteration. const created in the loop are only new and used in that loop and cant be called after outside of the loop.
      if (!lastLoggedEntry && lastLoggedEntry !== 0 || lastLoggedEntry < i) { // remember that 0 is a falsy value 
      console.log(`#${i}`);
      for (const key in logEntry) {//inner loop has to complete before outer loop iteration up
        console.log(`${key} => ${logEntry[key]}`);
      }
      lastLoggedEntry = i;
      break;// stops the loop in which you call it directly. It will only stop the nearest loop. Using labeled statement loops you can name: do{} a loop then break name; loop 
    }
      i++;
  }  
}

attackBtn.addEventListener('click',attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click',healPlayerHandler);
logBtn.addEventListener('click', printLogHandler);