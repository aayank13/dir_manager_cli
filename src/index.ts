#!/usr/bin/env ts-node

import { Command } from "commander";
import figlet from "figlet";
import fs from "fs";
import path from "path";

const program = new Command();

console.log(figlet.textSync("Dir Manager"));

program
  .version("0.1.2")
  .description("A CLI tool for managing directories and files")
  .option("-l, --ls [value]", "List directory contents")
  .option("-m, --mkdir <value>", "Create a directory")
  .option("-t, --touch <value>", "Create a file")
  .parse(process.argv);

const options = program.opts();

interface FileDetails {
  name: string;
  type: "File" | "Directory";
  size: string;
  created: string;
  modified: string;
}

// List directory contents
async function listDirContents(filepath: string): Promise<void> {
  try {
    const resolvedPath = path.resolve(filepath);
    const files = await fs.promises.readdir(resolvedPath);

    const detailedFilesPromises = files.map(async (file): Promise<FileDetails> => {
      const fullPath = path.join(resolvedPath, file);
      const stats = await fs.promises.lstat(fullPath);

      return {
        name: file,
        type: stats.isDirectory() ? "Directory" : "File",
        size: `${stats.size} bytes`,
        created: stats.birthtime.toLocaleString(),
        modified: stats.mtime.toLocaleString(),
      };
    });

    const detailedFiles = await Promise.all(detailedFilesPromises);
    console.table(detailedFiles);
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

// Handle `ls` option
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