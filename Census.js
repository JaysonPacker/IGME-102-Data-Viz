/**
 * Census Class
 *  Takes data from a census tract and copies it properties to the instance
 */
class Census {
    /**
     * 
     * @param {*} tract contains data from Census Tracts
     * copies properties from tract
     * assigns more properties based on the tracts properties also
     */
    constructor(tract) {

        for (let prop in tract) {
            this[prop] = tract[prop]
        }

        //console.log(tract.state)
        // map x and y based on the data's state
        if (tract.state === "GA") {
            this.x = map(tract.lon, -84.54, -84.19, 50, 1450)
            this.y = map(tract.lat, 34.08, 33.6, 50, 1450)
        }
        //console.log(this.x + "," + this.y)
        if (tract.state === "NY") {
            this.x = map(tract.lon, -77.96, -77.41, 50, 1450)
            this.y = map(tract.lat, 43.33, 42.96, 50, 1450)
        }

        if (this.medianIncome < 10000) {
            this.medianIncome = 10000
        }
        this.h = 30
        this.w = map(tract.population, 1000, 8000, 20, 60)
        this.giniColor = color(map(tract.gini, 0, 1, 0, 255), 0, 0,100 )
        this.depressionColor = color(255,map(tract.outcomes.Depression, 0, 100, 0, 255), 255,100)
        this.drinkersH = map(tract.risks["Binge Drinking"], 0, 100, 0, this.h)
        this.incomeH = map(this.medianIncome, 10000, 150000, 0, this.h)

        //console.log(this)
    }
/**
 * 
 * @param {*} options Contains data from the UI class instance
 * uses that info do decide what to display
 */
    display(options) {
        //console.log(options)
       // fill(255,100)
        //ellipse(this.x, this.y, this.w, this.h)
        rectMode(CENTER)
        //console.log(options.vizOptions.value())
        switch (options.vizOptions.value()) {
            case '1':
                fill(this.giniColor)
                ellipse(this.x, this.y, this.w, this.h)
                fill(0, 250, 0, 50)
                arc(this.x, this.y, this.w, this.h, 0, 360 * (this.white / this.population))
                fill("Azure")
                rect(this.x, this.y, 3, this.incomeH)//TODO))
                break;
            case '2':
                fill(this.depressionColor)
                ellipse(this.x, this.y, this.w, this.h)
                fill(70, 130, 180, 50)
                arc(this.x, this.y, this.w, this.h, 0, 360 * (this.adults / this.population))
                fill("Azure")
                rect(this.x, this.y, 3, this.drinkersH)
                break;
        }


        console.log("displayed")

        if (options.showDetails.checked()) {
            fill(0, 200)
            textSize(8)
            textAlign(CENTER)
        
            text(this.toString(options.vizOptions.value()), this.x, this.y)
        }

    }

    toString(infoChoice) {
        let info

        if (infoChoice === '1') {
            info = "pop " + form.num.format(this.population) + ", " + form.pct.format(this.white / this.population) + " white \n"
                + form.cur.format(this.medianIncome) + " median income \n" + form.num.format(this.gini) + " GINI index"

        }
        if (infoChoice === '2') {
            info = "pop " + form.num.format(this.population) + ", " + form.num.format(this.adults) + " adults \n"
                + form.num.format(this.outcomes.Depression) + "%  of adults depressed \n" + form.num.format(this.risks["Binge Drinking"]) + "% of adults binge drink"
        }
        //console.log("info: "+info)    
        return info;
    }
}