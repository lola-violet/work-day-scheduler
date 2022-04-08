// Selectors
// Date display element in jumbotron
var currentDay = $('#currentDay');
// Save button element on each time block
var saveBtn = $('.saveBtn');
// Text area element on each time block
var textArea = $('.custom-area');


// Use moment.js to display current date
var dateToday = moment().format("dddd, MMMM Do");
currentDay.text(dateToday);

// Use moment.js to set timeblock colors based on past/present/future
// var timeNow = moment().format("HH");

blockColors();
setInterval(blockColors, 60*1000);

function blockColors() {
    var timeNow = moment().format("HH");
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


// textArea.each(function() {
//     let blockID = $(this).attr("id");
//     if (blockID < timeNow) {
//         console.log("future");
//     } else if (blockID === timeNow) {
//         console.log("present");
//     } else if (blockID > timeNow) {
//         console.log("past");
//     }
// })



// Click event listener for save button
saveBtn.click(saveData);

// Save contents within textarea to local storage
function saveData(event) {
    event.preventDefault();
    let taskData = $(this).prev().val();
    let timeBlock = $(this).prev().attr("id");
    localStorage.setItem(timeBlock, taskData);
}


// Render saved contents to timeblocks on page load
// localStorage.getItem("9")

textArea.each(function() {
    let blockID = $(this).attr("id");
    // localStorage.getItem(blockID);
    $(this).val(localStorage.getItem(blockID));
})