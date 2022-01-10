<!-- Don't feel like you need to read this verbatim. It's just to remind us what things we have to cover. -->

## Intro

### Nick
### **Page 1:** Intro Page
Welcome to our presentation! Our group has built a monster search application for the tabletop RPG Dungeons & Dragons 5th Edition!

### **Page 2:** The Party

*Introduce party*

## Elevator Pitch

### Ben
### **Page 3:** Overview
Using the right monsters is the most important part of building any D&D encounter. But it's been 7+ years since 5th Edition launched, and there are now hundreds of creatures scattered across dozens of source books. Often these books are badly indexed and arranged, and with a huge range of Challenge Ratings (basically a monster's level), finding the right monster can be a huge pain.

Fortunately, with the magic of APIs and open5e, now there's an easy way to look up creatures of a certain Challenge Rating across all of 5th Edition!

Tools used:
* HTML, CSS, JavaScript
* Foundation
* Open5e API
* Spoontacular API
* GitHub & GitBash
* VS Code

## Concept

### Bailey
### **Page 4:** User Story
*User Story*
As a DM (Dungeon Master) of Dungeons & Dragons:
* I want to be able to quickly and easily look up monsters I can use for my encounters.
* I want to tell at a glance what type the creature is.
* I want to know its ability scores (Strength, Dexterity, etc.).
* I want to be able to make a list of monsters I'm considering using.
* I want my list to be saved between sessions.
* I want to be inspired by pictures of delicious food.

## Process
### **Page 5:** *Toss to live page screen share*

### Nick
*Explain Foundation*

### Ben
*Explain open5e*

### Grant
*Explain spoonacular*

## Challenges

### Ben
As the project manager, I pretty much just told other people what to do and then watched YouTube.
<!-- That is a joke. -->

* Because most objects are being generated dynamically, passing the right data to the right element, and handling that in local storage, was very important.
* The API returns a maximum of 50 items per request, so we had to add "pagination" to the app to display anything that went over the first 50 returns.
* The saved menu in particular was difficult to get working. The biggest challenge with it was finding a way to not only remove a specific item when clicked, but also find and remove its entry from local storage.

## Demo!

### Nick
*Show challenge rating parameters and run a search*

### Ben
*Explain monster stats* <!-- Ben is the D&D SME, so he'll do most of the rules-related explainers -->  
*Explain how the backgrounds work*  
*Do pagination explainer*  

### Grant
*Show spoontacular*

### Nick
*Talk about saved list and local storage*

### Grant
*Show off overall iterface, nav, links, etc.*  
*Show GitHub link to page*

## Future Developments
### Ben
* Float the UI at the top of the page when the user scrolls down.
* When a user hovers over a saved creature, that monster's card is displayed.
* Each monster's card has a button which when clicked displays the monster's full data (in a modal).
* Checkboxes could be included that would allow users to narrow down the source books that the search pulls from (e.g. just the base game, or filter for certain expansion books).

## Questions!
### **Page 6:** Q&A
