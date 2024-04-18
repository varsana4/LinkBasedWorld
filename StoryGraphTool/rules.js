var  gv = 0;
class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData.Title); 
        this.engine.addChoice("Begin the story");
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation); 
    }
}

class Location extends Scene {
    create(key) {
        let locationData = this.engine.storyData.Locations[key]; 
        this.engine.show(locationData.Body);
        
        if(locationData.Choices && locationData.Choices.length > 0) { 
            for(let choice of locationData.Choices) { 
                
                if(choice.Target === "NextRoom") {
                    if (choice.Text != "Proceed to Next Room" ){
                            this.engine.addChoice(choice.Text, choice); 
                    } 
                    else
                    {
                        if (gv===3){
                          this.engine.addChoice(choice.Text, choice); 
                        }  
                    }
                }
                else   
                {
                    this.engine.addChoice(choice.Text, choice); 
                } 
            }
        } else {
            this.engine.addChoice("The end.");
        }
    }

    handleChoice(choice) {
        if(choice) {
            this.engine.show("&gt; "+choice.Text);
            if (choice.Text === "Search for the Ancient Key" || choice.Text === "Search for the Crystal Orb" || choice.Text === "Search for the Scroll" )
            {
                gv=gv+1;
            }
            this.engine.gotoScene(Location, choice.Target);
        } else {
            this.engine.gotoScene(End);
        }
    }

}



class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');
