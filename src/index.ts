#!/usr/bin/env ts-node

import { Command } from "commander";
import figlet from "figlet";
import fs from "fs";
import path from "path";

const program = new Command();

console.log(figlet.textSync("Dir Manager"));

program
  .version("0.1.3")
  .description("A CLI tool for managing directories and files")
  .option("-l, --ls [value]", "List directory contents")
  .option("-m, --mkdir <value>", "Create a directory")
  .option("-t, --touch <value>", "Create a file")
  .option("--type <value>", "Filter by file type (e.g., .txt)")
  .option("--min-size <value>", "Minimum file size in bytes")
  .option("--max-size <value>", "Maximum file size in bytes")
  .option("--start-date <value>", "Start modification date (YYYY-MM-DD)")
  .option("--end-date <value>", "End modification date (YYYY-MM-DD)")
  .option("--regex <value>", "Regex pattern for filenames")
  .parse(process.argv);

const options = program.opts();

interface FileDetails {
  name: string;
  type: "File" | "Directory";
  size: string;
  created: string;
  modified: string;
}

// List directory contents with filtering
async function listDirContents(filepath: string): Promise<void> {
  try {
    const resolvedPath = path.resolve(filepath);
    const files = await fs.promises.readdir(resolvedPath);

    const detailedFilesPromises = files.map(async (file): Promise<FileDetails | null> => {
      const fullPath = path.join(resolvedPath, file);
      const stats = await fs.promises.lstat(fullPath);

      const matchesType = !options.type || file.endsWith(options.type);
      const matchesSize =
        (!options.minSize || stats.size >= Number(options.minSize)) &&
        (!options.maxSize || stats.size <= Number(options.maxSize));
      const matchesDate =
        (!options.startDate || new Date(stats.mtime) >= new Date(options.startDate)) &&
        (!options.endDate || new Date(stats.mtime) <= new Date(options.endDate));
      const matchesRegex = !options.regex || new RegExp(options.regex).test(file);

      if (matchesType && matchesSize && matchesDate && matchesRegex) {
        return {
          name: file,
          type: stats.isDirectory() ? "Directory" : "File",
          size: `${stats.size} bytes`,
          created: stats.birthtime.toLocaleString(),
          modified: stats.mtime.toLocaleString(),
        };
      }

      return null;
    });

    const detailedFiles = (await Promise.all(detailedFilesPromises)).filter(Boolean) as FileDetails[];

    if (detailedFiles.length > 0) {
      console.table(detailedFiles);
    } else {
      console.log("No files matched the given criteria.");
    }
  } catch (error) {
    console.error(`Error listing directory contents: ${(error as Error).message}`);
  }
}

// Create a new directory
async function createDir(filepath: string): Promise<void> {
  try {
    const resolvedPath = path.resolve(filepath);
    if (!fs.existsSync(resolvedPath)) {
      await fs.promises.mkdir(resolvedPath);
      console.log("Directory created successfully:", resolvedPath);
    } else {
      console.log("Directory already exists:", resolvedPath);
    }
  } catch (error) {
    console.error(`Error creating directory: ${(error as Error).message}`);
  }
}

// Create a new file
async function createFile(filepath: string): Promise<void> {
  try {
    const resolvedPath = path.resolve(filepath);
    await fs.promises.writeFile(resolvedPath, "");
    console.log("File created successfully:", resolvedPath);
  } catch (error) {
    console.error(`Error creating file: ${(error as Error).message}`);
  }
}

// Handle `ls` option with advanced filtering
if (options.ls !== undefined) {
  const filepath = options.ls === true ? process.cwd() : options.ls;
  listDirContents(filepath);
}

// Handle `mkdir` option
if (options.mkdir) {
  createDir(options.mkdir);
}

// Handle `touch` option
if (options.touch) {
  createFile(options.touch);
}

// Show help if no arguments are passed
if (!process.argv.slice(2).length) {
  program.outputHelp();
}