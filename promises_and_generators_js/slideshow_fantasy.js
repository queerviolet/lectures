window.addEventListener('load', function() {
  var images = [
    new Image('images/angela_davis.jpg'),
    new Image('images/belle_hooks.jpg'),
    new Image('images/audre_lorde.jpg')
  ];

  // Wait for all of them.
  for (var img in images) {
    img.wait();  // Surely there's some method like this?
  }

  // Add the images to the document.
  for (var img in images) {
    document.body.appendChild(img);
  }

  // Display the first image.
  images[0].style.opacity = 1;

  // Cycle to the next image every three seconds.
  var index = 0;
  while (true) {
    images[index].style.opacity = 0;
    index = ++index % images.length;
    images[index].style.opacity = 1;
    sleep(3000 /* ms */);
  }
}, false);