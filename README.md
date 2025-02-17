# My CLI Project

This project is a command line interface (CLI) tool that provides various functionalities through a simple command line interface. The project is written in TypeScript and includes utilities for handling requirements in Markdown and Excel formats.

## Installation

To install the project, clone the repository and run the following command in the project directory:

```
npm install
```

## Building the Project
To compile the TypeScript files to JavaScript, run the following command:

```
npm run build
```

This will generate the compiled JavaScript files in the dist direcitory.

## Testing the Project
The project uses jest and ts-jest for testing. To run the tests, use the following command:

```
npm test
```

This will run the tests using Jest and generate a coverage report in the coverage directory.

## Usage

To use the CLI, run the following command:

```
node bin/cli.js [options]
```

Replace `[options]` with the appropriate command line arguments for the functionality you wish to access.

## Commands

- `command1`: Description of command1.
- `command2`: Description of command2.

## Functions in the util Library
The util library contains the following functions:

writeRequirement
`function writeRequirement(reqmntID: string, reqmntCat: string, reqmntTitle: string, description: string): void`

Writes a requirement to a Markdown file with the name Req{reqmntID}.md. The content includes the ID, category, title, and description of the requirement.

readRequirement

Reads a requirement from a Markdown file with the name Req{reqmntID}.md and returns an object containing the ID, category, title, and description of the requirement.



## Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.
