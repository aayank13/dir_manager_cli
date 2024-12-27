# Directory Manager CLI

[![npm](https://img.shields.io/npm/v/@aayank13/dir_manager)](https://www.npmjs.com/package/@aayank13/dir_manager)
[![license](https://img.shields.io/npm/l/@aayank13/dir_manager)](https://github.com/aayank13/dir_manager/blob/main/LICENSE)

A CLI tool for managing directories and files efficiently. It allows you to:
- List directory contents with detailed filtering options.
- Create directories and files.
- Filter and search files by type, size, date, and regex.

## Features

- **List directory contents**: View files and directories with detailed information, including size, creation date, and modification date.
- **Create directories**: Create new directories within the specified path.
- **Create files**: Quickly create empty files.
- **Advanced Search and Filtering**:
  - Filter by file type (e.g., `.txt`, `.js`).
  - Filter by file size (e.g., minimum or maximum size).
  - Filter by creation or modification date.
  - Use regular expressions to search for filenames.

## Installation

Install the CLI globally using npm:

```bash
npm install -g @aayank13/dir_manager
```

## Usage

Once installed, you can use the `dirmanager` command to manage directories and files.

### Commands

#### List Directory Contents with Filtering
```bash
dirmanager --ls [path] [options]
```
- **path** (optional): The directory to list. If omitted, it lists the current directory.
- **Options**:
  - `--type <file-type>`: Filter by file type (e.g., `.txt`, `.js`).
  - `--min-size <size>`: Minimum file size in bytes.
  - `--max-size <size>`: Maximum file size in bytes.
  - `--start-date <date>`: Filter files created or modified after a specific date (e.g., `2024-01-01`).
  - `--end-date <date>`: Filter files created or modified before a specific date.
  - `--regex <pattern>`: Regex pattern for filenames.

Example:
```bash
dirmanager --ls ./my-folder --type .txt --min-size 1024 --start-date 2024-01-01
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

1. **List the contents of the current directory with filtering**:
   ```bash
   dirmanager --ls --type .txt --min-size 1024 --start-date 2024-01-01
   ```
   - Displays all `.txt` files larger than 1KB modified after January 1st, 2024.

2. **Create a new directory named `my-dir`**:
   ```bash
   dirmanager --mkdir my-dir
   ```

3. **Create a new file named `example.txt`**:
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
Let me know if you'd like any further changes!
```