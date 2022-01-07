var imageFood = document.querySelector("#img1");
var API1 =  "bc3600e23d5e465f999caa4b7e68f31a"
var API2 = "4205dfaac5c8485eb2c6e53fe9758c5c"
var API3 = "1234"
function randomFood(foodSearch) {
    fetch("https://api.spoonacular.com/food/menuItems/search?query=" + foodSearch + "&number=1&apiKey="+ API3 )//add API KEY when needed
        .then(function (response) {
            if (response.ok) {
                fetchStatus = "goodFood";

                return response.json();
            } else {
                fetchStatus = "badFood";
                console.log("bad")
                

                
            }
        })
        .then(function (data) {
           
            if(data){
                
                // console.log(data)
                var pic = data
                // console.log(data.menuItems[0])
               
               pic = $("#img1").attr("src",  data.menuItems[0].image);
                console.log(pic)
            }
        })
        // .catch(function(err) {
        //     console.log('Error: ' + err);
        //   });
}

  
  // Now call the function inside fetch promise resolver
//   fetch("https://api.spoonacular.com/food/menuItems/search?query=" + foodSearch + "&number=1&apiKey=" + API2  )
//     .then(CheckError)
//     .then((jsonResponse) => {
//     }).catch((error) => {
//     });

    
function getInputValue(e) {
    e.preventDefault()
    // Selecting the input element and get its value 
    var inputVal = document.getElementById("foodSearch").value;

    randomFood(inputVal);
    console.log(inputVal)
}
document.querySelector(".subBtn").addEventListener("click", getInputValue)
