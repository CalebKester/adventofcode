import { AocClient } from "advent-of-code-client";

const day = 3;

const client = new AocClient({
  year: 2022, // the year of the challenge
  day, // the day of the challenge
  token: "", // the session cookie from adventofcode.com
});

const input = await client.getInput();

// const input = `vJrwpWtwJgWrhcsFMMfFFhFp
// jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
// PmmdzqPrVvPwwTWBwg
// wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
// ttgJtRGJQctTZtZT
// CrZsJsPPZsGzwwsLwLmpwMDw
// rNZNWvMZZmDDmwqNdZrWTqhJMhhgzggBhzBJBchQzzJJ
// pHlSVbVbFHgHBzzhQHqg
// nVsqGpbbtDtTNmrmfZ`;

// console.log(input);

const matchingItem = (s) => {
  const len = s.length;
  const p1 = s.slice(0, len / 2);
  const p2 = s.slice(len / 2);

  // Finds the similar characters in the two halves of the string
  return p1.split("").find((i) => p2.includes(i));
};

// Lowercase item types a through z have priorities 1 through 26.
// Uppercase item types A through Z have priorities 27 through 52.
const calcScore = (l) => {
  // Get ascii value of the character
  const ascii = l.charCodeAt(0);
  // if lowercase, subtract 96
  if (ascii >= 97 && ascii <= 122) return ascii - 96;
  // if uppercase, subtract 64 and add 26 to the score
  if (ascii >= 65 && ascii <= 90) return ascii - 64 + 26;
};

const backpack = input.split("\n").map((line) => {
  const letter = matchingItem(line);
  return calcScore(letter);
});

// Sum the backpack
const answer1 = backpack.reduce((a, b) => a + b, 0);

console.log(answer1);

// console.log(await client.submit(1, answer1));

const backpack2 = input.split("\n");

// take the input and create an array every 3 lines
const backpack3 = [];
for (let i = 0; i < backpack2.length; i += 3) {
  backpack3.push([backpack2[i], backpack2[i + 1], backpack2[i + 2]]);
}

console.log(backpack3);

const backpack4 = backpack3.map((x) => {
  const a = x[0].split("");
  const b = x[1].split("");
  const c = x[2].split("");
  const joined = `${x[1]}${x[2]}`.split("");
  // console.log(a, joined);
  // Count how many times a is in joined
  console.log(x[0], joined);
  console.log(a);
  // const letter = a.find(
  //   (i) => joined.reduce((a, b) => (b === i ? a + 1 : a), 0) === 3
  // );

  const letter = a.find(
    (letter) => b.find((i) => i === letter) && c.find((i) => i === letter)
  );

  console.log(letter);
  return calcScore(letter);
  // x.find(y => )
  // Count how many times y is in
  // p1.split("").find((i) => p2.includes(i));
});

console.log(backpack4);
const answer2 = backpack4.reduce((a, b) => a + b, 0);

console.log(answer2);

console.log(await client.submit(2, answer2));
