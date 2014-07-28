/** Loads all the images in the string array image_paths,
    then runs a slideshow on the resulting Image objects,
    with the specified delay between slides. */
function slideshow(image_paths, delay) {
  // images is an array of Image objects. We'll pass it into
  // startSlideshow when all the images have completed
  var images = [];

  // Returns true if every Image object in images has loaded == true.
  // Image.loaded is set in the load and error callbacks below.
  function allLoaded() {
    for (var i = 0; i != images.length; ++i) {
      if (!images[i].loaded) return false;
    }
    return true;
  };

  for (var i = 0; i != image_paths.length; ++i) {
    var img = new Image;
    images.push(img);

    // If image loading succeeds, set succeeded = true on the image.
    // If all images have completed, start the slideshow.
    img.addEventListener('load', function() {
      var src = this.getAttribute('src');
      console.log('Slideshow: ', src, 'loaded ok.');
      this.loaded = true;
      if (allLoaded()) {
        // Insert all images into the document. CSS handles positioning
        // them on top of each other and setting their initial opacity to 0.
        for (var i = 0; i != images.length; ++i) {
          document.body.appendChild(images[i]);
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
      }
    },  false);

    // If image loading fails, set succeeded = false on the image.
    // If all images have completed, start the slideshow.
    img.addEventListener('error', function() {
      var src = this.getAttribute('src');
      console.error('Slideshow: ', src, 'failed to load.');
      this.loaded = false;
    }, false);

    // Start image loading by setting the image's src.
    img.src = image_paths[i];
  }
}

window.addEventListener('load', function() {
  // Note: Never do this in a real app. 
  // The images should be listed in the HTML.
  slideshow([
    'images/angela_davis.jpg',  
    'images/belle_hooks.jpg',
    'images/audre_lorde.jpg'], 3000);
}, false);