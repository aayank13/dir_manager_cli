import { Command } from 'commander';
import figlet from "figlet";
import fs from "fs";
import path from "path";

const program = new Command();

console.log(figlet.textSync("Directory Manager"));

program
  .version("0.1.0")
  .description("An CLI tool for managing a directory")
  .option("-l, --ls  [value]", "List directory contents")
  .option("-m, --mkdir <value>", "Create a directory")
  .option("-t, --touch <value>", "Create a file")
  .parse(process.argv);

const options = program.opts();

async function listDirContents(filepath: string) {
  try {
    const files = fs.promises.readdir(filepath);
    const detailedFilesPromises = (await files).map(async (file: string) => {
        let fileDetails = await fs.promises.lstat(path.resolve(filepath, file));
        const { size, birthtime, mtime } = fileDetails;
        return {
            filename: file,
            "size(bytes)": size,
            created_at: birthtime,
            modified_at: mtime
        };
    })

    const detailedFiles = await Promise.all(detailedFilesPromises);
    console.table(detailedFiles);

  }
    catch (error) {
        console.error("Error occured: " + error);
    }
}

if (options.ls) {
    const filepath = typeof options.ls === "string" ? options.ls : __dirname;
    listDirContents(filepath);
  }