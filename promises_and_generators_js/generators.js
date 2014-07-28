/**

Here's a new for loop syntax introduced in ES6 (Harmony):

*/

for(var x of iterable) {
  /* ... */
}

/*

This lets you make any Object something you can loop over in a for loop.
No more $.each(function() { ... })!

It works when iterable is, well, iterable.

How do you make an object Iterable?

An Iterable object has a next method:

  iterable.next() -> { value, done }

Here's a function that implements Ruby's each_with_index in Javascript:

*/

/**
  * Returns an Iterator which produces an object with two fields--index and item--for each
  * element of the array.
  */
function eachWithIndex(array) {
  var nextIndex = 0;     
  return {
    next: function() {
      if (nextIndex < array.length) {
        return {
          // Note that the values returned by this iterable are themselves
          // arrays containing the index of an item in the array,
          // and the item itself.
          value: [
            nextIndex,
            array[nextIndex++]
          ],
          done: false
        }
      } else {
        return {done: true};
      }
    }
  };
}


/* You can use an iterable by calling its next method repeatedly, consuming
values until it returns { done: true }. */

iter = eachWithIndex(['apple', 'banana', 'coconut']);
result = iter.next();
while(!result.done) {
  console.log(result.value); // Logs [0, 'apple'] [1, 'banana'] [2, 'coconut'].
}


/* That's a pretty cumbersome way to loop, though. The for...of construct
   handles everything for you: */

for(var el of eachWithIndex(['apple', 'banana', 'coconut'])) {
  console.log(el); // Logs [0, 'apple'] [1, 'banana'] [2, 'coconut'].
}



/*

Generator functions (generators for short) are a new kind of function
in ES6. In essence, they make the compiler write a next method for you.

In generator functions, you can use a new keyword: yield. This keyword:
  1. Saves the state of the function
  2. Returns a value into the caller
  3. Resumes your function at the savepoint the next time next() is called.

This is easier to show than explain:

*/

/**
  * Generates an object with two fields--index and item--for each
  * element of the array.
  *
  * When you call eachWithIndex, an iterable is returned.
  */
function* eachWithIndexGenerator(array) {
  //    ^  "I'm a generator function."
  for (var i = 0; i != array.length; ++i) {
    yield {
      index: i,
      item: array[i]
    };
  }
}

for(var el of eachWithIndexGenerator(['apple', 'banana', 'coconut'])) {
  console.log(el); // Logs [0, 'apple'] [1, 'banana'] [2, 'coconut'].
}

/*

A Generator's next method optionally takes a value. This value is returned from
the next yield.

This lets you send messages to generators.

*/

function* squarer(initialVal) {
  var val = initialVal;
  while true {
    val = yield val * val;
  }
}

var it = squarer(4);
it.next()
  // -> Object {value: 16, done: false}
it.next(10)
  // -> Object {value: 100, done: false}
it.next(20)
  // -> Object {value: 400, done: false}
it.next()
  // -> Object {value: NaN, done: false}
it.next(30)
  // -> Object {value: 900, done: false}
