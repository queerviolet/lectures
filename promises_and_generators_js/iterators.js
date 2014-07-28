/**
  * Returns an Iterator which produces an object with two fields--index and item--for each
  * element of the array.
  */
function eachWithIndex(array) {
  /**
   * "An iterator has a method called next. This method returns an object
   * with two properties: value (any value) and done (will be read as a
   * boolean)."
   * 
   * -- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/The_Iterator_protocol
   */
  var nextIndex = 0;     
  return {
    next: function() {
      if (nextIndex < array.length) {
        return {
          value: {
            index: nextIndex,
            item: array[nextIndex++]
          },
          done: false
        }
      } else {
        return {done: true};
      }
    }
  };
}

// We can call the iterator explicitly.
function callIterator() {
  var iterator = eachWithIndex($('div'));
  var next = iterator.next();
  while (!next.done) {
    var value = next.value;
    console.log(value);
    value.item.style.backgroundColor = 'light' + value.item.id;
    value.item.textContent = value.index;
    next = iterator.next();
  }
}


// ...or we can call it from a for loop, using the new 'of' keyword.
function loopIterator() {
  for (var value of eachWithIndex($('div'))) {
    console.log(value);
    value.item.style.backgroundColor = value.item.id;
    value.item.textContent = value.index;
  }
}




// But writing the iterator was pretty cumbersome. What I really want
// to write is something like this...
function easierEachWithIndex(array) {
  return turnThisIntoAnIteratorSomehow(function() {
    for (var i = 0; i != array.length; ++i) {
      yield({
        index: i,
        item: array[i]
      });
    }
  });
}