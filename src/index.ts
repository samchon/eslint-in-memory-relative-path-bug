import { EmbedEsLint } from "embed-eslint";
import ts from "typescript";

import EXTERNAL from "./external.json";
import { IEmbedTypeScriptResult } from "embed-typescript";

const main = async () => {
  const tsc: EmbedEsLint = new EmbedEsLint({
    external: EXTERNAL as Record<string, string>,
    compilerOptions: {
      target: ts.ScriptTarget.ESNext,
      module: ts.ModuleKind.CommonJS,
      downlevelIteration: true,
      esModuleInterop: true,
      strict: true,
      skipLibCheck: true,
    },
    rules: {
      "no-floating-promises": "error",
    },
  });
  const result: IEmbedTypeScriptResult = await tsc.compile({
    "src/index.ts": "export const value: string = 'Hello World';",
  });
  if (result.type === "success") console.log("success");
  else if (result.type === "failure")
    console.log("failure", result.diagnostics);
};
main().catch(console.error);
