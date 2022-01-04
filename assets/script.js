var subBtn = $('.submit');
var fetchStatus = "";

function goGet() {
    // Change this to reflect an input.
    var paramVar = '11';
    var requestUrl = 'https://api.open5e.com/monsters/?challenge_rating=' + paramVar;
    fetch(requestUrl)
    .then(function (response) {
        // Conditionals (and fetchStatus variable) unnecessary if using dropdown menu selection.
        if (response.ok) {
            fetchStatus = "good";
            return response.json();
        } else {
            fetchStatus = "bad"
            console.log("bad request");
        }
    })
    .then(function (data) {
        if (fetchStatus == "good") {
            console.log(data);
            populate();
        } else {
            console.log("bad request the second");
        }
    })
}

function populate() {
    for (var i = 0; i < data.length; i++) {
        thisMonster[i] = data
    }
};

subBtn.on('click', goGet());
