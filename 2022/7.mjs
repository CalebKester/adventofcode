import { AocClient } from "advent-of-code-client";

const day = 7;

const client = new AocClient({
  year: 2022, // the year of the challenge
  day, // the day of the challenge
  token: "", // the session cookie from adventofcode.com
});

const input = await client.getInput();
// const input = `$ cd /
// $ ls
// dir a
// 14848514 b.txt
// 8504156 c.dat
// dir d
// $ cd a
// $ ls
// dir e
// 29116 f
// 2557 g
// 62596 h.lst
// $ cd e
// $ ls
// 584 i
// $ cd ..
// $ cd ..
// $ cd d
// $ ls
// 4060174 j
// 8033020 d.log
// 5626152 d.ext
// 7214296 k`;

const parsedInput = input
  .split("$")
  .slice(1)
  .map((i) =>
    // remove all '\n' at the end of the line
    i.trim().replace(/\n$/, "")
  );

const buildFolder = (ls, pwd) => {
  const folder = {
    name: pwd,
    localsize: 0,
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
      folder.localsize += file.size;
      folder.files.push(file);
    }
  });

  return folder;
};

const drive = [];

const location = "";

// console.log(parsedInput);
let pwd = "";

parsedInput.forEach((i) => {
  if (i.startsWith("cd")) {
    // get the folder name
    const folderName = i.substring(3);
    if (folderName === "/") {
      pwd = "/";
    } else if (folderName === "..") {
      pwd = pwd.split(">").slice(0, -1).join(">");
    } else {
      pwd = `${pwd}>${folderName}`;
    }
  }
  if (i.startsWith("ls")) {
    const folder = buildFolder(i.substring(3), pwd);
    drive.push(folder);
  }
});

// console.log(buildFolder(`dir a\n14848514 b.txt\n8504156 c.dat\ndir d`));

// console.log("drive", drive);
const calcSize = (folder) => {
  if (folder.folders.length === 0) {
    return folder.localsize;
  }
  return (
    folder.localsize +
    folder.folders.reduce((acc, i) => {
      const folder = drive.find((j) => j.name === i);
      return acc + calcSize(folder);
    }, 0)
  );
  // calcSize(folder.folders);
};

const driveSizes = drive.map((i) => {
  return {
    ...i,
    size: calcSize(i),
  };
});

// console.log("drive", driveSizes);

// const largeDrives = driveSizes.filter((i) => i.size <= 100000);

// const countSize = largeDrives.reduce((acc, i) => acc + i.size, 0);

// console.log(countSize);
// console.log(await client.submit(1, countSize));

const totalSpace = 70000000;
const updateSize = 30000000;

// 48381165
const currentSpace = driveSizes.find((i) => i.name === "/").size;

// 21618835
const unusedSpace = totalSpace - currentSpace;
const neededspace = updateSize - unusedSpace;

const sortedDrives = driveSizes.sort((a, b) => a.size - b.size);

// console.log(sortedDrives);

const findDriveThatWillFit = sortedDrives.find((i) => i.size >= neededspace);

console.log(findDriveThatWillFit.size);
console.log(await client.submit(2, findDriveThatWillFit.size));

process.exit();
