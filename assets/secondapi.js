
function randomFood(foodSearch) {
    fetch("https://api.spoonacular.com/food/menuItems/search?query=" + foodSearch + "&number=1&apiKey=bc3600e23d5e465f999caa4b7e68f31a")
        .then(function (response) {
            if (response.ok) {
                fetchStatus = "goodFood";

                return response.json();
            } else {
                fetchStatus = "badFood";
                // console.log(foodSearch);

            }
        })
        .then(function (data) {
           
            if(data.expires){
                console.log(data.menuItems[0].title)
                console.log(data)
            }
            // picNiss = data.menuItems[1].title;
            // console.log(picNiss)
           
        })

        
        
}
randomFood()
function getInputValue(e) {
    e.preventDefault()
    // Selecting the input element and get its value 
    var inputVal = document.getElementById("foodSearch").value;

    randomFood(inputVal);
    console.log(inputVal)
}
document.querySelector(".subBtn").addEventListener("click", getInputValue)