/* global data */
/* exported data */
var $form = document.querySelector('#entry-form');
var $title = $form.elements.title;
var $notes = $form.elements.notes;
var $photoUrl = $form.elements.photoUrl;
var $photo = document.querySelector('#photo');
var n = 1;

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
  entry.entryId = n;
  n += 1;
  data.entries.push(entry);
  data.nextEntryId += 1;
  $title.value = '';
  $photoUrl.value = '';
  $notes.value = '';
  $photo.setAttribute('src', 'images/placeholder-image-square.jpg');

});
