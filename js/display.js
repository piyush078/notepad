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
    saveButtonSelector.css ("display", () => {
      return noteText ? "inline-block" : "none";
    });
  });
}

/**
 * Load the notes list into template.
 *
 * @param  Object {notesList} is the list of the notes
 * @return string {content} is the list of notes to be shown on the page
 */
function loadIntoTemplate (notesList) {

  // content to be shown inside the notes list container
  let content = "";

  // iterate over the notes list
  for (let key in notesList) {

    let title = fetchTitleFromNote (notesList [key]);
    content =
      "<div class='n-content-list-item' n-id='" + key + "'>" +
        "<div class='n-content-list-item-header'>" +
          "<div class='row'>" +
            "<div class='n-content-list-item-title col-8 text-truncate cursor-pointer' data-toggle='collapse' data-target='#" + key + "' title='" + title + "'>" + title + "</div>" +
            "<div class='col-4 text-right'><i class='n-content-list-item-icon fas fa-trash-alt cursor-pointer' title='Delete'></i></div>" + 
          "</div>" +
        "</div>" +
        "<div id='" + key + "' class='collapse hide mt-1'>" + notesList [key].replace(/\n/g, "<br />") + "</div>" +
      "</div>" + content;
  }

  return content;
}