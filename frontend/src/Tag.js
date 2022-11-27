const Datastore = require('nedb')
const database = new Datastore('database.db');
database.loadDatabase();


//A tag is a short descriptor added to a checklist or journal to allow the user to search for relevant items.
//Has a name.

class Tag{
    constructor(name, color){
        this.name = name;
        this.color = color;
    }

    getName = () => {
        return this.name;
    }

    getColor = () => {
        return this.color;
    }

    //TODO: figure out how to apply a tag to objects.
    //TODO: figure out how to track which objects have which tags.
}