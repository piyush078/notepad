/**
 * display.js
 *
 * This script contains the functions to manipulate the DOM.
 */

/**
 * Display the cover of the window to show a message.
 *
 * @param string {windowCoverElementID} is the selector ID of the window cover
 * @param Object {messageObject} contains the message to be shown
 */
function displayWindowCover (windowCoverElementID, messageObject) {

  // selectors of the cover element and its children
  let selectorID = "#" + windowCoverElementID;
  let selector = $ (selectorID);
  let titleElementSelector = selector.find ("." + windowCoverElementID + "-title");
  let bodyElementSelector = selector.find ("." + windowCoverElementID + "-body");

  // change class of the cover element and fill text in the children
  selector.removeClass ("d-none").addClass ("flex");
  titleElementSelector.text (messageObject.title || DEFAULT_ERROR_TITLE);
  bodyElementSelector.text (messageObject.body || DEFAULT_ERROR_BODY);
}

/** 
 * Load the transitions and motion events to the elements.
 *
 * @param string {saveButtonClass} is the class of the save button
 * @param string {textareaClass} is the class of the textarea
 */
function loadTransitionsAndMotion (saveButtonClass, textareaClass) {

  // selectors of the classes
  let textareaSelector = $ ("." + textareaClass);
  let saveButtonSelector = $ ("." + saveButtonClass);

  // keyup event on the textarea
  textareaSelector.on ("keyup", function () {

    // content in the textarea and toggle the save button based on the content
    let noteText = $ (this).val ().trim ();
    saveButtonSelector.css ("display", function () {
      return noteText ? "block" : "none";
    });
  });
}