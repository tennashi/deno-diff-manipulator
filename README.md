# diff_manipulator
Manipulate diff

## Usage
```ts
import { parse } from "https://deno.land/x/diff_parser";
import { removeHunk, removeHunksBefore, removeHunksAfter } from "https://deno.land/x/diff_manipulator";

const process = Deno.run({
  cmd: ["git", "diff", "--no-color"],
  stdout: "piped",
})

const output = await process.output();
const diffText = new TextDecoder().decode(output);
process.close();

const diff = parse(diffText);

removeHunk(diff, 1);
removeHunksBefore(diff, 1);
removeHunksAfter(diff, 1);
```
