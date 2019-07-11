# curry-composition-lazy

**make sure you have latest node installed** 

Install packages
```
npm i
``` 

Run script
```
npm run start
``` 

Run tests
```
npm run test
``` 

_______

## Solution explanation step by step

My progress on understanding Lazy approach.

First of all, I had to play with a simple curry approach to keep my mind fresh since it's something I don't do often.

```javascript
const sum = (num) => {
	return (num2) => {
		return num + num2;
	}
}

sum(1)(1) // 2
```

Now to be able to add as many functions as we want we would need to add them to an array.
I will go simple as first try.

```javascript
const arrFunc = [a => a + 1, a => a + 2, a => a + 3];
let result;

arrFunc.forEach(i => {
	result = i(result || 1)
});

console.log(result); // 7
```

Now I will wrap it into a function

```javascript
const execFunc = (arrFunc = [], initialValue = 0) => {
	let result;

	arrFunc.forEach(item => {
		result = item(result || initialValue)
	});

	return result;
}

execFunc([a => a + 1, a => a + 2, a => a + 3], 1); // 7
```

Since I'm looping and accumulating the result I should be able to refactor into javascript reduce.

```javascript
const execFunc = (arrFunc = [], initialValue = 0) => {
	return arrFunc.reduce((acc, item) => {
		return item(acc)
	}, initialValue);
}
```

With less code.

```javascript
const execFunc = (arrFunc = [], initialValue = 0) => arrFunc.reduce((acc, item) => item(acc), initialValue);
```

Now I think I can wrap it all in a class.

```javascript
class Lazy {
	arrFunc = [];

	add(func) {
		this.arrFunc.push(func);
	}

	evaluate(values = []) {
		return values.map(value => this.compose(value))
	}

	compose(value) {
		return this.arrFunc.reduce((acc, item) => item(acc), value);
	}
}

const lazy = new Lazy();

lazy.add(a => a + 1);
lazy.add(a => a + 2);
lazy.add(a => a + 3);

lazy.evaluate([1, 2, 3]); // [7, 8, 9]
```

Tweaking add() method

	add(func) {
		this.arrFunc.push(func);
		return this; // tweak
	}

Now I can use like this

```javascript
const lazy = new Lazy();
lazy.add(a => a + 1).add(a => a + 2).add(a => a + 3);
lazy.evaluate([1, 2, 3]); // [7, 8, 9]
```
