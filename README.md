# Directory Manager CLI

[![npm](https://img.shields.io/npm/v/@aayank13/dir_manager)](https://www.npmjs.com/package/@aayank13/dir_manager)
[![license](https://img.shields.io/npm/l/@aayank13/dir_manager)](https://github.com/aayank13/dir_manager/blob/main/LICENSE)

A CLI tool for managing directories and files efficiently. It allows you to:
- List directory contents
- Create directories
- Create files

## Features

- List all files and subdirectories in a specified directory with detailed information.
- Create new directories.
- Create empty files.

## Installation

Install the CLI globally using npm:

```bash
npm install -g @aayank13/dir_manager
```

## Usage

Once installed, you can use the `dirmanager` command to manage directories and files.

### Commands

#### List Directory Contents
```bash
dirmanager --ls [path]
```
- **path** (optional): The directory to list. If omitted, it lists the current directory.

Example:
```bash
dirmanager --ls ./my-folder
```

#### Create a Directory
```bash
dirmanager --mkdir <directory-name>
```
- **directory-name**: The name of the directory to create.

Example:
```bash
dirmanager --mkdir new-folder
```

#### Create a File
```bash
dirmanager --touch <file-name>
```
- **file-name**: The name of the file to create.

Example:
```bash
dirmanager --touch new-file.txt
```

### Display Help
To display all available options:
```bash
dirmanager --help
```

## Examples

1. List the contents of the current directory:
   ```bash
   dirmanager --ls
   ```

2. Create a new directory named `my-dir`:
   ```bash
   dirmanager --mkdir my-dir
   ```

3. Create a new file named `example.txt`:
   ```bash
   dirmanager --touch example.txt
   ```

## Requirements
- Node.js v14 or higher.

## Contributing

Feel free to fork the repository and submit a pull request with your improvements.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Author

**Aayan**  
GitHub: [@aayank13](https://github.com/aayank13)  
NPM: [@aayank13](https://www.npmjs.com/~aayank13)
```

Feel free to add or customize sections like the demo or contributing guidelines.
