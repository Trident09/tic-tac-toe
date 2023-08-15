let music = new Audio("./assets/music.mp3");
let turnSound = new Audio("./assets/ting.mp3");
let gameOver = new Audio("./assets/gameover.mp3");

let gameover = false;

let turn = "X";

// to change the turn
const changeTurn = () => {
	return turn === "X" ? "O" : "X";
};

// check for a win
const checkWin = () => {
	let boxText = document.getElementsByClassName("boxText");
	let wins = [
		[0, 1, 2, 2.5, 5, 0],
		[3, 4, 5, 2.5, 15, 0],
		[6, 7, 8, 2.5, 25, 0], // horizontal wins

		[0, 3, 6, -7.5, 15, 90],
		[1, 4, 7, 2.5, 15, 90],
		[2, 5, 8, 12.5, 15, 90], // vertical wins

		[0, 4, 8, 2.5, 15, 45],
		[2, 4, 6, 2.5, 15, 135], // diagonal wins
	];
	wins.forEach((e) => {
		if (
			boxText[e[0]].innerText === boxText[e[1]].innerText &&
			boxText[e[1]].innerText === boxText[e[2]].innerText &&
			boxText[e[0]].innerText !== ""
		) {
			document.querySelector(".info").innerText =
				boxText[e[0]].innerText + " Won";
			gameover = true;
			document
				.querySelector(".imgBox")
				.getElementsByTagName("img")[0].style.width = "10rem";

			document.querySelector(
				".line"
			).style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
			document.querySelector(".line").style.width = "25vw";
			gameOver.play();
			music.pause();
		}
	});
};

// game logic
music.play();
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach((element) => {
	let boxText = element.querySelector(".boxText");
	element.addEventListener("click", () => {
		if (boxText.innerText === "") {
			boxText.innerText = turn;
			turn = changeTurn();
			turnSound.play();
			checkWin();
			if (!gameover) {
				document.getElementsByClassName("info")[0].innerText =
					"Turn for " + turn;
			}
		}
	});
});

// add onclick listener to reset button
reset.addEventListener("click", () => {
	let boxText = document.querySelectorAll(".boxText");
	Array.from(boxText).forEach((element) => {
		element.innerText = "";
	});
	turn = "X";
	gameover = false;
	document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
	document
		.querySelector(".imgBox")
		.getElementsByTagName("img")[0].style.width = "0px";
		document.querySelector(".line").style.width = "0vw";
});
