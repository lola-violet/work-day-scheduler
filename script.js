// Selectors
// Date display element in jumbotron
var currentDay = $('#currentDay');
// Save button element on each time block
var saveBtn = $('.saveBtn');
// Text area element on each time block
var textArea = $('.custom-area');


// Using moment.js to determine current date & display in jumbotron
var dateToday = moment().format("dddd, MMMM Do");
currentDay.text(dateToday);

// Function to determine block colors
function blockColors() {
    // Using moment.js to determine current hour
    var timeNow = moment().format("HH");
    // Conditional statement to determine class for each time block
    textArea.each(function() {
        let blockID = $(this).attr("id");
        if (blockID < timeNow) {
            $(this).addClass("past");
        } else if (blockID === timeNow) {
            $(this).addClass("present");
        } else if (blockID > timeNow) {
            $(this).addClass("future");
        }
    })
}

// Calls color function on pageload
blockColors();
// Interval which calls color function once per minute
setInterval(blockColors, 60*1000);


// Click listener for save button
saveBtn.click(saveData);

// Function to save contents within textarea to local storage
function saveData(event) {
    event.preventDefault();
    let taskData = $(this).prev().val();
    let timeBlock = $(this).prev().attr("id");
    localStorage.setItem(timeBlock, taskData);
}

// Sets text content for each time block based on items saved in local storage
textArea.each(function() {
    let blockID = $(this).attr("id");
    $(this).val(localStorage.getItem(blockID));
})