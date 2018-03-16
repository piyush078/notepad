/**
 * process.js
 *
 * This script declares the background functions like storing and
 * loading the notes.
 */

/**
 * Handle the data from local storage.
 *
 * @param  Object {data} is the new value to be stored in the local storage
 * @return Object {localStorageData} is the data in the local storage
 */
function handleLocalStorageData (data = null) {

  // check if the local storage variable has been initialized
  if (! localStorage.getItem (STORAGE_KEY)) {
    localStorage.setItem (STORAGE_KEY, "{}");
  }

  // if data is given as parameter then change the data to string and store
  // the new value
  if (data) {
    let localStorageData = (typeof data === "object") 
      ? JSON.stringify (data) 
      : data;
    localStorage.setItem (STORAGE_KEY, localStorageData);
  }

  // return the data from local storage as JSON object
  return jQuery.parseJSON (localStorage.getItem (STORAGE_KEY));
}

/**
 * Save the note in the local storage.
 *
 * @return boolean {true|false} indicating if the storing was successful
 */
function writeNote () {
  try {

    // get the notes from the local storage    
    let newNoteText = getNewNoteText ();
    let notesData = localStorage.handle ();
    
    // get the timestamp to be the key of the new note
    let timestamp = (new Date ()).getTime ();
    let newNoteKey = "note-" + timestamp.toString ();
    
    // store the new value in local storage
    notesData [newNoteKey] = newNoteText;
    localStorage.handle (notesData);
    return true;

  } catch (e) {
    return false;
  }
}

/**
 * Delete a note from the local storage.
 *
 * @param  string {noteID} is the unique key of the note in the local storage
 * @return boolean {true|false} indicating if the deletion was successful
 */
function deleteNote (noteID) {
  try {

    // get the notes from the local storage
    let notesData = localStorage.handle ();

    // check if the note id exists in the notes list
    // if it does exist delete it and add back the changed data into local storage
    if (notesData.hasOwnProperty (noteID)) {
      delete notesData [noteID];
    } else {
      throw new Exception;
    }

    // store the new value in local storage
    localStorage.handle (notesData);
    return true;

  } catch (e) {
    return false;
  }
}

/**
 * Read the notes from the local storage.
 *
 * @return Object {notesList} is the list of the notes
 */
function readNotes () {
  try {

    // get the notes from the local storage
    let notesData = localStorage.handle ();
    return notesData;
    
  } catch (e) {
    return {};
  }
}

/**
 * Display the error in the error container.
 *
 * @param Object {this} is bound to the function and is the jQuery selector of
 *               the error container
 * @param string {errorText} is the text to be displayed
 */
function showError (errorText) {

  // get the element where error is to be shown
  let errorContainerSelector = this;
  let errorTextContainer = errorContainerSelector.children ().children ();
  let waitingTime = 2500;

  // fill the value into the error text area
  errorTextContainer.html (errorText || DEFAULT_ERROR_BODY);

  // explicit click the error container to show the error text container
  // show the error for some time and then hide it
  errorContainerSelector.click ();
  setTimeout (function () {
    errorContainerSelector.click ();
  }, waitingTime);
}

/**
 * Fetch the title from the notes text.
 *
 * @param string {noteText} is the text of the note.
 */
function fetchTitleFromNote (noteText) {

  // limit of the title characters
  let titleLimit = 60;

  // get the first line from the note
  let indexOfEndLine = noteText.indexOf ("\n");
  let lengthOfNote = noteText.length;
  if (indexOfEndLine === -1 || indexOfEndLine > titleLimit) {
    return noteText.substr (0, titleLimit) + " ...";
  } else {
    return noteText.substr (0, indexOfEndLine) + " ...";
  }
}