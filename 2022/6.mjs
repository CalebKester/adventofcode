import { AocClient } from "advent-of-code-client";

const day = 6;

const client = new AocClient({
  year: 2022, // the year of the challenge
  day, // the day of the challenge
  token:
    "", // the session cookie from adventofcode.com
});

const input = await client.getInput();
// bvwbjplbgvbhsrlpgdmjqwftvncz: first marker after character 5
// nppdvjthqldpwncqszvftbrmjlhg: first marker after character 6
// nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg: first marker after character 10
// zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw: first marker after character 11

// const input = `bvwbjplbgvbhsrlpgdmjqwftvncz`;
let temp = [];
let pos = 0;

const parsedInput = input.split("").reduce(
  (acc, cur, idx) => {
		if(temp.length === 14) { return; }
    if (temp.includes(cur)) {
			// create a new slice where we found it.
			const dupeIdx = temp.indexOf(cur);
      console.log("we found duplicate", [cur, dupeIdx, temp.join('')]);
			temp = [...temp.slice(dupeIdx + 1), cur];
			console.log(temp);
			if(temp.length === 14) { pos = idx; }
    } else {
      temp.push(cur);
			if(temp.length === 14) { pos = idx; }
    }
  },
  []
);

console.log(temp.join(''));
console.log(pos);

// 1530
// console.log(await client.submit(2, pos + 1));
