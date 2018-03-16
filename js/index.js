/** 
 * index.js
 *
 * This script is the entry point of the application.
 * It defines the event listeners, functions detecting the support
 * for the application, global variables.
 */

/**
 * Global Variables.
 *
 * @var string
 */
var DEFAULT_ERROR_TITLE = "Error";
var DEFAULT_ERROR_BODY = "Something went wrong. Please try again later.";
var STORAGE_KEY = "notes";

/**
 * Return the text of the new note.
 *
 * @return string {textareaText} is the text of the new note
 */
function getNewNoteText () {
  return $ (".n-content-input").val ().trim ();
}

/**
 * Detect if the browser supports the local storage.
 * https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
 *
 * @param  string {type} defines the property name of window element
 * @return boolean {true|false} if the local storage is available or not
 */
function isLocalStorageAvailable (type) {
  try {
    let storage = window [type],
      x = '__storage_test__';
    storage.setItem (x, x);
    storage.removeItem (x);
    return true;

  } catch (e) {
    return e instanceof DOMException && (
      e.code === 22 || e.code === 1014 || e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED'
    );
  }
}

/**
 * Handle the no local storage error.
 */
function noLocalStorageError () {

  // message to be shown on the window cover
  let messageObject = {
    title: "Need to stay updated",
    body: "Your browser does not support Notepad. Please update your browser."
  };

  // show window cover element
  let windowCoverElementID = "window-cover";
  displayWindowCover (windowCoverElementID, messageObject);
}

/**
 * Handle the save button click event and save the new note.
 *
 * @param string {textareaClass} is the class of the textarea
 * @param function {showErrorFunction} is the function to show error
 */
function handleSavingNote (textareaClass, showErrorFunction) {

  // show error if the new note could not be saved
  // empty the textarea if saving is successful
  if (! writeNote ()) {
    let errorText = "The new note could not be saved.";
    showErrorFunction (errorText);
  } else {
    $ ("." + textareaClass).val ("");
  }
}

/**
 * Handle the delete button click event and delete the selected note.
 *
 * @param Object {this} is bound to the function and is the selected note item element
 *               in the list of notes
 * @param function {showErrorFunction} is the function to show error
 */
function handleDeleteNote (showErrorFunction) {

  // get the id of the note item
  let noteItemElement = this;
  let noteItemID = noteItemElement.attr ("n-id");
  if (! deleteNote (noteItemID)) {
    let errorText = "The selected note could not be deleted.";
    showErrorFunction (errorText);
  } else {
    noteItemElement.remove ();
  }
}

/**
 * Load the event listeners and UI functions.
 */
function loadResources () {

  // classes and id of the buttons, textarea, error container and note item
  let saveButtonClass = "n-content-input-icon";
  let deleteButtonClass = "n-content-list-item-icon";
  let textareaClass = "n-content-input";
  let errorContainerID = "error-container";
  let noteItemClass = "n-content-list-item";

  // bind the error container to the showError function
  let errorContainerSelector = $ ("#" + errorContainerID);
  let showErrorFunction = showError.bind (errorContainerSelector);

  // ADD THE FUNCTION TO THE PROTOTYPE PROPERTY OF STORAGE
  Storage.prototype.handle = handleLocalStorageData;

  // associate event listeners to the buttons
  $ ("." + saveButtonClass).on ("click", () => handleSavingNote (textareaClass, showErrorFunction));
  $ ("." + deleteButtonClass).on ("click", function () {
    handleDeleteNote.call (jQuery (this).parents ("." + noteItemClass), showErrorFunction);
  });

  // load transitions and motion events
  loadTransitionsAndMotion (saveButtonClass, textareaClass);
}


$ (document).ready (function () {

  // check if the local storage API is supported on the browser
  isLocalStorageAvailable ('localStorage') 
    ? loadResources () 
    : noLocalStorageError ();
});