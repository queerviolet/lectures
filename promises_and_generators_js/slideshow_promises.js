/** Loads all the images in the string array imagePaths,
    then calls startSlideshow on the resulting Image objects,
    with the specified delay. */
function loadSlideshow(imagePaths, delay) {
  function load(src) {
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

  Promise.all(imagePaths.map(load))
    .then(function(images) {
      // Insert all images into the document. CSS handles positioning
      // them on top of each other and setting their initial opacity to 0.
      for (var img of images) {
        document.body.appendChild(img);
      }

      // Now set an interval to loop through the images and display
      // each in turn.
      images[0].style.opacity = 1;
      var index = 0;
      setInterval(function() {
        images[index].style.opacity = 0;
        index = ++index % images.length;
        images[index].style.opacity = 1;
      }, delay);
    })
    .catch(function(error) {
      console.error('Slideshow:', error);
    });
}

function* each(arr) {
  for (var i = 0; i != arr.length; ++i) {
    yield arr[i];
  }
}

window.addEventListener('load', function() {
  // Note: Never do this in a real app. 
  // The images should be listed in the HTML.
  loadSlideshow([
    'images/angela_davis.jpg',
    'images/belle_hooks.jpg',
    'images/audre_lorde.jpg'], 3000);
}, false);