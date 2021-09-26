import { Diff } from "./deps.ts"

export function removeHunk(diff: Diff, index: number): Diff {
  const hunks = diff.hunks;
  if (index >= hunks.length || index < 0) {
    return diff;
  }

  const targetHunkHeader = hunks[index].header;
  const newHunks = hunks.slice(0, index);

  hunks.slice(index+1, hunks.length).forEach((hunk) => {
    hunk.header.beforeStartLine += targetHunkHeader.beforeLines;
    hunk.header.afterStartLine -= targetHunkHeader.afterLines;

    newHunks.push(hunk);
  })

  diff.hunks = newHunks;
  return diff;
}

export function removeHunksBefore(diff: Diff, index: number): Diff {
  const hunks = diff.hunks;
  if (index >= hunks.length || index < 0) {
    return diff;
  }

  let beforeOffset = 0;
  let afterOffset = 0;
  hunks.slice(0, index+1).forEach((hunk) => {
    beforeOffset += hunk.header.beforeLines;
    afterOffset += hunk.header.afterLines;
  })

  diff.hunks = hunks.slice(index+1, hunks.length).map((hunk) => {
    hunk.header.beforeStartLine += beforeOffset;
    hunk.header.afterStartLine -= afterOffset;

    return hunk;
  })

  return diff;
}

export function removeHunksAfter(diff: Diff, index: number): Diff {
  if (index >= diff.hunks.length || index < 0) {
    return diff;
  }

  diff.hunks = diff.hunks.slice(0, index);
  return diff;
}
