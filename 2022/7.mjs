import { AocClient } from "advent-of-code-client";

const day = 7;

const client = new AocClient({
  year: 2022, // the year of the challenge
  day, // the day of the challenge
  token: "", // the session cookie from adventofcode.com
});

// const input = await client.getInput();
const input = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;

const parsedInput = input.split("$").slice(1);

const buildFolder = (ls) => {
  console.log("Building Folder", ls);
  const folder = {
    name: "/",
    size: 0,
    folders: [],
    files: [],
  };

  // Parse our folder and look to it's children
  ls.split("\n").forEach((i) => {
    if (i.includes("dir")) {
      folder.folders.push(`${folder.name}>${i.substring(4)}`);
    } else {
      const file = {
        size: Number(i.split(" ")[0]),
        name: i.split(" ")[1],
      };
      folder.size += file.size;
      folder.files.push(file);
    }
  });

  return folder;
};

const drive = [];

const location = "";

console.log(parsedInput);

parsedInput.forEach((i) => {});

console.log(buildFolder(`dir a\n14848514 b.txt\n8504156 c.dat\ndir d`));
