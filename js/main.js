var $form = document.querySelector('#entry-form');
var $photoUrl = $form.elements.photoUrl;
var $image = document.querySelector('.image');
var $entryList = document.querySelector('#entryList');
var $views = document.querySelectorAll('.view');
var $nav = document.querySelector('#nav');
var $new = document.querySelector('#new');
var $empty = document.querySelector('#empty');

$photoUrl.addEventListener('input', updateSrc);
$form.addEventListener('submit', handleSubmit);
window.addEventListener('DOMContentLoaded', handleLoad);
$nav.addEventListener('click', handleNav);
$new.addEventListener('click', handleNew);

function updateSrc(event) {
  var $currentUrl = $photoUrl.value;
  $image.setAttribute('src', $currentUrl);
}

function handleSubmit(event) {
  var entry = {};
  event.preventDefault();
  entry.title = $form.elements.title.value;
  entry.photoUrl = $form.elements.photoUrl.value;
  entry.notes = $form.elements.notes.value;
  entry.entryId = data.nextEntryId;
  data.entries.push(entry);
  data.nextEntryId += 1;
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
  dvSwap('entries');
  data.view = 'entries';
  var DOMentryNew = renderEntry(entry);
  $entryList.prepend(DOMentryNew);
}

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

function handleLoad(event) {
  dvSwap(data.view);
  for (var i = data.entries.length - 1; i >= 0; i--) {
    var DOMentry = renderEntry(data.entries[i]);
    $entryList.appendChild(DOMentry);
  }
}

function dvSwap(string) {
  for (var j = 0; j < $views.length; j++) {
    if ($views[j].getAttribute('data-view') === string) {
      $views[j].className = 'view container';
    } else {
      $views[j].className = 'hidden view container';
    }
  }
  if (data.entries.length === 0) {
    $empty.className = 'row';
  } else {
    $empty.className = 'hidden row';
  }
}

function handleNav(event) {
  dvSwap('entries');
  data.view = 'entries';
}

function handleNew(event) {
  dvSwap('entry-form');
  data.view = 'entry-form';
}
