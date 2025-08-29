This is a reproducible repo that demonstrates an ESLint bug with in-memory relative paths (`tsconfigRootDir := "."`)

When you run below command, you'll get the error message:

```bash
git clone https://github.com/samchon/eslint-in-memory-relative-path-bug
cd eslint-in-memory-relative-path-bug
npm install
npm start
```

> Parsing error: parserOptions.tsconfigRootDir must be an absolute path, but received: ".". This is a bug in your configuration; please supply an absolute path.

By the way, if downgrade `@typescript-eslint/eslint-plugin` and `@typescript-eslint/parser` from `8.41.0` to `8.40.0`, the error will be solved, so please consider what has been changed during the `8.41.0` update.

For reference, here is my source code that configuring `tsconfigRootDir` as relative path `"."`

- https://github.com/samchon/embed-typescript/blob/master/packages/embed-eslint/src/EmbedEsLint.ts#L107-L123

```typescript
const eslintConfig = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  parserOptions: {
    programs: [program],
    tsconfigRootDir: ".",
    disallowAutomaticSingleRunInference: true,
  },
  rules: Object.fromEntries(
    Object.entries(this.props.rules).map(([key, value]) => [
      key.startsWith("@typescript-eslint/")
        ? key
        : `@typescript-eslint/${key}`,
      value,
    ]),
  ),
};
```