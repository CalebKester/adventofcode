import { AocClient } from "advent-of-code-client";

const day = 9;

const client = new AocClient({
  year: 2022, // the year of the challenge
  day, // the day of the challenge
  token: "", // the session cookie from adventofcode.com
});

const input = await client.getInput();
// const input = `R 4
// U 4
// L 3
// D 1
// R 4
// D 1
// L 5
// R 2`;
const parsedInput = input.split("\n").map((i) => {
  const [d, n] = i.split(" ");
  return [d, Number(n)];
});

// console.log(parsedInput);

const start = [0, 0];
let head = [0, 0];
let tail = [0, 0];
const visit = new Set(["0,0"]);

const direction = {
  U: [0, 1],
  D: [0, -1],
  L: [-1, 0],
  R: [1, 0],
};

const move = (direction) => {
  const oldHead = head;
  // Move head
  head = [oldHead[0] + direction[0], oldHead[1] + direction[1]];
  const difference = [Math.abs(head[0] - tail[0]), Math.abs(head[1] - tail[1])];
  // console.log("diff", difference);
  // If head is now on tail, do nothing
  if (head[0] === tail[0] && head[1] === tail[1]) {
    return;
  }
  // if difference is 3 (not touching), move tail to oldhead
  // if (difference[0] === 3 || difference[1] === 3) {
  //   tail = oldHead;
  //   visit.add(`${tail[0]},${tail[1]}`);
  // }
  // if head is 2 spaces away from tail, move tail to oldhead
  else if (
    Math.abs(head[0] - tail[0]) === 2 ||
    Math.abs(head[1] - tail[1]) === 2
  ) {
    tail = oldHead;
    visit.add(`${tail[0]},${tail[1]}`);
  }
  // console.log(head, tail, visit);
  // if head is 2 spaces away from tail, move tail to oldhead
  // if (head[0] === tail[0] + direction[0] && head[1] === tail[1] + direction[1]) {
  // 	tail = oldHead;
  // }
  // if head is on same row as tail, move tail to oldhead
};

// console.log(head, tail, visit);
for (const [d, n] of parsedInput) {
  for (let i = 0; i < n; i++) {
    move(direction[d]);
  }
}
console.log("Visited", visit.size);
// console.log(await client.submit(1, visit.size));
process.exit();
