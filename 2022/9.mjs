import { AocClient } from "advent-of-code-client";

const day = 9;

const client = new AocClient({
  year: 2022, // the year of the challenge
  day, // the day of the challenge
  token:
    "53616c7465645f5f4179f886cadc6a9dd0ad73628da6a6c2786d85776426c669b829df22796508ca74d775c1fc1f7b8716e5fd35a708d1b7d03922bbb4668d50", // the session cookie from adventofcode.com
});

const input = await client.getInput();
// const input = `R 5
// U 8`;
const parsedInput = input.split("\n").map((i) => {
  const [d, n] = i.split(" ");
  return [d, Number(n)];
});

// console.log(parsedInput);

const start = [0, 0];
const knots = [
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
];
const visit = new Set(["0,0"]);

const direction = {
  U: [0, 1],
  D: [0, -1],
  L: [-1, 0],
  R: [1, 0],
};

const moveHead = (direction) => {
  const x = knots[0][0] + direction[0];
  const y = knots[0][1] + direction[1];
  knots[0] = [x, y];
};

const moveKnots = (direction, i) => {
  const head = knots[i - 1];
  const tail = knots[i];
  // console.log("comparing", i - 1, i);
  // console.log("comparing", head, tail);
  const difference = [Math.abs(head[0] - tail[0]), Math.abs(head[1] - tail[1])];
  const diff = difference[0] + difference[1];
  // console.log("diff", diff);
  // console.log("diff", difference);
  // If head is now on tail, do nothing
  if (diff === 0) {
    return;
  }

  if (difference[0] === 2 && difference[1] === 2) {
    tail[0] = tail[0] + (head[0] - tail[0]) / 2;
    tail[1] = tail[1] + (head[1] - tail[1]) / 2;
    return;
  }
  // if difference is 3 (not touching),calculate diagonal
  if (difference[0] + difference[1] === 4) {
  }
  if (difference[0] + difference[1] === 3) {
    // console.log("⭐diagonal", i, head, tail);

    // Not sure the best way to calculate diagonal, but if the difference is 1, match it.
    if (difference[0] === 1) {
      tail[0] = head[0];
    } else {
      // This will make sure our sign matches the direction
      tail[0] = tail[0] + (head[0] - tail[0]) / 2;
    }
    if (difference[1] === 1) {
      tail[1] = head[1];
    } else {
      // This will make sure our sign matches the direction
      tail[1] = tail[1] + (head[1] - tail[1]) / 2;
    }
    return;
  }
  // if head is 2 spaces away from tail, move tail to oldhead
  if (Math.abs(head[0] - tail[0]) === 2 || Math.abs(head[1] - tail[1]) === 2) {
    if (difference[0] === 2) {
      tail[0] = tail[0] + (head[0] - tail[0]) / 2;
    } else {
      tail[1] = tail[1] + (head[1] - tail[1]) / 2;
    }
    return;
  }
  // if head is 2 spaces away from tail, move tail to oldhead
  // if (head[0] === tail[0] + direction[0] && head[1] === tail[1] + direction[1]) {
  // 	tail = oldHead;
  // }
  // if head is on same row as tail, move tail to oldhead
};

const moveSequence = (direction) => {
  moveHead(direction);
  for (let i = 1; i < 10; i++) {
    // console.log(knots);
    // console.log("moveKnots", i, knots[i - 1], knots[i]);
    moveKnots(direction, i);
  }
  visit.add(`${knots[9][0]},${knots[9][1]}`);
};

// console.log(knots, visit);
// moveSequence(direction.R);
// moveSequence(direction.R);
// moveSequence(direction.R);
// moveSequence(direction.R);
// moveSequence(direction.U);
// moveSequence(direction.U);
// moveSequence(direction.U);
// console.log("⭐⭐⭐⭐");
// moveSequence(direction.U);
// moveSequence(direction.U);
// console.log(knots, visit);
// moveSequence(direction.R);
// console.log(knots, visit);
// moveSequence(direction.R);
// console.log(knots, visit);
// moveSequence(direction.R);
// console.log(knots, visit);
// console.log(knots, visit);
// moveSequence(direction.R);
// console.log(knots, visit);
// moveSequence(direction.R);
// console.log(knots, visit);
// move(direction.R);
// move(direction.R);
// move(direction.R);
// move(direction.R);
// // console.log(head, tail, visit, visit.size);
// move(direction.U);
// move(direction.U);
// console.log("Visited", visit.size);

for (const [d, n] of parsedInput) {
  for (let i = 0; i < n; i++) {
    moveSequence(direction[d]);
  }
}

const expected = [
  [5, 8],
  [5, 7],
  [5, 6],
  [5, 5],
  [5, 4],
  [4, 4],
  [3, 3],
  [2, 2],
  [1, 1],
  [0, 0],
];

console.log("Knots", knots);
console.log("Visited", visit.size);
console.log("Visit", visit);

console.log(await client.submit(2, visit.size));
process.exit();
