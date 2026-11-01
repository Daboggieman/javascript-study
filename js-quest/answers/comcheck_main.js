// Write your solution here
process.argv = ['find the THEE in this sentence', 't'];

const insert = process.argv;

for (const ch of insert[0]) {
  if (ch === insert[1]) {
    console.log('\x1b[32m ALERT \x1b[0m');
  } else {
    console.log(`found no instance of ${insert[1]} in the passed argument`);
  }
}
