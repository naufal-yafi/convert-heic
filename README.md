# Convert Heic

This tool is used to convert .HEIC image format to .jpg by utilizing the NPM package [heic-convert](https://www.npmjs.com/package/heic-convert).

The equipment that must be prepared is only [NodeJS](https://nodejs.org/en). If NodeJS is already installed, download all the dependencies needed by typing `npm i`.

# Table of Contents

- [Convert Heic](#convert-heic)
- [Table of Contents](#table-of-contents)
  - [Convert Image](#convert-image)
  - [Custom Name Output Files](#custom-name-output-files)
  - [Clear Result Files on Folder ./export](#clear-result-files-on-folder-export)
  - [Clear Files .HEIC on Folder ./import](#clear-files-heic-on-folder-import)
  - [Duplicate Files](#duplicate-files)
  - [Custom Duplicate Files](#custom-duplicate-files)

## Convert Image

```sh
node index -c
```

Output:

```sh
Total Images: 15
If your file is small then the porcess needed does'nt take a lot of time.

Process (0/15) Starting
Convert (1/14) Please Wait...
Convert (2/13) Please Wait...
Convert (3/12) Please Wait...
...
Process (15/0) Completed

Success: Conversion has been successful.
{ start: '10:03:11', end: '10:03:58', time: '47s' }
```

Result:

```
├── export
|   ├── IMG-0-20230823-10.03.14.703.jpg
|   ├── IMG-1-20230823-10.03.17.952.jpg
│   ├── IMG-3-20230823-10.03.24.237.jpg
│   └── ...
```

[[Table of Contents](#table-of-contents)]

## Custom Name Output Files

```sh
node index -c --name [custom-name-file]
```

Example:

```sh
node index -c --name flowers
```

Output:

```sh
Total Images: 15
If your file is small then the porcess needed does'nt take a lot of time.

Process (0/15) Starting
Convert (1/14) Please Wait...
Convert (2/13) Please Wait...
Convert (3/12) Please Wait...
...
Process (15/0) Completed

Success: Conversion has been successful.
{ start: '10:11:33', end: '10:12:20', time: '47s' }
```

Result:

```
├── export
|   ├── flowers-0-20230823-10.11.37.134.jpg
|   ├── flowers-1-20230823-10.11.40.321.jpg
│   ├── flowers-3-20230823-10.11.46.463.jpg
│   └── ...
```

[[Table of Contents](#table-of-contents)]

## Clear Result Files on Folder ./export

```sh
node index clear -e
```

OR

```sh
node index clear --export
```

[[Table of Contents](#table-of-contents)]

## Clear Files .HEIC on Folder ./import

```sh
node index clear -i
```

OR

```sh
node index clear --import
```

Output:

```sh
Deleted file: import\IMG_10_20230823-09.50.04.509_duplicated.HEIC
Deleted file: import\IMG_2_20230823-09.50.04.508_duplicated.HEIC
Deleted file: import\IMG_1_20230823-09.50.04.507_duplicated.HEIC
...
```

[[Table of Contents](#table-of-contents)]

## Duplicate Files

Will be duplicated by 10 files in the `./duplicate_here` folder.

```sh
node index -g
```

If there are many files in the `./duplicate_here` folder, the bottom file will be selected.

```sh
$ node index -g
Available Files:
[1] IMG_1842.HEIC
[2] IMG_1849.HEIC

Selected files: IMG_1849.HEIC

Total Duplicate: 10
Success duplicate:  import\IMG_2_20230823-09.50.04.508_duplicated.HEIC
Success duplicate:  import\IMG_1_20230823-09.50.04.507_duplicated.HEIC
...
```

## Custom Duplicate Files

If you want to duplicate more than 10 files or less than 10 files, use this command.

```sh
node index -g [many-files-to-be-generated]
```

Example:

```sh
node index -g 5
```

Output:

```sh
$ node index -g
Available Files:
[1] IMG_1842.HEIC
[2] IMG_1849.HEIC

Selected files: IMG_1849.HEIC

Total Duplicate: 5
Success duplicate:  import\IMG_2_20230823-09.57.25.650_duplicated.HEIC
Success duplicate:  import\IMG_1_20230823-09.57.25.649_duplicated.HEIC
Success duplicate:  import\IMG_4_20230823-09.57.25.650_duplicated.HEIC
Success duplicate:  import\IMG_3_20230823-09.57.25.650_duplicated.HEIC
Success duplicate:  import\IMG_5_20230823-09.57.25.650_duplicated.HEIC
...
```

[[Table of Contents](#table-of-contents)]
