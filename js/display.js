/**
 * display.js
 *
 * This script contains the functions to manipulate the DOM.
 */

/**
 * Display the cover of the window to show a message.
 *
 * @param  string {windowCoverElementID} is the selector ID of the window cover
 * @param  Object {messageObject} contains the message to be shown
 * @return void
 */
function displayWindowCover (windowCoverElementID, messageObject) {

  // selectors of the cover element and its children
  let selectorID = "#" + windowCoverElementID;
  let selector = $ (selectorID);
  let titleElementSelector = selector.find ("." + windowCoverElementID + "-title");
  let bodyElementSelector = selector.find ("." + windowCoverElementID + "-body");

  // change class of the cover element and fill text in the children
  selector.removeClass ("d-none").addClass ("d-block");
  selector.addClass ("flex");
  titleElementSelector.text (messageObject.title || DEFAULT_ERROR_TITLE);
  bodyElementSelector.text (messageObject.body || DEFAULT_ERROR_BODY);
}