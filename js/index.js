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

$(document).ready (function () {

  // check if the local storage API is supported on the browser
  if (! isLocalStorageAvailable ('localStorage')) {

    // message to be shown on the window cover
    let messageObject = {
      title: "Need to stay updated",
      body: "Your browser does not support Notepad. Please update your browser."
    };

    let windowCoverElementID = "window-cover";
    displayWindowCover (windowCoverElementID, messageObject);

  } else {
    console.log ("Supported");
  }
});