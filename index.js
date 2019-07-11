// import Lazy from "./lazy";
const Lazy = require("./lazy");

const lazy = new Lazy();

lazy
  .add(a => a + 1)
  .add(a => a + 2)
  .add(a => a + 3)
  .add(a => a * 10);

const results = lazy.evaluate([1, 2, 3]);

console.log("Results: ", results);
