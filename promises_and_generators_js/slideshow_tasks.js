function loadImage(src) {
  return new Promise(function(resolve, reject) {
    var img = new Image;
    img.addEventListener('load', function() {
      resolve(img);
    }, false);
    img.addEventListener('error', function() {
      reject(Error(src + ' failed to load.'));        
    }, false);
    img.src = src;
  });
};

window.addEventListener('load', 
  // spawn() is from task.js. It takes a generator which yields Promises. When each 
  // Promise is fulfilled, it calls back into the generator with next(result).
  //
  // Thus, within this function, yield waits for the yielded Promise to complete.
  spawn(function*() {
    var images = yield Promise.all([
      loadImage('images/angela_davis.jpg'),
      loadImage('images/belle_hooks.jpg'),
      loadImage('images/audre_lorde.jpg')
    ]);

    /* Why not for(var img of images)? Chrome doesn't support it yet :( */
    for (var i = 0; i != images.length; ++i) {
      document.body.appendChild(images[i]);
    }
    images[0].style.opacity = 1;
    var index = 0;
    while (true) {
      images[index].style.opacity = 0;
      index = ++index % images.length;
      images[index].style.opacity = 1;

      // sleep(ms) is from task.js. It returns a Promise which resolves after ms
      // milliseconds, using setTimeout.
      yield sleep(3000 /* ms */);
    }
  }),
  false);