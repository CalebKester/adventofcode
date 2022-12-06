import { AocClient } from "advent-of-code-client";

const client = new AocClient({
  year: 2022, // the year of the challenge
  day: 2, // the day of the challenge
  token: "", // the session cookie from adventofcode.com
});

let input = await client.getInput();

// input = `A Y
// B X
// C Z`;

console.log(input);

// Rock (A)
// - Paper (Y)
// Paper (B)
// - Scissors (X)
// Scissors (C)
// - Rock (Z)

const rps = (letter) => {
  if (letter === "A" || letter === "X") return "rock";
  if (letter === "B" || letter === "Y") return "paper";
  if (letter === "C" || letter === "Z") return "scissors";
};

const tie = 3;
const win = 6;
const lose = 0;

const points = {
  rock: 1,
  paper: 2,
  scissors: 3,
  tie: 3,
  win: 6,
  lose: 0,
};

const score = (theirs, mine) => {
  let s = 0;
  if (theirs === mine) s = points.tie;
  else if (theirs === "rock" && mine === "paper") s = points.win;
  else if (theirs === "rock" && mine === "scissors") s = points.lose;
  else if (theirs === "paper" && mine === "scissors") s = points.win;
  else if (theirs === "paper" && mine === "rock") s = points.lose;
  else if (theirs === "scissors" && mine === "rock") s = points.win;
  else if (theirs === "scissors" && mine === "paper") s = points.lose;
  return s + points[mine];
};

const lines = input
  .split("\n")
  .map((line) => line.split(" "))
  .map(([a, b]) => [rps(a), rps(b), score(rps(a), rps(b))]);

// console.log(lines);

const scorecardA = lines.reduce((acc, [a, b, s]) => acc + s, 0);

console.log(scorecardA);

const guide = {
  X: "lose",
  Y: "draw",
  Z: "win",
};

const myRPS = (letter, result) => {
  if (letter === "rock" && result === "win") return "paper";
  if (letter === "scissors" && result === "win") return "rock";
  if (letter === "paper" && result === "win") return "scissors";
  if (letter === "rock" && result === "lose") return "scissors";
  if (letter === "scissors" && result === "lose") return "paper";
  if (letter === "paper" && result === "lose") return "rock";
  if (letter === "rock") return "rock";
  if (letter === "scissors") return "scissors";
  if (letter === "paper") return "paper";
  return "bad";
};

const linesB = input
  .split("\n")
  .map((line) => line.split(" "))
  .map(([a, b]) => [
    rps(a),
    guide[b],
    myRPS(rps(a), guide[b]),
    score(rps(a), myRPS(rps(a), guide[b])),
  ]);

console.log(linesB);

const scorecardB = linesB.reduce((acc, [a, b, c, s]) => acc + s, 0);

console.log(scorecardB);

const success = await client.submit(2, scorecardB);

console.log(success);
