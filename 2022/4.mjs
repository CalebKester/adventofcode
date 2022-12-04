import { AocClient } from "advent-of-code-client";

const day = 4;

const client = new AocClient({
  year: 2022, // the year of the challenge
  day, // the day of the challenge
  token: "", // the session cookie from adventofcode.com
});

const input = await client.getInput();

// const input = `2-4,6-8
// 2-3,4-5
// 5-7,7-9
// 2-8,3-7
// 6-6,4-6
// 2-6,4-8`;
// In this example, there are 2 such pairs
// In how many assignment pairs does one range fully contain the other?

// split the line into 4 ranges based on = or ,
const parsedInput = input
  .split("\n")
  .map((line) => line.split(/,|=|-/g).map((i) => Number(i)));

// Some of the pairs have noticed that one of their assignments fully contains the other. For example, 2-8 fully contains 3-7, and 6-6 is fully contained by 4-6.

const fullyContainCheck = (a1, a2, b1, b2) => {
  if (a1 >= b1 && a2 <= b2) return 1;
  if (b1 >= a1 && b2 <= a2) return 1;
  return 0;
};

const countContain = parsedInput.reduce(
  (acc, [a1, a2, b1, b2]) => acc + fullyContainCheck(a1, a2, b1, b2),
  0
);

console.log(parsedInput);
console.log(countContain);

const partialContainCheck = (a1, a2, b1, b2) => {
  if (a1 >= b1 && a1 <= b2) return 1;
  if (a2 >= b1 && a2 <= b2) return 1;
  if (b1 >= a1 && b1 <= a2) return 1;
  if (b2 >= a1 && b2 <= a2) return 1;
  return 0;
};

const countPartialContain = parsedInput.reduce(
  (acc, [a1, a2, b1, b2]) => acc + partialContainCheck(a1, a2, b1, b2),
  0
);

console.log(countPartialContain);

// console.log(await client.submit(2, countPartialContain));
