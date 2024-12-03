import { AocClient } from "advent-of-code-client";
import "dotenv/config";

const client = new AocClient({
  year: 2024, // the year of the challenge
  day: 3, // the day of the challenge
  token: process.env.SESSION, // the session cookie from adventofcode.com
});

const part = parseInt(process.argv[2]);
const submit = !!process.argv[3];

if (![1, 2].includes(part)) {
  console.log("Please provide a valid part number");
  process.exit(1);
}

let input = await client.getInput();

const test = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;

console.log(process.argv[2]);

if (part === 1 && submit) {
  console.log("Submitting part 1");
  // Submit part 1
  // await client.submit(1, report.length);
} else if (part === 2 && submit) {
  console.log("Submitting part 2");
  // await client.submit(2, report.length);
} else {
  console.log("Dry run only");
}
process.exit(0);
