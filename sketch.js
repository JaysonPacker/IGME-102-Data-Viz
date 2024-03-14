/**
 * Jayson Packer
 * IGME-102: P2 Census Viz
 * Display different aspects of data from the 2021 Census demographic for NY & GA census tracts in various ways
 * with user filtering options
 */

"use strict"; //catch some common coding errors

/* Global variables */

let form = {}
let myTracts = []
let options
/**
 * setup :
 */
function setup() {

   options = new UI()

   createCanvas(1500, 1700);
   text("Loading...", 1000, 750)
   formats()

   loadData()
   
}
/**
 * Calls loadData function if  an of the UI options are changed
 */
function draw(){

 options.radio.changed(loadData)
   options.vizOptions.changed(loadData)
   options.tractOptions.changed(loadData)
   options.showDetails.changed(loadData)

}


/**
 * Loads the data based UI county map choice
 */
function loadData(){
   //console.log("update")
   switch (options.radio.value()){
      case "Fulton,GA":
         loadJSON("media/gaPlacesHealthTracts.json", readTracts); 
        // console.log("Selected GA")
         break;
      case "Monroe,NY":
         loadJSON("media/nyPlacesHealthTracts(1).json", readTracts);
         //console.log("Selected NY")
         break;
   }

}

/**
 * stores number formatting objects to the form object literal
 */
function formats() {
   form.num = new Intl.NumberFormat();
   form.pct = new Intl.NumberFormat("us-EN", { style: "percent" })
   form.cur = new Intl.NumberFormat("us-EN", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}


/**
 * Iterates over json array
 * takes each indivisual object to create a census instance with its data
 * assigns the census instances to myTracts array
 * @param {*} jsonData receives json data array
 */
function readTracts(jsonData) {
   // console.log(nyTract)
   for (let i of jsonData) {
      //console.log(i)
      myTracts.push(new Census(i))
   }
   updateCanvas()
}


/**
 * Filters what instances are displayed based on user options.trackOptions' value
 * and calls all the chosen instances to display
 */
function updateCanvas() {
   background("Grey")
   let curTracts = myTracts
   //console.log(options.tractOptions.value())

 
   if (options.tractOptions.value() === "1") {
      curTracts = myTracts.filter((line) => .50 > (line.white / line.population))

   } else if (options.tractOptions.value() === '2') {
      curTracts = myTracts.filter((line) => 100000 < line.medianIncome)
   }
   image(options.Img,0,1500,400,200);
   myTracts = []
   curTracts.forEach((i) => {
   //console.log("added")
     i.display(options)

   })
curTracts = []


}