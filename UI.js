class UI {

    constructor() {

        createP()
        createSpan("County to map:")

        this.radio = createRadio()
        this.radio.option("Fulton,GA")
        this.radio.option("Monroe,NY")
        this.radio.selected("Fulton,GA");
        

        createP()
        createSpan("Census Tract Health visualzation controls:")
        createElement("br")
        this.vizOptions = createSelect();
        this.vizOptions.option("GINI coefficient,white popululation,and medium income", [1])
        this.vizOptions.option("Adults,Depression,Binge Drinking", [2])
        this.vizOptions.selected(1)
        
        createElement("br")
        createElement("br")
        createSpan("Tract filters:")
        createElement("br")

        this.tractOptions = createSelect();
        this.tractOptions.option("All tracts", [0])
        this.tractOptions.option("White Pop 50% or less", [1])
        this.tractOptions.option("Median Income $100,000 or less", [2])
        this.tractOptions.selected(0)
        

        createP()
        this.showDetails = createCheckbox("Show details", false)

        this.Img = loadImage("media/viz2.png")

    }



}