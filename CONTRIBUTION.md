# Contribution

To contribute to this repository you must run the command below.

## Install all dependencies

Before making code changes you must download all the required dependencies, especially downloading dev dependencies. You can use the command below.

```sh
npm i
```

## Prepare commit lint and pre-commit

This stage is necessary for automation of lint and prettier checks so that the code you write is in accordance with the rules that have been made.

```sh
npm run prepare
```

## Commit Git

Git messages should not be arbitrary you must comply with the rules described below.

Command: `git commit -m "<..type_commit>: <..message>"`

Example:

```sh
git commit -m "feat: add feature compress image"
```

| type commit | description                                                                                                 |
| ----------- | ----------------------------------------------------------------------------------------------------------- |
| feat        | A new feature                                                                                               |
| fix         | A bug fix                                                                                                   |
| docs        | Documentation only changes                                                                                  |
| style       | Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)      |
| refactor    | A code change that neither fixes a bug nor adds a feature                                                   |
| perf        | A code change that improves performance                                                                     |
| test        | Adding missing tests or correcting existing tests                                                           |
| build       | Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)         |
| ci          | Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs) |
| chore       | Other changes that don't modify src or test files                                                           |
| revert      | Reverts a previous commit                                                                                   |
