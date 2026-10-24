import { describe, expect, it } from "vitest";
import { referenceParts, remarkExternalReferences } from "./externalReferences";

describe("official external resource resolution", () => {
  it("resolves roadmap resources to their official destinations", () => {
    expect(referenceParts("React Docs, LeetCode").filter((p) => p.href).map((p) => p.href))
      .toEqual(["https://react.dev/learn", "https://leetcode.com/"]);
  });
  it("resolves blog sources without inventing report links", () => {
    expect(referenceParts("Levels.fyi and Gartner").filter((p) => p.href).map((p) => p.href))
      .toEqual(["https://www.levels.fyi/", "https://www.gartner.com/en"]);
  });
  it("does not replace existing links or code", () => {
    const tree = { type: "root", children: [
      { type: "link", url: "/roadmaps", children: [{ type: "text", value: "LeetCode" }] },
      { type: "code", value: "Gartner" },
    ] };
    remarkExternalReferences()(tree);
    expect(tree.children[0].url).toBe("/roadmaps");
    expect(tree.children[0].children?.[0].type).toBe("text");
    expect(tree.children[1].value).toBe("Gartner");
  });
});