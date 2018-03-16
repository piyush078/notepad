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


/**
 * Load the notes list into template.
 *
 * @param Object {notesList} is the list of the notes
 * @param string {noteListContainerClass} is the class of the container element of the 
 *               notes list
 */
function loadIntoTemplate (notesList, notesListContainerClass) {

  // content to be shown inside the notes list container
  let content = "";

  // iterate over the notes list
  for (let key in notesList) {

    let title = fetchTitleFromNote (notesList [key]);
    content =
      "<div class='n-content-list-item' n-id='" + key + "'>" +
        "<div class='n-content-list-item-header'>" +
          "<div class='row'>" +
            "<div class='n-content-list-item-title col-8 text-truncate' data-toggle='collapse' data-target='#" + key + "'>" + title + "</div>" +
            "<div class='n-content-list-item-icon col-4 text-right'><i class='fas fa-trash-alt'></i></div>" + 
          "</div>" +
        "</div>" +
        "<div id='" + key + "' class='collapse hide mt-2'>" + notesList [key].replace ("\n", "<br />") + "</div>" +
      "</div>" + content;
  }

  // show the content on the page
  $ ("." + notesListContainerClass).html (content);
}