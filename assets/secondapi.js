var imageFood = document.querySelector("#img1");
var API1 = "bc3600e23d5e465f999caa4b7e68f31a"
var API2 = "4205dfaac5c8485eb2c6e53fe9758c5c"
function randomFood(foodSearch) {

    fetch("https://api.spoonacular.com/food/menuItems/search?query=" + foodSearch + "&number=1&apiKey=" + API1 )//add API KEY when needed

        .then(function (response) {
            if (response.ok) {
                fetchStatus = "goodFood";
                return response.json();
            }else{
                fetchStatus = "bad"
                backUp();
            }
        })
        .then(function (data) {
            if(data){   
                
                 $("#img1").attr("src",  data.menuItems[0].image);
                console.log(data)
        }
    })
}

function  backUp() {
    var stuff = document.getElementById("foodSearch").value;

    fetch("https://api.spoonacular.com/food/menuItems/search?query=" + stuff + "&number=1&apiKey=" + API2 )
    .then(function (response) {
        if (response.ok) {
            fetchStatus = "goodFood";
            return response.json();
        }else{
            
            fetchStatus = "bad"
        }
    })
    .then(function (data) {
        if(data){   
            
            $("#img1").attr("src",  data.menuItems[0].image);
            console.log(data)
        }
    })
}


function getInputValue() {

    var inputVal = document.getElementById("foodSearch").value;

    randomFood(inputVal)
    
    
    console.log(inputVal)

    console.log("hello")
}=

$("#foodForm").on('submit', function(event) {
event.preventDefault();
getInputValue();
});

document.querySelector(".subBtn").addEventListener("click", getInputValue)
