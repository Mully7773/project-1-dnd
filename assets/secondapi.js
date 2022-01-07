var imageFood = document.querySelector("#img1");
var API1 = "bc3600e23d5e465f999caa4b7e68f31a"
var API2 = "4205dfaac5c8485eb2c6e53fe9758c5c"
var inputVal;

function randomFood(foodSearch) {
    fetch("https://api.spoonacular.com/food/menuItems/search?query=" + foodSearch + "&number=1&apiKey=123345456" )//add API KEY when needed
        .then(function (response) {
            if (response.ok) {
                fetchStatus = "goodFood";
                return response.json();
            }else{
                fetchStatus = "bad"
                backUp(inputVal);
            }
            
        })
        .then(function (data) {
            if(data){   
                var pic = data
                pic = $("#img1").attr("src",  data.menuItems[0].image);
                console.log(data)
           
        }
    })
}
function  backUp(inputVal) {
    

    fetch("https://api.spoonacular.com/food/menuItems/search?query=" + inputVal + "&number=1&apiKey=" + API2 )
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
            var pic = data
          pic =  $("#img1").attr("src",  data.menuItems[0].image);
            console.log(data)
        }
    })
}




    
function getInputValue(e) {
    e.preventDefault()
    // Selecting the input element and get its value 
    var inputVal = document.getElementById("foodSearch").value;

    randomFood(inputVal)
    if(randomFood = false){
        backUp(inputVal)
    }
    
    console.log(inputVal)
}
document.querySelector(".subBtn").addEventListener("click", getInputValue)
