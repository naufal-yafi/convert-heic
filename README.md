# Image Converter

This tool is used to

- convert `.HEIC` image format to `.jpeg`/`.png` by utilizing the NPM package [heic-convert](https://www.npmjs.com/package/heic-convert)
- convert `.png`/`.jpeg`/`.jpg` image format to `.webp` by utilizing the NPM package [sharp](https://www.npmjs.com/package/sharp)

The equipment that must be prepared is only [NodeJS](https://nodejs.org/en). If NodeJS is already installed, download all the dependencies needed by typing

```sh
npm install --production
```

To clear all result convert you can use

```sh
node app clear
```

Or read more [[How Clear Result Files](#clear-result-files)]

# Table of Contents

- [Image Converter](#image-converter)
- [Table of Contents](#table-of-contents)
  - [Convert Image](#convert-image)
    - [HEIC](#heic)
      - [Command](#command)
      - [Convert HEIC to JPEG](#convert-heic-to-jpeg)
      - [Convert HEIC to PNG](#convert-heic-to-png)
      - [Export Custom File Name](#export-custom-file-name)
    - [WEBP](#webp)
      - [Command](#command-1)
      - [Convert PNG to WEBP](#convert-png-to-webp)
      - [Convert JPEG to WEBP](#convert-jpeg-to-webp)
      - [Convert JPG to WEBP](#convert-jpg-to-webp)
      - [Custom Quality](#custom-quality)
      - [Custom Output Name File](#custom-output-name-file)
      - [Custom Quality andOutput Name File](#custom-quality-andoutput-name-file)
  - [Duplicate Image](#duplicate-image)
    - [Command](#command-2)
    - [Example Duplicate One File](#example-duplicate-one-file)
    - [Example Custom Duplicate](#example-custom-duplicate)
  - [Clear Result Files](#clear-result-files)
    - [Command](#command-3)
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

### HEIC

#### Command

`node app convert <-f or --from> <..input_ext> <-t or --to> <..output_ext> --name <..custom_name_file>`

Descriptions:

- <..input_ext> : extension format input file on `./import` you can field `heic`
- <..output_ext> : extension format output file on `./export` you can field `jpeg` or `png`
- --name <..name_file> : **(optional)** custom output name file

#### Convert HEIC to JPEG

```sh
node app convert -f heic -t jpeg
```

Output:

```sh
Total images: 2
If your file is small in size, it won't take much time to process.

Process (0/2) Starting
Process (1/1) Please Wait...
{
  file: {
    input: './import/IMG_5892.HEIC',
    output: './export/convert-heic/IMG-1-20240912-03.37.43.796.jpeg'
  },
  size: { before: '1.04 MB', after: '2.48 MB' }
}
Process (2/0) Completed
{
  file: {
    input: './import/IMG_5893.HEIC',
    output: './export/convert-heic/IMG-2-20240912-03.37.49.146.jpeg'
  },
  size: { before: '4.75 MB', after: '7.65 MB' }
}

Success: Conversion has been successful
{ start: '03:37:40', end: '03:37:49', duration: '9s' }
```

```
├── export/convert-heic
|   ├── IMG-1-20240912-03.37.43.796.jpeg
|   ├── IMG-2-20240912-03.37.49.146.jpeg
│   └── ...
```

[[Table of Contents](#table-of-contents)]

#### Convert HEIC to PNG

```sh
node app convert -f heic -t png
```

Output:

```sh
Total images: 2
If your file is small in size, it won't take much time to process.

Process (0/2) Starting
Process (1/1) Please Wait...
{
  file: {
    input: './import/IMG_5892.HEIC',
    output: './export/convert-heic/IMG-1-20240912-03.39.28.51.png'
  },
  size: { before: '1.04 MB', after: '13.21 MB' }
}
Process (2/0) Completed
{
  file: {
    input: './import/IMG_5893.HEIC',
    output: './export/convert-heic/IMG-2-20240912-03.39.34.95.png'
  },
  size: { before: '4.75 MB', after: '28.86 MB' }
}

Success: Conversion has been successful
{ start: '03:39:23', end: '03:39:34', duration: '11s' }
```

```
├── export/convert-heic
|   ├── IMG-1-20240912-03.39.28.51.png
|   ├── IMG-2-20240912-03.39.34.95.png
│   └── ...
```

[[Table of Contents](#table-of-contents)]

#### Export Custom File Name

Command: `node app convert -f heic -t ..jpeg/png --name ..custom_name_file`

Example:

```sh
node app convert -f heic -t jpeg --name hut-ri-79
```

Output:

```sh
Total images: 2
If your file is small in size, it won't take much time to process.

Process (0/2) Starting
Process (1/1) Please Wait...
{
  file: {
    input: './import/IMG_5892.HEIC',
    output: './export/convert-heic/hut-ri-79-1-20240912-03.40.59.326.jpeg'
  },
  size: { before: '1.04 MB', after: '2.48 MB' }
}
Process (2/0) Completed
{
  file: {
    input: './import/IMG_5893.HEIC',
    output: './export/convert-heic/hut-ri-79-2-20240912-03.41.04.556.jpeg'
  },
  size: { before: '4.75 MB', after: '7.65 MB' }
}

Success: Conversion has been successful
{ start: '03:40:55', end: '03:41:04', duration: '9s' }
```

```
├── export/convert-heic
|   ├── hut-ri-79-1-20240912-03.40.59.326.jpeg
|   ├── hut-ri-79-2-20240912-03.41.04.556.jpeg
│   └── ...
```

[[Table of Contents](#table-of-contents)]

### WEBP

#### Command

`node app convert <-f or --from> <..input_ext> <-t or --to> webp <..options>`

Descriptions:

- <..input_ext> : extension format input file on `./import` you can field [png, jpeg, jpg]
- <..options> : **(optional)** custom quality and custom output file name
  - --quality: you can field only number 1-**100** `default=80`
  - --name: custom output name file

#### Convert PNG to WEBP

```sh
node app convert -f png -t webp
```

#### Convert JPEG to WEBP

#### Convert JPG to WEBP

```sh
node app convert -f jpg -t webp
```

Output:

```sh
If your file is small in size, it won't take much time to process.

Process (0/1) Starting
Process (1/0) Completed
{ size: { before: '3.49 MB', after: '0.71 MB', compressed: '79.54%' } }

Success: Conversion has been successful
{ start: '14:09:45', end: '14:09:47', duration: '2s' }
```

```
├── export/convert-webp
|   ├── IMG-1-20240911-14.09.45.702.webp
│   └── ...
```

#### Custom Quality

#### Custom Output Name File

#### Custom Quality andOutput Name File

[[Table of Contents](#table-of-contents)]

## Duplicate Image

To duplicate an image **you must have 1 file** with the format _[HEIC, jpg, jpeg, png]_ in `./import`.

### Command

`node app duplicate <..ext> <..count_loops>`

Descriptions:

- <..ext> : image extension format you can use HEIC, jpg, jpeg, or png
- <..count_loops> : **(optional)** how many images you want to duplicate, **default = 1**

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
