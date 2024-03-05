# Manipulating files using Nodejs and the `fs` module

In this exercise, you will create a simple Node.js script that reads a file and writes to a file using the `fs` module.

## Instructions

1. Create a new file named `persons.json` and write a JSON array with the following structure:

```json
[
  {
    "name": "John Doe",
    "age": 30,
    "city": "New York"
  },
  {
    "name": "Jane Doe",
    "age": 25,
    "city": "Los Angeles"
  }
]
```

2. Create a new file named `file.js` and write a script that reads the `persons.json` file and prints the content to the console.

3. Sort the array by the `name` property and print the sorted array to the console.

4. Create a new file folder named results and write the sorted array to a file named `sorted-persons.json`.

5. If the folder already exists don't throw an error, just write the file.

5. Test your scripts by running them using the `node` command.

## Documentation

- Reading files using the `fs` module: https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback
- Writing files using the `fs` module: https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback

## Advanced

Find a way of doing this with promises and async/await.

