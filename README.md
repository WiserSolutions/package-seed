# package-seed

Default setup for a JavaScript library package

## Use

Create a new folder where you want to start a new package or check out a new, empty repository.
Run the following from that folder:

```sh
npx @wisersolutions/package-seed
```

This will copy all sources from the seed package to your folder and replace all mentions of
`package-seed` with the name of your folder. Note that various parts will need clean-up, e.g.
this part of README or the `author`, `bin`, and (most importantly) `files` keys in `package.json`.

## Development

### Install

Install dependencies using:

```sh
npm install
```

### Develop

After you modify sources, run the following (or set up your IDE to do it for you):

- format the code using `npm run format`
- lint it using `npm run lint`
- test it using `npm test`

and fix the errors, if there are any.

### Publish

Publishing is done in two steps:

1. Create a new version tag and push it to the repository:
    ```sh
    npm version <patch|minor|major>
    git push --follow-tags
    ```
1. Build and publish the new version as a npm package:
    ```sh
    npm publish --access public
    ``` 
