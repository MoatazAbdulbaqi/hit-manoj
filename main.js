let flys = [];
const mainCont = document.querySelector('#main-container');
const GENERATION_SPEED = 1000; // in ms
const MOVE_SPEED = 1000; // in ms
const MAX_NUMBER = 30

const getRandomNumber = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

const drowFly = () => {
	const flyContainer = document.createElement("div")
	flyContainer.draggable = false
	flyContainer.classList.add('fly-container');
	const fly = document.createElement('img');
	fly.src = '/fly.png'
	flyContainer.appendChild(fly)
	flyContainer.classList.add('fly');
  mainCont.appendChild(flyContainer);
  setRandomPosition(flyContainer);
	flys.push(flyContainer);
};

const setRandomPosition = (fly) => {
  const top = getRandomNumber(5, 95);
	const left = getRandomNumber(5, 95);
	fly.style.setProperty('top', `${top}%`);
	fly.style.setProperty('left', `${left}%`);
	fly.style.setProperty('rotate', `${getRandomNumber(0, 180)}deg`);
}

const moveFlys = () => {
	flys.forEach((fly) => {
		setRandomPosition(fly)
	});
};
const listen = () => {
	flys.forEach((fly) => {
		fly.addEventListener('click', () => {
			playSound(Date.now());
			fly.classList.add('killed');
			fly.querySelector('img').src = './deid-fly.jpg'
			flys = flys.filter((f) => f != fly);
		});
	});
};

let lastPlaySound =0;
const playSound = (date) => {
	if (date - lastPlaySound > 1000) {
		lastPlaySound = date
		new Audio('/sound.mp3').play();
	}
}

let lastMove = 0;
let lastDrow = 0;
window.setInterval(() => {
  if (lastDrow >= GENERATION_SPEED) {
    lastDrow = 0;
    if (flys.length <= MAX_NUMBER) {
			drowFly();
		}
  } else {
    lastDrow += 1000;
  }
  if (lastMove >= MOVE_SPEED) {
		lastMove = 0;
		moveFlys()
	} else {
		lastMove += 1000;
	}
	listen();
}, 500);

