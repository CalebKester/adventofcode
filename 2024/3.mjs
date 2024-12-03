import { AocClient } from "advent-of-code-client";
import "dotenv/config";

const client = new AocClient({
  year: 2024, // the year of the challenge
  day: 3, // the day of the challenge
  token: process.env.SESSION, // the session cookie from adventofcode.com
});

const part = parseInt(process.argv[2]);
const submit = process.argv[3] === "submit";

if (![1, 2].includes(part)) {
  console.log("Please provide a valid part number");
  process.exit(1);
}

const api = await client.getInput();

const testApi =
  part === 1
    ? `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`
    : `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;

const input = process.argv[3] ? api : testApi;
console.log(input);

const regex = /mul\((\d+),(\d+)\)/g;

const regexToRemoveDontDo = /don't\([^)]*\)[\s\S]*?do\([^)]*\)/g;

const cleanedInput = input.replace(regexToRemoveDontDo, "");

console.log(cleanedInput);

const matches = [];
let match;
while ((match = regex.exec(cleanedInput)) !== null) {
  matches.push(match[0]);
}

// matches.map((match) => {
//   const [a, b] = match
//     .replace("mul(", "")
//     .replace(")", "")
//     .split(",")
//     .map((i) => parseInt(i));
// 	return a * b;
// });

const answer = matches.reduce((acc, match) => {
  const [a, b] = match
    .replace("mul(", "")
    .replace(")", "")
    .split(",")
    .map((i) => parseInt(i));
  return acc + a * b;
}, 0);

console.log(answer);

if (part === 1 && submit) {
  console.log("Submitting part 1");
  // Submit part 1
  await client.submit(1, answer);
} else if (part === 2 && submit) {
  console.log("Submitting part 2");
  await client.submit(2, answer);
} else {
  console.log("Dry run only");
}
process.exit(0);
