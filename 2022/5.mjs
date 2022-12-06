import { AocClient } from "advent-of-code-client";

const day = 5;

const client = new AocClient({
  year: 2022, // the year of the challenge
  day, // the day of the challenge
  token: "", // the session cookie from adventofcode.com
});

const input = await client.getInput();
// const input = `    [D]
// [N] [C]
// [Z] [M] [P]
//  1   2   3

// move 1 from 2 to 1
// move 3 from 1 to 3
// move 2 from 2 to 1
// move 1 from 1 to 2`;
const parsedInput = input.split("\n\n");

const cratesInput = parsedInput[0];
const count = Number(
  cratesInput.split("\n").slice(-1)[0].trim().split(" ").slice(-1)
);
// console.log("count", count);
const instructions = parsedInput[1].split("\n").map((line) => line.split(" "));

// Creates a crate object and cleans it up
const crates = cratesInput
  .split("\n")
  .slice(0, -1)
  .map((line) =>
    line.match(/.{1,4}/g).map((c) => c.trim().replace("[", "").replace("]", ""))
  )
  .reverse();

// console.log(crates);

// Create an array the size of count and fill it with empty arrays
const cratesArray = Array.from({ length: count }, () => []);
// console.log(cratesArray);
// for (let i = 0; i < count; i++) {
//   crateArr[i] = [];

//   crateArr[i].push(1);
// }

crates.forEach((x) => {
  x.forEach((y, i) => {
    if (y !== "") {
      cratesArray[i].push(y);
    }
  });
});

console.log(cratesArray);

instructions.forEach((i, z) => {
  const move = Number(i[1]);
  const from = Number(i[3]) - 1;
  const to = Number(i[5]) - 1;
  console.log(`move ${move} from ${from + 1} to ${to + 1}`);
  const temp = [];
  // for every move
  for (let j = 0; j < move; j++) {
    temp.push(cratesArray[from].pop());
  }
  console.log(temp);
  cratesArray[to] = [...cratesArray[to], ...temp.reverse()];
});

console.log(cratesArray);

const top = cratesArray.map((x) => x[x.length - 1]).join("");

console.log(top);

console.log(await client.submit(2, top));
