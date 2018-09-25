# package-seed

Default setup for a JavaScript library package

## Use

Create a new folder where you want to start a new package or check out a new, empty repository.
Run the following from that folder:

```sh
npx @wisersolutions/package-seed
```

This will seed the new package with the default setup. Note that the package description needs
to be added manually.

_Note: The seed data expects the package to be hosted under the `WiserSolutions` GitHub organization.
If that's not the case, make sure to replace all instances of that label in the seeded sources._

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
