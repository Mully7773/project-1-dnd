var searchBtn = $('#searchBtn');
var crVar = $('#crEnter');
var fetchStatus = "";

function goGet() {
    // Change this to reflect an input.
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
            // Function populate() isn't added yet.
            // populate();
        } else {
            console.log("bad request the second");
        }
    })
}

// // Very unfinished; just a placeholder right now.
// function populate() {
//     for (var i = 0; i < data.length; i++) {
//         thisMonster[i] = data
//     }
// };

searchBtn.on('click', function() {
    goGet();
});
