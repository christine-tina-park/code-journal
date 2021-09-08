/* global data */
/* exported data */

var $photoUrl = document.querySelector('#photo-url');
var $img = document.querySelector('img');

function updateSrc(event) {
  var $currentUrl = $photoUrl.value;
  $img.setAttribute('src', $currentUrl);
}

$photoUrl.addEventListener('input', updateSrc);
