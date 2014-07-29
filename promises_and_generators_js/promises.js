
/**

What are Promises?

A Promise is an object representing an operation which will return a result
in the future. Most often, this operation is a network request, or an event
which we expect to fire at some point.

Promises have a then method:

   promise.then(onFulfilled, onRejected) -> returns a Promise


When you create a Promise, it starts working. We say that the Promise is PENDING.

If the Promise completes its operation successfully, it calls onFulfilled with the
result of the operation. The Promise is now FULFILLED. You'll also see RESOLVED used.

If the Promise fails, it calls onRejected with the reason. The Promise is now REJECTED.

Promises also have catch method:

	promise.catch(onRejected) -> returns a Promise

This is equivalent to specifying onRejected in .then().

Promises are implemented by RSVP.js, Q.js, and others: http://promisesaplus.com/implementations

Here's the full spec: http://promisesaplus.com/

*/

// Why would I want this?
// Because now you have code that looks like this:

ajaxRequest('/posts',
	function(postList) {
  		ajaxRequest(postList[0].url,
  			function(content) {
  				animatedPageUpdate(content,
  					function() {
  						showButterBar('Post loaded.');
	  				});
  			});
  	},
  	function(error) { console.error(error); }
  	);

// ...which is ridiculous. If those functions used Promises rather than callbacks,
// you could do this:

ajaxRequest('/posts')
	.then(function(postList) {
		return ajaxRequest(postList[0].url);
	})
	/* Note how Promises chain */
	.then(function(content) {
		return animatedPageUpdate(content);
	})
	.then(function() {
		return showButterBar('Post loaded.');
	})
	/* Errors will bubble to .catch() */
	.catch(function(error) {
		console.error(error);
	});


/*

You may also find these static methods to your liking:

    Promise.resolve(value) -> Promise

Promise.resolve(value) returns a Promise which resolves to value. */

Promise.resolve('hello')
	.then(function(val) {
		console.log(val); // Logs 'hello'
	})
	.catch(function(e) {
		console.error('This will never happen.');
	});



/*

If value has a then method (the Promise spec calls such objects "thenable",
which is a terrible word that we will only say once), the Promise "follows along".

That means that you can take something like a jQuery Deferred--which has a
then method, but isn't quite a Promise--and make it into one like this: */

Promise.resolve($.ajax('/api/endpoint'));


/*

	Promise.reject(reason) -> Promise

Promise.reject is just like Promise.resolve, only the Promise it returns
always rejects. */

Promise.reject(Error("I'm just not feeling up to it today."))
	.then(function(val) {
		console.log(val);  // Never runs.
	})
	.catch(function(e) {
		console.error(e);  // Logs the Error above.
	});

/*

	Promise.race(iterable) -> Promise

Promise.race takes an iterable of Promises, and fulfills or rejects when the
first one fulfills or rejects. */

// Assume that delay(ms, value) returns a Promise that fulfills after ms milliseconds,
// with value.
Promise.race([delay(100, '100 ms.'), delay(200, '200 ms.')])
  .then(function(val) {
  	console.log(val); // Prints '100 ms'.
  });


/*
	Promise.all(iterable) -> Promise

Promise.all returns a Promise which fulfills if every promise in the iterable
fulfills, and rejects if any of them reject.

This lets you wait until a bunch of resources are loaded: */

// Assume that loadImage(src) returns a Promise that loads an image.
Promise.all([loadImage(src1), loadImage(src2)])
	.then(startSlideshow);


/*


To implement our own Promises, we need to call the Promise constructor:

  new Promise(function(fulfill, reject))

fulfill and reject are both functions. You call them to fulfill or reject
the request. */

function loadImage(src) {
	return new Promise(function(fulfill, reject) {
		// TODO
	});
}




