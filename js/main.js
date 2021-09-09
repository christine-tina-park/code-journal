/* global data */
/* exported data */
var $form = document.querySelector('#entry-form');
var $photoUrl = $form.elements.photoUrl;
var $image = document.querySelector('.image');
var entry = {};
var $entryList = document.querySelector('#entryList');

$photoUrl.addEventListener('input', function updateSrc(event) {
  var $currentUrl = $photoUrl.value;
  $image.setAttribute('src', $currentUrl);
});

$form.addEventListener('submit', function handleSubmit(event) {
  event.preventDefault();
  entry.title = $form.elements.title.value;
  entry.photoUrl = $form.elements.photoUrl.value;
  entry.notes = $form.elements.notes.value;
  entry.entryId = data.nextEntryId;
  data.entries.push(entry);
  data.nextEntryId += 1;
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
});

function renderEntry(entry) {
  var $li = document.createElement('li');
  var $row = document.createElement('div');
  $row.setAttribute('class', 'row margin-bottom');
  var $columnHalf = document.createElement('div');
  $columnHalf.setAttribute('class', 'column-half');
  var $entryImage = document.createElement('img');
  $entryImage.setAttribute('class', 'entryImage');
  $entryImage.setAttribute('src', entry.photoUrl);
  var $columnHalf2 = document.createElement('div');
  $columnHalf2.setAttribute('class', 'column-half');
  var $entryTitle = document.createElement('h2');
  $entryTitle.setAttribute('class', 'entryTitle');
  $entryTitle.textContent = entry.title;
  var $entryNotes = document.createElement('p');
  $entryNotes.textContent = entry.notes;
  $li.appendChild($row);
  $row.appendChild($columnHalf);
  $columnHalf.appendChild($entryImage);
  $row.appendChild($columnHalf2);
  $columnHalf2.appendChild($entryTitle);
  $columnHalf2.appendChild($entryNotes);
  return $li;
}

window.addEventListener('DOMContentLoaded', function showEntryList(event) {
  for (var i = data.entries.length - 1; i >= 0; i--) {
    var DOMentry = renderEntry(data.entries[i]);
    $entryList.appendChild(DOMentry);
  }
})
;
