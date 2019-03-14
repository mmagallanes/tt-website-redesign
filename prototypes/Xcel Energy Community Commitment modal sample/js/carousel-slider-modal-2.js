$(document).ready(function () {

  function openModal() {
    header.style.display = "none";
    navBar.style.display = "none";
    modal.style.display = "block";
    outerCarouselIndicators.style.display = "none";
    innerCarouselIndicators.style.display = "block";
  }

  function closeModal() {
    header.style.display = "block";
    navBar.style.display = "block";
    modal.style.display = "none";
    outerCarouselIndicators.style.display = "block";
    innerCarouselIndicators.style.display = "none";
  }

  document.getElementsByClassName("close")[0].addEventListener("click", closeModal);
  
  /* Changing caption_id # changes caption underneath picture, but it cannot simultaneously change as the image changes. */
  var client = new XMLHttpRequest();
  var parser = new DOMParser();
  var current_caption = 3;
 
  client.open('GET', './captions.txt');
  client.onreadystatechange = function () {
    var capDoc = parser.parseFromString(client.responseText, "text/xml");
    document.getElementById("modal-caption").innerHTML = capDoc.getElementsByTagName("caption")[current_caption].childNodes[0].nodeValue;
  };
  client.send();

  function addImage(img_id, img_url, isactive) {
    
    $("#first-carousel-inner").append(
      '<div class="item ' + isactive + '">' +
      '<img  id=image' + img_id + ' class="d-block w-100" src=' + img_url + ' />' +
      '<div class="carousel-caption d-none d-md-block"></div>' +
      '</div>');
    $("#innerIndicators").append('<li data-target="#Inner-Carousel" data-slide-to="' + img_id + '" class="' + isactive + '"></li>');

    $("#outerIndicators").append('<li data-target="#Inner-Carousel" data-slide-to="' + img_id + '" class="' + isactive + '"></li>');
    $("#second-carousel-inner").append(
      '<div class="item ' + isactive + '">' +
      '<img  id=image' + img_id + ' class="d-block w-100" src=' + img_url + ' />' +
      '<div class="carousel-caption d-none d-md-block"></div>' +
      '</div>');

    document.getElementById('image' + img_id).addEventListener("click", openModal);
  }
  
  function loadImage(options, callback) {

    var seconds = 0,
      maxSeconds = 10,
      complete = false,
      done = false;

    if (options.maxSeconds) {
      maxSeconds = options.maxSeconds;
    }

    function tryImage() {
      if (done) {
        return;
      }
      if (seconds >= maxSeconds) {
        callback({
          err: 'timeout'
        });
        done = true;
        return;
      }
      if (complete && img.complete) {
        if (img.width && img.height) {
          callback({
            img: img.src,
            img_id: options.id,
            img_class: options.img_class
          });
          done = true;
          return;
        }
        callback({
          err: '404'
        });
        done = true;
        return;
      } else if (img.complete) {
        complete = true;
      }
      seconds++;
      callback.tryImage = setTimeout(tryImage, 1000);
    }

    var img = new Image();
    img.onload = tryImage();
    img.src = options.src;
    tryImage();
  }


  //set the max amount of images to display
  var max = 10;
  //set the location of the images folder
  var dir = "gallery/";
  var i = 1;
  var isactive = "";
  var image_url = "";
  var image_id = "";

  while (i <= max) {
    if (i === 1) {
      isactive = "active";
    } else {
      isactive = "";
    }
    image_url = dir + i + ".jpg";
    image_id = i;

    loadImage({
      src: image_url,
      id: image_id,
      img_class: isactive,
      maxSeconds: 30
    }, function (status) {
      if (status.err) {
        console.log(status.err);
        return false;
      } else if (status.img) {
        console.log(status.img);
        addImage(status.img_id, status.img, status.img_class);
        return true;
      }
    });
    i++;
  }

  var modal = document.getElementById('carouselModal');
  var navBar = document.getElementById("navbar");
  var logo = document.getElementById("logoButton");
  var header = document.getElementById("header");
  var outerCarouselIndicators = document.getElementById("outerIndicators");
  var innerCarouselIndicators = document.getElementById("innerIndicators");
  var navBar = document.getElementById("navBarContent");
});

$('#modal').on('show.bs.modal', function () {
  $(this).find('.modal-body').css({
    width: 'auto', //probably not needed
    height: 'auto', //probably not needed 
    'max-height': '100%'
  });
});