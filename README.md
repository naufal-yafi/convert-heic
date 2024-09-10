# Image Converter

This tool is used to convert .HEIC image format to .jpg by utilizing the NPM package [heic-convert](https://www.npmjs.com/package/heic-convert).

The equipment that must be prepared is only [NodeJS](https://nodejs.org/en). If NodeJS is already installed, download all the dependencies needed by typing `npm i`.

# Table of Contents

- [Image Converter](#image-converter)
- [Table of Contents](#table-of-contents)
  - [Convert Image](#convert-image)
  - [Custom Name Output Files](#custom-name-output-files)
  - [Duplicate Image](#duplicate-image)
    - [Command](#command)
    - [Example Duplicate One File](#example-duplicate-one-file)
    - [Example Custom Duplicate](#example-custom-duplicate)
  - [Clear Result Files](#clear-result-files)
    - [Command](#command-1)
    - [Example](#example)

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

## Duplicate Image

To duplicate an image **you must have 1 file** with the format _[HEIC, jpg, jpeg, png]_ in `./import`.

### Command

`node app duplicate <..ext> <..count_loops>`

Descriptions:

- <..ext> : image extension format you can use HEIC, jpg, jpeg, or png
- <..count_loops> : how many images you want to duplicate, default = 1

### Example Duplicate One File

```sh
node app duplicate jpg
```

Output:

```sh
Available Files:
[1] IMG_20240816_150159_725.jpg

Selected files: IMG_20240816_150159_725.jpg

Total duplicate: 1
Duplicate: export/duplicate-images/IMG_1_20240910-16.11.05.757_duplicated.jpg
```

### Example Custom Duplicate

```sh
node app duplicate jpg 7
```

Output:

```sh
Available Files:
[1] IMG_20240816_150159_725.jpg

Selected files: IMG_20240816_150159_725.jpg

Total duplicate: 7
Duplicate: export/duplicate-images/IMG_1_20240910-16.13.13.670_duplicated.jpg
Duplicate: export/duplicate-images/IMG_2_20240910-16.13.13.670_duplicated.jpg
Duplicate: export/duplicate-images/IMG_3_20240910-16.13.13.670_duplicated.jpg
Duplicate: export/duplicate-images/IMG_4_20240910-16.13.13.670_duplicated.jpg
Duplicate: export/duplicate-images/IMG_6_20240910-16.13.13.670_duplicated.jpg
Duplicate: export/duplicate-images/IMG_5_20240910-16.13.13.670_duplicated.jpg
Duplicate: export/duplicate-images/IMG_7_20240910-16.13.13.670_duplicated.jpg
```

[[Table of Contents](#table-of-contents)]

## Clear Result Files

This command can automatically delete all conversions that you have done in the `./export` folder.

### Command

`node app clear`

### Example

```sh
node app clear
```

Output:

```sh
Deleting... on folder ./export/duplicate-images
Delete: IMG_1_20240910-16.13.13.670_duplicated.jpg
Delete: IMG_1_20240910-16.11.05.757_duplicated.jpg
Delete: IMG_2_20240910-16.13.13.670_duplicated.jpg
Delete: IMG_3_20240910-16.13.13.670_duplicated.jpg
Delete: IMG_4_20240910-16.13.13.670_duplicated.jpg
Delete: IMG_5_20240910-16.13.13.670_duplicated.jpg
Delete: IMG_6_20240910-16.13.13.670_duplicated.jpg
Delete: IMG_7_20240910-16.13.13.670_duplicated.jpg
```

[[Table of Contents](#table-of-contents)]
