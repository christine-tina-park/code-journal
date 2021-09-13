var $form = document.querySelector('#entry-form');
var $photoUrl = $form.elements.photoUrl;
var $image = document.querySelector('.image');
var $entryList = document.querySelector('#entryList');
var $views = document.querySelectorAll('.view');
var $nav = document.querySelector('#nav');
var $new = document.querySelector('#new');
var $empty = document.querySelector('#empty');
var $h1New = document.querySelector('#h1New');
var $h1Edit = document.querySelector('#h1Edit');
var $delete = document.querySelector('#delete');
var $popUpBG = document.querySelector('#popUpBG');
var $cancel = document.querySelector('#cancel');

$photoUrl.addEventListener('input', updateSrc);
$form.addEventListener('submit', handleSubmit);
window.addEventListener('DOMContentLoaded', handleLoad);
$nav.addEventListener('click', handleNav);
$new.addEventListener('click', handleNew);
$entryList.addEventListener('click', doEdit);
$delete.addEventListener('click', showPopUp);
$cancel.addEventListener('click', hidePopUp);

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
  if (data.editing === null) {
    entry.entryId = data.nextEntryId;
    data.entries.push(entry);
    data.nextEntryId += 1;
    var DOMentryNew = renderEntry(entry);
    $entryList.prepend(DOMentryNew);
  } else {
    entry.entryId = data.editing.entryId;
    for (var h = 0; h < data.entries.length; h++) {
      if (data.entries[h].entryId === entry.entryId) {
        data.entries.splice(h, 1, entry);
      }
    }
    var DOMentryEdited = renderEntry(entry);
    var $entries = $entryList.querySelectorAll('li');
    for (var g = 0; g < $entries.length; g++) {
      if ($entries[g].getAttribute('data-entry-id') === entry.entryId.toString()) {
        var oldEntry = $entries[g];
        $entryList.replaceChild(DOMentryEdited, oldEntry);
      }
    }
  }
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
  dvSwap('entries');
  data.editing = null;
}

function renderEntry(entry) {
  var $li = document.createElement('li');
  $li.setAttribute('data-entry-id', entry.entryId);
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
  data.editing = null;
}

function handleNew(event) {
  dvSwap('entry-form');
  $h1New.className = '';
  $h1Edit.className = 'hidden';
  $delete.className = 'hidden';
  $form.reset();
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  data.editing = null;
}

function doEdit(event) {
  if (event.target.tagName === 'I') {
    dvSwap('entry-form');
    $h1New.className = 'hidden';
    $h1Edit.className = '';
    $delete.className = '';
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

function showPopUp(event) {
  $popUpBG.className = 'row';
}

function hidePopUp(event) {
  $popUpBG.className = 'hidden row';
}
