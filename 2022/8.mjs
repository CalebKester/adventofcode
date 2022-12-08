import { AocClient } from "advent-of-code-client";

const day = 8;

const client = new AocClient({
  year: 2022, // the year of the challenge
  day, // the day of the challenge
  token: "", // the session cookie from adventofcode.com
});

const input = await client.getInput();
// const input = `30373
// 25512
// 65332
// 33549
// 35390`;

const parsedInput = input
  .split("\n")
  .map((i) => i.split("").map((j) => Number(j)));

const countTrees = (value, trees) => {
  const largestIndex = trees.findIndex((t) => t >= value);
  if (largestIndex === -1) {
    return trees.length;
  }
  return largestIndex + 1;
};

// The top-left 5 is visible from the left and top. (It isn't visible from the right or bottom since other trees of height 5 are in the way.)
const checkHeight = (x, y) => {
  const value = parsedInput[y][x];
  const left = parsedInput[y].slice(0, x).reverse();
  const right = parsedInput[y].slice(x + 1);
  const top = parsedInput
    .slice(0, y)
    .map((i) => i[x])
    .reverse();
  const bottom = parsedInput.slice(y + 1).map((i) => i[x]);
  // console.log(top, left, right, bottom, value);
  const score =
    countTrees(value, top) *
    countTrees(value, left) *
    countTrees(value, right) *
    countTrees(value, bottom);
  return score;
  // console.log(
  //   `top: ${countTrees(value, top)}`,
  //   `left: ${countTrees(value, left)}`,
  //   `right: ${countTrees(value, right)}`,
  //   `bottom: ${countTrees(value, bottom)}`
  // );
  const isVisibleLeft = !left.some((i) => i >= value);
  // console.log(`isVisibleLeft: ${isVisibleLeft}`);
  const treesVisibleRight = !right.some((i) => i >= value);
  console.log(`treesVisibleRight: ${treesVisibleRight}`);
  return (
    !right.some((i) => i >= value) ||
    !left.some((i) => i >= value) ||
    !top.some((i) => i >= value) ||
    !bottom.some((i) => i >= value)
  );
};

// console.log(parsedInput);

// console.log(checkHeight(2, 3));

const treesVisible = parsedInput.map((y, yi) =>
  y.map((x, xi) => checkHeight(xi, yi))
);

console.log(treesVisible);

const largestTree = treesVisible.reduce((acc, i) => Math.max(acc, ...i), 0);

console.log(largestTree);

// const countTreeVisible = treesVisible.reduce(
//   (acc, i) => acc + i.filter((j) => j).length,
//   0
// );

// console.log(countTreeVisible);

// console.log(await client.submit(2, largestTree));
process.exit();
