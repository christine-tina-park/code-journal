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
$entryList.addEventListener('click', doEdit);

function updateSrc(event) {
  var $currentUrl = $photoUrl.value;
  if ($currentUrl !== '') {
    $image.setAttribute('src', $currentUrl);
  } else {
    $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  }
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
  $columnHalf2.setAttribute('class', 'column-half relative');
  var $entryTitle = document.createElement('h2');
  $entryTitle.setAttribute('class', 'entryTitle');
  $entryTitle.textContent = entry.title;
  var $entryNotes = document.createElement('p');
  $entryNotes.textContent = entry.notes;
  var $edit = document.createElement('i');
  $edit.setAttribute('class', 'fas fa-pen absolute2 fa-lg');
  $edit.setAttribute('data-entry-id', entry.entryId);
  $li.appendChild($row);
  $row.appendChild($columnHalf);
  $columnHalf.appendChild($entryImage);
  $row.appendChild($columnHalf2);
  $columnHalf2.appendChild($entryTitle);
  $columnHalf2.appendChild($entryNotes);
  $columnHalf2.appendChild($edit);
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
  data.view = string;
}

function handleNav(event) {
  dvSwap('entries');
}

function handleNew(event) {
  dvSwap('entry-form');
}

function doEdit(event) {
  if (event.target.tagName === 'I') {
    dvSwap('entry-form');
    var targetId = event.target.getAttribute('data-entry-id');
    for (var k = 0; k < data.entries.length; k++) {
      if (data.entries[k].entryId.toString() === targetId) {
        data.editing = data.entries[k];
        $form.elements.title.value = data.editing.title;
        $form.elements.photoUrl.value = data.editing.photoUrl;
        $form.elements.notes.value = data.editing.notes;
        updateSrc();
      }
    }
  }
}
