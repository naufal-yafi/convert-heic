# Image Converter

This tool is used to

- convert .HEIC image format to .jpg by utilizing the NPM package [heic-convert](https://www.npmjs.com/package/heic-convert)

The equipment that must be prepared is only [NodeJS](https://nodejs.org/en). If NodeJS is already installed, download all the dependencies needed by typing `npm i`.

# Table of Contents

- [Image Converter](#image-converter)
- [Table of Contents](#table-of-contents)
  - [Convert Image](#convert-image)
    - [Command](#command)
    - [Example Convert HEIC to JPEG](#example-convert-heic-to-jpeg)
    - [Example Convert HEIC to PNG](#example-convert-heic-to-png)
    - [Example Export Custom File Name](#example-export-custom-file-name)
  - [Duplicate Image](#duplicate-image)
    - [Command](#command-1)
    - [Example Duplicate One File](#example-duplicate-one-file)
    - [Example Custom Duplicate](#example-custom-duplicate)
  - [Clear Result Files](#clear-result-files)
    - [Command](#command-2)
    - [Example](#example)

## Convert Image

! Previously fill the `./import` folder with image files according to the required extension

```
├── import
|   ├── IMG-5892.HEIC
|   ├── IMG-5893.HEIC
│   └── ...
```

To convert image from HEIC to JPEG or PNG  
To convert JPEG, PNG, JPG to WEBP

### Command

`node app convert <-f or --from> <..input_ext> <-t or --to> <..output_ext>`

Descriptions:

- <..input_ext> : extension format input file on `./import` you can field [HEIC, JPEG, PNG, JPG]
- <..output_ext> : extension format output file on `./export` you can field [JPEG, PNG, WEBP]

### Example Convert HEIC to JPEG

```sh
node app convert -f HEIC -t JPEG
```

Output:

```sh
Total images: 2
If your file is small in size, it won't take much time to process.

Process (0/2) Starting
Process (1/1) Please Wait...
Process (2/0) Completed

Success: Conversion has been successful
{ start: '17:38:49', end: '17:38:58', duration: '9s' }
```

```
├── export/convert-heic
|   ├── IMG-1-20240910-17.38.53.197.JPEG
|   ├── IMG-2-20240910-17.38.58.692.JPEG
│   └── ...
```

[[Table of Contents](#table-of-contents)]

### Example Convert HEIC to PNG

```sh
node app convert -f HEIC -t PNG
```

Output:

```sh
Total images: 2
If your file is small in size, it won't take much time to process.

Process (0/2) Starting
Process (1/1) Please Wait...
Process (2/0) Completed

Success: Conversion has been successful
{ start: '17:41:25', end: '17:41:36', duration: '11s' }
```

```
├── export/convert-heic
|   ├── IMG-1-20240910-17.41.29.812.PNG
|   ├── IMG-2-20240910-17.41.36.373.PNG
│   └── ...
```

[[Table of Contents](#table-of-contents)]

### Example Export Custom File Name

```sh
node app convert -f HEIC -t JPEG hut-ri-79
```

Output:

```sh
Total images: 2
If your file is small in size, it won't take much time to process.

Process (0/2) Starting
Process (1/1) Please Wait...
Process (2/0) Completed

Success: Conversion has been successful
{ start: '17:44:56', end: '17:45:05', duration: '9s' }
```

```
├── export/convert-heic
|   ├── hut-ri-79-1-20240910-17.44.59.985.JPEG
|   ├── hut-ri-79-2-20240910-17.45.05.179.JPEG
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
