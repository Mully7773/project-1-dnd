var imageFood = document.querySelector("#img1");
var API1 =  "bc3600e23d5e465f999caa4b7e68f31a"
var API2 = "4205dfaac5c8485eb2c6e53fe9758c5c"
function randomFood(foodSearch) {
    fetch("https://api.spoonacular.com/food/menuItems/search?query=" + foodSearch + "&number=1&apiKey=" + NOTHING)//add API KEY when needed
        .then(function (response) {
            if (response.ok) {
                fetchStatus = "goodFood";

                return response.json();
            } else {
                fetchStatus = "badFood";
                

            }
        })
        .then(function (data) {
           
            if(data.expires){
                
                // console.log(data)
                
                console.log(data.menuItems[0])
               
                $("#img1").attr("src",  data.menuItems[0].image);
                
            }
            
           
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