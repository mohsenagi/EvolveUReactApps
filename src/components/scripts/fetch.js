import {City} from './CityAndCommunity.js'
const url = 'https://my-first-react-app-server.herokuapp.com/';

const fetchfunctions = {
    async postData(url = '', data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
            method: 'POST',     // *GET, POST, PUT, DELETE, etc.
            mode: 'cors',       // no-cors, *cors, same-origin
            cache: 'no-cache',  // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow',         // manual, *follow, error
            referrer: 'no-referrer',    // no-referrer, *client
            body: JSON.stringify(data)  // body data type must match "Content-Type" header
        });
        const json = await response.json();    // parses JSON response into native JavaScript objects
        json.status = response.status;
        json.statusText = response.statusText;
        return json;
    },

    async getData(url = '') {
        // Default options are marked with *
        const response = await fetch(url, {
            method: 'GET',     // *GET, POST, PUT, DELETE, etc.
            mode: 'cors',       // no-cors, *cors, same-origin
            cache: 'no-cache',  // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow',         // manual, *follow, error
            referrer: 'no-referrer',    // no-referrer, *client
        });
        const json = await response.json();    // parses JSON response into native JavaScript objects
        json.status = response.status;
        json.statusText = response.statusText;
        return json;
    },

    async loadLocal () {
        const response = await fetch('https://cors-anywhere.herokuapp.com/https://simplemaps.com/static/data/country-cities/ca/ca.json');
        const json = await response.json();
        return json;
    },

    async load(newCommunity) {
        let data = await this.getData(url + 'all');
        if (data.length !== 0) {
            newCommunity.Cities = data.map(itm => new City(itm.id, itm.Name, itm.Latitude, itm.Longitude, itm.Population))
        }
        return newCommunity.Cities.length
    },

    async clear() {
        await this.postData(url + 'clear');
    },

    async addNew(newCity) {
        let data = await this.postData(url + 'add', newCity);
        return data;
    },

    async update(currentCity) {
        await this.postData(url + 'update', currentCity);
    },

    async delete(foundKey) {
        await this.postData(url + 'delete', {key: foundKey});
    }

}

export default fetchfunctions;