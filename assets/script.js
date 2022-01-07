var searchBtn = $('#searchBtn');
var crVar = $('#crEnter');
var monstListEl = $('#monster-list');
var monsterArray = [];
var savedMonsterArray = [];
var savedMonsterTypes = [];
var acceptedClasses = ['aberration', 'beast', 'celestial', 'construct', 'dragon', 'elemental', 'fey', 'fiend', 'giant', 'humanoid', 'monstrosity', 'ooze', 'plant', 'swarm', 'undead'];




function goGet(requestUrl) {
    $('#pag-spot').empty();
    fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        monsterArray = data;
        populate();
        if (monsterArray.next || monsterArray.previous) {
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

$('#pag-spot').on('click', '.pag-button', function(event) {
    goGet($(event.target).attr('data-request'))
    console.log ($(event.target).attr('data-request'));
});

function populate() {
    monstListEl.empty();
    for (var i = 0; i < monsterArray.results.length; i++) {
        var thisMonster = monsterArray.results[i];
        
        typeCleaner();

        var monsterCard = $('<div>').addClass(`monster-card ${thisMonster.type}-type`).attr({'data-name': thisMonster.name, 'data-type': thisMonster.type});
        var monsterName = $('<h4>').addClass('monsterName').text(thisMonster.name).attr({'data-name': thisMonster.name, 'data-type': thisMonster.type});
        var monsterSize = $('<h5>').addClass('monsterSize').text(`${thisMonster.size} `).attr({'data-name': thisMonster.name, 'data-type': thisMonster.type});
        var monsterType = $('<span>').addClass('monsterType').text(thisMonster.type).attr({'data-name': thisMonster.name, 'data-type': thisMonster.type});
        var monsterStrength = $('<p>').text("Strength: " + thisMonster.strength).attr({'data-name': thisMonster.name, 'data-type': thisMonster.type});
        var monsterDexterity = $('<p>').text("Dexterity: " + thisMonster.dexterity).attr({'data-name': thisMonster.name, 'data-type': thisMonster.type});
        var monsterConstitution = $('<p>').text("Constitution: " + thisMonster.constitution).attr({'data-name': thisMonster.name, 'data-type': thisMonster.type});
        var monsterIntelligence = $('<p>').text("Intelligence: " + thisMonster.intelligence).attr({'data-name': thisMonster.name, 'data-type': thisMonster.type});
        var monsterWisdom = $('<p>').text("Dexterity: " + thisMonster.wisdom).attr({'data-name': thisMonster.name, 'data-type': thisMonster.type});
        var monsterCharisma = $('<p>').text("Charisma : " + thisMonster.charisma).attr({'data-name': thisMonster.name, 'data-type': thisMonster.type});


        monsterCard.append(monsterName);
        monsterSize.append(monsterType);
        monsterCard.append(monsterSize);
        monsterCard.append(monsterStrength);
        monsterCard.append(monsterDexterity);
        monsterCard.append(monsterConstitution);
        monsterCard.append(monsterIntelligence);
        monsterCard.append(monsterWisdom);
        monsterCard.append(monsterCharisma);
        
        monstListEl.append(monsterCard);

    }

    $("#top-display").text(`Challenge Rating: ${thisMonster.challenge_rating} (${monsterArray.count} Results)`)

    function typeCleaner() {
        // console.log(thisMonster.type);
        if (!acceptedClasses.includes(thisMonster.type)) {
            // console.log(`type error: ${thisMonster.name} = ${thisMonster.type}`)
            // humanoid checker
            if (thisMonster.type.includes('human') || thisMonster.type.includes('Human')) {
                // console.log(`humanoid discovered: ${thisMonster.name}`);
                thisMonster.type = "humanoid";
                console.log(`fixed ${thisMonster.name}`);
            }
            // beast checker
            if (thisMonster.type.includes('beast') || thisMonster.type.includes('Beast')) {
                // console.log(`beast discovered: ${thisMonster.name}`);
                thisMonster.type = "beast";
            }
            // swarm checker
            if (thisMonster.type.includes('swarm') || thisMonster.type.includes('Swarm')) {
                // console.log(`swarm discovered: ${thisMonster.name}`);
                thisMonster.type = "swarm";
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
monstListEl.on('click', '.monster-card', function(event) {
    var nameOfMonster = ($(event.target).attr('data-name'));
    var typeOfMonster = ($(event.target).attr('data-type'));
    console.log(nameOfMonster);
    console.log(typeOfMonster);
    savedMonsterArray.push(nameOfMonster);
    savedMonsterTypes.push(typeOfMonster);
    var savedMonster = $("<li>");
    savedMonster.addClass(`list-group-item ${typeOfMonster}-type`).text(nameOfMonster).attr({'data-name': nameOfMonster, 'data-type': typeOfMonster});
    $("#save-history").append(savedMonster);
 
    localStorage.setItem("Monster-Name", JSON.stringify(savedMonsterArray));
    localStorage.setItem("Monster-Type", JSON.stringify(savedMonsterTypes));

});

// remove monster from list when clicked
$('#save-history').on('click', '.list-group-item', function(event) {
    event.target.remove();
    var remove = $(event.target).attr('data-name');
    var removeType = $(event.target).attr('data-type');
    console.log(`${remove} sakujo! (${removeType})`);
    savedMonsterArray.splice($.inArray(remove, savedMonsterArray),1)
    savedMonsterTypes.splice($.inArray(removeType, savedMonsterTypes),1)
    console.log(savedMonsterArray);
    console.log(savedMonsterTypes);

    localStorage.setItem("Monster-Name", JSON.stringify(savedMonsterArray));
    localStorage.setItem("Monster-Type", JSON.stringify(savedMonsterTypes));
    
});
 
 // populate saved monsters from local storage
 function callStorage() {
    console.log("hello");
    savedMonsterArray = JSON.parse(localStorage.getItem("Monster-Name")) || [];
    savedMonsterTypes = JSON.parse(localStorage.getItem("Monster-Type")) || [];
    for (var i = 0; i < savedMonsterArray.length; i++) {
        var localMonster = savedMonsterArray[i];
        var localType = savedMonsterTypes[i];
        var savedMonster = $("<li>").addClass(`list-group-item ${localType}-type`).text(localMonster).attr({'data-name': localMonster, 'data-type': localType});
        $("#save-history").append(savedMonster);
    }
};

callStorage();
