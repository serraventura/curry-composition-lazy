const Lazy = require("./lazy");

// there are more cases that could be tested
// I will ignore them since it is just a test

describe("Lazy", () => {
  it("add() - should add func to the list", () => {
    const lazy = new Lazy();
    lazy.add(() => {}).add(() => {});
    expect(lazy.arrFunc).not.toBeUndefined();
    expect(lazy.arrFunc.length).toEqual(2);
  });

  it("evaluate() - should return right calculation for a list of values", () => {
    const lazy = new Lazy();
    lazy.add(a => a + 1).add(a => a * 100);
    expect(lazy.evaluate([1])).toEqual([200]);
    expect(lazy.evaluate([1, 10])).toEqual([200, 1100]);
  });

  it("compose() - should return right calculation for a specific value", () => {
    const lazy = new Lazy();
    lazy.add(a => a + 1);
    expect(lazy.compose(1)).toEqual(2);
  });
});
