/**
 * process.js
 *
 * This script declares the background functions like storing and
 * loading the notes.
 */

/**
 * Save the note in the local storage.
 *
 * @return boolean {true|false} indicating if the storing was successful
 */
function writeNote () {

  let noteText = getNewNoteText ();
  try {
    // check if the local storage variable has been initialized
    if (! localStorage.getItem (STORAGE_KEY)) {
      localStorage.setItem (STORAGE_KEY, "{}");
    }

    // get the stored value in the local storage and convert to JSON
    // get the timestamp to be the key of the new note
    let localStorageValue = jQuery.parseJSON (localStorage.getItem (STORAGE_KEY));
    let timestamp = (new Date ()).getTime ();
    let noteKey = "note-" + timestamp.toString ();
    
    // store the new value as string with unique key
    localStorageValue [noteKey] = noteText;
    let localStorageValueString = JSON.stringify (localStorageValue);
    localStorage.setItem (STORAGE_KEY, localStorageValueString);
    return true;

  } catch (e) {
    return false;
  }
}

function deleteNote () {}