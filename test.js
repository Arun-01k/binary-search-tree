const { Tree, Node } = require("./binary-tree");

test("node methods", () => {
  const bst = new Tree([1, 3, 4, 5, 7, 8, 9, 23, 67, 324, 6345]);

  expect(bst.tree.data).toBe(8);
  expect(bst.includes(8)).toBe(true);
  expect(bst.includes(9)).toBe(true);
  expect(bst.includes(3)).toBe(true);
  expect(bst.includes(2)).toBe(false);
});
