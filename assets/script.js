var searchBtn = $('#searchBtn');
var crVar = $('#crEnter');
var monstListEl = $('#monsterList');
var monsterArray = [];
var searchedRatingArray = [];

var fetchStatus = "";

function goGet() {
    var paramVar = crVar.val();
    var requestUrl = 'https://api.open5e.com/monsters/?challenge_rating=' + paramVar;
    fetch(requestUrl)
    .then(function (response) {
        // Conditionals (and fetchStatus variable) unnecessary if using dropdown menu selection.
        if (response.ok) {
            fetchStatus = "good";
            return response.json();
        } else {
            fetchStatus = "bad";
            console.log("bad request");
        }
    })
    .then(function (data) {
        if (fetchStatus == "good") {
            console.log(data);
            monsterArray = data;
            populate();
        } else {
            console.log("bad request the second");
        }
    })
}

// TODO: Add a second API request to get the next page's worth of data if result returns >50.

function populate() {
    monstListEl.empty();
    for (var i = 0; i < monsterArray.results.length; i++) {
        var thisMonster = monsterArray.results[i];
        var monsterCard = $('<div>').addClass('monsterCard selectableMonster');
        // monsterCard.attr("class", "selectableMonster" ) //Given an ID for on click event
        // var innerDiv = $('<div>').addClass('innerDiv');
        var monsterName = $('<h4>').addClass('monsterName').text(thisMonster.name);
        var monsterType = $('<p>').addClass('monsterType').text(thisMonster.type);
        console.log(thisMonster);
        monsterCard.append(monsterName);
        monsterCard.append(monsterType);
        monstListEl.append(monsterCard);
    }
};

// TODO: Add script to apply class based on type, and add CSS.

searchBtn.on('click', function() {
    goGet();
    
    // var level = crVar.val();
    // var creatureName = $(section.div.selectableMonster.children());
    // console.log(creatureName);
    // if(!searchedRatingArray.includes(level)) {
    //     searchedRatingArray.push(level);
    //     var searchedRating = $("<li>");
    //     searchedRating.addClass("list-group-item");
    //     searchedRating.text(level);
    //     $("#searchHistory").append(searchedRating);
    // };
    
    // localStorage.setItem("challenge-rating", JSON.stringify(searchedRatingArray));
   
});

var creatureName = $("section.results-screen".children());
    console.log(creatureName);

//     var creatureName = $(selectableMonster.children());
//     console.log(creatureName);

$(document).on("click", ".selectableMonster", function() { 
    
    // var listItem = $(this).text(); //Probably a problem here --
    // populate(listItem);
    console.log("hello")
   

});




// function init() {
//     var searchedMonsterArray = JSON.parse(localStorage.getItem(searchedRatingArray))
    
//     }
// }
// init();
