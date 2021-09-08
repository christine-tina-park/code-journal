/* global data */
/* exported data */
var $form = document.querySelector('#entry-form');
var $photoUrl = $form.elements.photoUrl;
var $photo = document.querySelector('#photo');

$photoUrl.addEventListener('input', function updateSrc(event) {
  var $currentUrl = $photoUrl.value;
  $photo.setAttribute('src', $currentUrl);
});

$form.addEventListener('submit', function handleSubmit(event) {
  event.preventDefault();
  var entry = {};
  entry.title = $form.elements.title.value;
  entry.photoUrl = $form.elements.photoUrl.value;
  entry.notes = $form.elements.notes.value;
  entry.entryId = data.nextEntryId;
  data.entries.push(entry);
  data.nextEntryId += 1;
  $photo.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
});
