var searchBtn = $('#searchBtn');
var crVar = $('#crEnter');
var monstListEl = $('#monster-list');
var monsterArray = [];
var searchedMonsterArray = [];
var acceptedClasses = ['aberration', 'beast', 'celestial', 'construct', 'dragon', 'elemental', 'fey', 'fiend', 'giant', 'humanoid', 'monstrosity', 'ooze', 'plant', 'swarm', 'undead'];

var monsterHistory = [];
if (localStorage.getItem("monsters")) {
    monsterHistory = (localStorage.getItem("monsters"))
}




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

function populate() {
    monstListEl.empty();
    for (var i = 0; i < monsterArray.results.length; i++) {
        var thisMonster = monsterArray.results[i];
        var monsterCard = $('<div>').addClass('monsterCard selectableMonster');
        // monsterCard.attr("class", "selectableMonster" ) //Given an ID for on click event
        // var innerDiv = $('<div>').addClass('innerDiv');
        var monsterCard = $('<div>').addClass(`monsterCard ${thisMonster.type}Type`);
        var monsterName = $('<h4>').addClass('monsterName').text(thisMonster.name);
        var monsterSize = $('<p>').addClass('monsterSize').text(`${thisMonster.size} `);
        var monsterType = $('<span>').addClass('monsterType').text(thisMonster.type);
        typeCleaner();
        monsterCard.append(monsterName);
        monsterCard.append(monsterSize);
        monsterSize.append(monsterType);
        monstListEl.append(monsterCard);
        
    }

    $("#top-display").text(`Challenge Rating: ${thisMonster.challenge_rating}`)

    // This looks more complicated than it is. There are a few items in the API that return aberrant creature types, so this looks for them and reconciles them with the accepted types.
    function typeCleaner() {
        // console.log(thisMonster.type);
        if (!acceptedClasses.includes(thisMonster.type)) {
            console.log(`type error: ${thisMonster.name} = ${thisMonster.type}`)
            // humanoid checker
            if (thisMonster.type.includes('human') || thisMonster.type.includes('Human')) {
                console.log(`humanoid discovered: ${thisMonster.name}`);
                monsterCard.attr("class", "monsterCard humanoidType");
            }
            // beast checker
            if (thisMonster.type.includes('beast') || thisMonster.type.includes('Beast')) {
                console.log(`beast discovered: ${thisMonster.name}`);
                monsterCard.attr("class", "monsterCard beastType");
            }
            // swarm checker
            if (thisMonster.type.includes('swarm') || thisMonster.type.includes('Swarm')) {
                console.log(`swarm discovered: ${thisMonster.name}`);
                monsterCard.attr("class", "monsterCard swarmType");
            }
        }
    }

};


searchBtn.on('click', function() {
    goGet();

});

$(document).on("click", ".selectableMonster", function() { 
  
    console.log("hello")
});

// dropdown menu
 $(document).foundation();



monstListEl.on("click", function(event) {
    var nameOfMonster = ($(event.target).text())
    console.log(nameOfMonster);
    if(!searchedMonsterArray.includes(nameOfMonster)) {
        searchedMonsterArray.push(nameOfMonster);
        var searchedMonster = $("<li>");
        searchedMonster.addClass("list-group-item")
        searchedMonster.text(nameOfMonster);
        $("#searchHistory").append(searchedMonster);
    }

    localStorage.setItem("Monster-Name", JSON.stringify(searchedMonsterArray));
})


// var listItem = $(this).text(); //Probably a problem here --
// populate(listItem);




// function init() {
//     var searchedMonsterArray = JSON.parse(localStorage.getItem(searchedRatingArray))
    
//     }
// }
// init();

// TODO: Add a second API request to get the next page's worth of data if result returns >50.

// TODO: Make an init() function that populates the page from local storage when loaded.

// We could also leverage local storage to allow people to store creatures they're interested in using. The cards could be made clickable, and clicking would store them in a list on the left column (below the search boxes). Those could be clicked off to remove them.

// If we wanted to go really ham for some reason, we could add further query parameters that would allow people to filter by what sources they want. Since some of these sources are *really* weird, and the API returns the source of the material which can be filtered using "?document__slug=".

