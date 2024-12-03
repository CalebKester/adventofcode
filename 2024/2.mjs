import { AocClient } from "advent-of-code-client";
import "dotenv/config";

const client = new AocClient({
  year: 2024, // the year of the challenge
  day: 2, // the day of the challenge
  token: process.env.SESSION, // the session cookie from adventofcode.com
});

let input = await client.getInput();

// console.log(input);

const test = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

const list = input
  // const list = test
  .split("\n")
  .map((line) => line.split(" ").map((i) => parseInt(i)));

console.log(list);

const checkReport = (levels) => {
  let direction = levels[1] - levels[0];

  return levels.findIndex((i, idx, arr) => {
    if (idx === 0) return false;

    const diff = i - arr[idx - 1];
    // Direction needs to be > 0
    if (direction === 0 || diff === 0) {
      console.log("❌ Direction needs to be > 0", diff);
      return true;
    }
    // Checks the sign of the direction
    if (Math.sign(direction) !== Math.sign(diff)) {
      console.log("❌ The levels are either all increasing or all decreasing");
      return true;
    }
    if (Math.abs(diff) < 1 || Math.abs(diff) > 3) {
      console.log(
        "❌ Any two adjacent levels differ by at least one and at most three",
        diff
      );
      return true;
    }
    return false;
  });
};

const report = list.filter((levels, idx) => {
  // levels is an array of 5 integers. write a reduce function that compares each element to the next one. It has to make sure all numbers are either increasing or decreasing. Try and use the reduce function to do this.

  let result = checkReport(levels);
  if (result === -1) {
    console.log(`Checking[${idx}] ${levels}`);
    console.log("✅");
    return true;
  }
  console.log(`Checking[${idx}] ${levels}`);

  return levels.some((level, idx, arr) => {
    const removeIdx = levels.filter((_, idx2) => idx2 !== idx);
    return checkReport(removeIdx) === -1;
  });
});

// console.log(report);
console.log(report.length);

// Submit part 1
// await client.submit(1, report.length);

// Submit part 2

// await client.submit(2, report.length);
process.exit(0);
