var searchBtn = $('#searchBtn');
var crVar = $('#crEnter');
var monstListEl = $('#monster-list');
var monsterArray = [];
var savedMonsterArray = [];
var acceptedClasses = ['aberration', 'beast', 'celestial', 'construct', 'dragon', 'elemental', 'fey', 'fiend', 'giant', 'humanoid', 'monstrosity', 'ooze', 'plant', 'swarm', 'undead'];






var fetchStatus = "";

function goGet(requestUrl) {
    $('#pag-spot').empty();
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
        } if (monsterArray.next || monsterArray.previous) {
            if (monsterArray.next) {
                // console.log('next found')
                var nextPage = $('<a>').addClass('pag-button').attr('id', 'next-button').text('Next Results').attr('href', '#top-display').attr('data-request', monsterArray.next);
                $('#pag-spot').append(nextPage);
            } if (monsterArray.previous) {
                // console.log('previous found')
                var prevPage = $('<a>').addClass('pag-button').attr('id', 'prev-button').text('Previous Results').attr('href', '#top-display').attr('data-request', monsterArray.previous);
                $('#pag-spot').append(prevPage);
            }
        }
    })
};

// If we want, we can make the <a> elements also buttons.

$('#pag-spot').on('click', '.pag-button', function(event) {
    goGet($(event.target).attr('data-request'))
    console.log ($(event.target).attr('data-request'));
});

function populate() {
    monstListEl.empty();
    for (var i = 0; i < monsterArray.results.length; i++) {
        var thisMonster = monsterArray.results[i];
        // monsterCard.attr("class", "selectableMonster" ) //Given an ID for on click event
        // var innerDiv = $('<div>').addClass('innerDiv');

        var monsterCard = $('<div>').addClass(`monsterCard ${thisMonster.type}-type`).attr('data-name', thisMonster.name);
        var monsterName = $('<h4>').addClass('monsterName').text(thisMonster.name).attr('data-name', thisMonster.name);
        var monsterSize = $('<p>').addClass('monsterSize').text(`${thisMonster.size} `).attr('data-name', thisMonster.name);
        var monsterType = $('<span>').addClass('monsterType').text(thisMonster.type).attr('data-name', thisMonster.name);
        var monsterHitDamage = $('<p>').text("Strength: " + thisMonster.strength);
        var monsterDexterity = $('<p>').text("Dexterity: " + thisMonster.dexterity);
        var monsterCharisma = $('<p>').text("Charisma : " + thisMonster.charisma);
        var monsterIntelligence = $('<p>').text("Intelligence: " + thisMonster.intelligence);


       

        typeCleaner();
        monsterCard.append(monsterName);
        monsterCard.append(monsterSize);
        monsterSize.append(monsterType);
        monstListEl.append(monsterCard);

        monsterCard.append(monsterHitDamage);
        monsterCard.append(monsterCharisma);
        monsterCard.append(monsterDexterity);
        monsterCard.append(monsterIntelligence);
        
        // console.log(monsterHitDamage)

    }

    $("#top-display").text(`Challenge Rating: ${thisMonster.challenge_rating}`)

    // This looks more complicated than it is. There are a few items in the API that return aberrant creature types, so this looks for them and reconciles them with the accepted types.
    function typeCleaner() {
        // console.log(thisMonster.type);
        if (!acceptedClasses.includes(thisMonster.type)) {
            // console.log(`type error: ${thisMonster.name} = ${thisMonster.type}`)
            // humanoid checker
            if (thisMonster.type.includes('human') || thisMonster.type.includes('Human')) {
                // console.log(`humanoid discovered: ${thisMonster.name}`);
                monsterCard.attr("class", "monsterCard humanoidType");
            }
            // beast checker
            if (thisMonster.type.includes('beast') || thisMonster.type.includes('Beast')) {
                // console.log(`beast discovered: ${thisMonster.name}`);
                monsterCard.attr("class", "monsterCard beastType");
            }
            // swarm checker
            if (thisMonster.type.includes('swarm') || thisMonster.type.includes('Swarm')) {
                // console.log(`swarm discovered: ${thisMonster.name}`);
                monsterCard.attr("class", "monsterCard swarmType");
            }
        }
    }
};


searchBtn.on('click', function() {
    var paramVar = crVar.val();
    var requestUrl = 'https://api.open5e.com/monsters/?challenge_rating=' + paramVar;
    goGet(requestUrl);
});

// dropdown menu
 $(document).foundation();

// add monster to storage and list
// also there's gotta be a better way of doing this than adding the same data-attribute to each element of the div.
monstListEl.on('click', '.monsterCard', function(event) {
    var nameOfMonster = ($(event.target).attr('data-name'));
    console.log(nameOfMonster);
    savedMonsterArray.push(nameOfMonster);
    var savedMonster = $("<li>");
    savedMonster.addClass("list-group-item").text(nameOfMonster).attr('data-name', nameOfMonster);
    $("#save-history").append(savedMonster);
 
    localStorage.setItem("Monster-Name", JSON.stringify(savedMonsterArray));

});

// remove monster from list when clicked
$('#save-history').on('submit', '.list-group-item', function(event) {
    event.target.remove();
    var remove = $(event.target).attr('data-name')
    console.log(`${remove} sakujo!`);
    savedMonsterArray.splice($.inArray(remove, savedMonsterArray),1)
    console.log(savedMonsterArray);
    localStorage.setItem("Monster-Name", JSON.stringify(savedMonsterArray));

});


 
 // populate saved monsters from local storage
 function callStorage() {
    console.log("hello");
    savedMonsterArray = JSON.parse(localStorage.getItem("Monster-Name")) || [];
    for (var i = 0; i < savedMonsterArray.length; i++) {
        var localMonster = savedMonsterArray[i];
        // Had to add .attr('data-name', localMonster) to the below string to it to properly remove items populated from callStorage().
        var savedMonster = $("<li>").addClass("list-group-item").text(localMonster).attr('data-name', localMonster);
        $("#save-history").append(savedMonster);
    }
};


// TODO: Append "x" after items in the storage list when hovered.

// TODO: Stretch goal: Add the appropriate class to the saved monsters (so they get the gradients).


 
 // If we wanted to go really ham for some reason, we could add further query parameters that would allow people to filter by what sources they want. Since some of these sources are *really* weird, and the API returns the source of the material which can be filtered using "?document__slug=".
