// export default class Lazy {
class Lazy {
  arrFunc = [];

  add(func) {
    this.arrFunc.push(func);
    return this;
  }

  evaluate(values = []) {
    return values.map(value => this.compose(value));
  }

  compose(value) {
    return this.arrFunc.reduce((acc, item) => item(acc), value);
  }
}

module.exports = Lazy;
