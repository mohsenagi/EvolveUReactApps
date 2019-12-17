class City {
    constructor (Key, Name, Latitude, Longitude, Population) {
        this.key = Key;
        this.Name = Name;
        this.Latitude = Latitude;
        this.Longitude = Longitude;
        this.Population = Population;
    }
    show() {
        return `Name: ${this.Name}\nLatitude: ${this.Latitude}\nLongitude: ${this.Longitude}\nPopulation: ${this.Population}`;
    }
    async movedIn(num) {
        this.Population += num;
    }
    async movedOut(num) {
        this.Population -= num;
    }
    howBig() {
        if (this.Population <= 100) return "Hamlet";
        if (this.Population < 1000) return "Village";
        if (this.Population <= 20000) return "Town";
        if (this.Population <= 100000) return "Large Town";
        if (this.Population > 100000) return "City";
    }
    whichHemisphere () {
        if (this.Latitude <=0) return "Southern Hemisphere";
        if (this.Latitude >0) return "Northern Hemisphere";
    }
}

class Community {
    constructor () {
        this.Cities = [];
    }
    addNewCity (Key, Name, Latitude, Longitude, Population) {
        let message;
        if (this.Cities.filter((itm) => (itm.Latitude === Latitude && itm.Longitude === Longitude)).length === 0) {
            let newCity = new City (Key, Name, Latitude, Longitude, Population);
            this.Cities.push(newCity);
            message = `The new City has been added.\nName: ${Name}`
        } else {
            message = `There is already a city with the same latitude and longitude.\nPlease edit your inputs.`
        }
        return message;
    }
    removeCity (foundKey) {
        this.Cities = this.Cities.filter((itm) => (itm.key !== foundKey));
    }
    getPopulation () {
        return this.Cities.reduce((acc, itm) => itm.Population+acc, 0);
    }
    getMostNorthern() {
        let cities = this.Cities.map(itm => itm)
        cities.sort((a, b) => b.Latitude-a.Latitude);
        return cities[0];
    }
    getMostSouthern() {
        let cities = this.Cities.map(itm => itm)
        cities.sort((a, b) => a.Latitude-b.Latitude);
        return cities[0];
    }
}

export {City, Community};