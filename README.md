A tool for generating XML from TS and TSDoc.

This is a work-in-progress, and currently doesn't do anything useful.

# To run

```sh
git clone git@github.com:wvbe/tsdoc-xml
cd tsdoc-xml
npm link
```

```sh
cd ../my-ts-project
tsdoc-xml src/my-ts-file.ts
tsdoc-xml dist/my-ts-file.d.ts
```

# To develop

Keep `npm start` running, it is a watch task that compiles the TS of this project into the NodeJS code that runs in the
`tsdoc-xml` executable.
