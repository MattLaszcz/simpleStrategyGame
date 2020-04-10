
const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 14;
const STRONG_ATTACK_VALUE = 17;
let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
const HEAL_VALUE = 20;
let hasBonusLife = true; 


adjustHealthBars(chosenMaxLife);

function reset() {
  currentMonsterHealth = chosenMaxLife;
  currentPlayerHealth = chosenMaxLife;
  resetGame();
}

function endRound (){
  const initialPlayerHealth = currentPlayerHealth;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;

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
  if (mode === 'ATTACK'){
  maxDamage = ATTACK_VALUE;
} else if (mode === 'STRONG_ATTACK') {
    maxDamage = STRONG_ATTACK_VALUE;
  }

  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;
  
  endRound();

}

function attackHandler(){
 attackMonster('ATTACK');
}

function strongAttackHandler () {
  attackMonster('STRONG_ATTACK');

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

attackBtn.addEventListener('click',attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click',healPlayerHandler);