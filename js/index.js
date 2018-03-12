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
 * Load the event listeners and UI functions.
 */
function loadResources () {

  // classes and id of the buttons and textarea
  let saveButtonClass = "n-content-input-icon";
  let deleteButtonClass = "n-content-list-item-icon";
  let textareaClass = "n-content-input";

  // associate event listeners to the buttons
  $ ("." + saveButtonClass).on ("click", writeNote);
  $ ("." + deleteButtonClass).on ("click", deleteNote);

  // load transitions and motion events
  loadTransitionsAndMotion (saveButtonClass, textareaClass);
}

$ (document).ready (function () {

  // check if the local storage API is supported on the browser
  isLocalStorageAvailable ('localStorage') 
    ? loadResources () 
    : noLocalStorageError ();
});