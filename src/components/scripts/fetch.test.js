global.fetch = require('node-fetch');

import {City, Community} from './CityAndCommunity.js'
import fetchfunctions from './fetch.js'

test("clear and Load", async () => {
    let data = await fetchfunctions.clear()
    let newCommunity = new Community;
    await fetchfunctions.load(newCommunity);
    expect(newCommunity.Cities.length).toEqual(0)
});

test("addNew and Load", async () => {
    let data = await fetchfunctions.addNew({
        "Name": "Yumai", 
        "Latitude": 28.6263, 
        "Longitude": 93.0751, 
        "Population": 28,
    });
    data = await fetchfunctions.addNew({
        "Name": "Bonito", 
        "Latitude": -21.1266, 
        "Longitude": -56.4841, 
        "Population": 210,
    });
    data = await fetchfunctions.addNew({
        "Name": "Sylvan Lake", 
        "Latitude": 52.3065, 
        "Longitude": -114.0973, 
        "Population": 15000,
    });
    // data = await fetchfunctions.addNew({
    //     "Name": "South Brisbane", 
    //     "Latitude": -27.4766, 
    //     "Longitude": 153.0167, 
    //     "Population": 60000,
    // });
    // data = await fetchfunctions.addNew({
    //     "Name": "Calgary", 
    //     "Latitude": 51.0447, 
    //     "Longitude": -114.0719, 
    //     "Population": 1200000,
    // });
    let newCommunity = new Community;
    await fetchfunctions.load(newCommunity);
    expect(newCommunity.Cities.length).toEqual(3)
});
test ("Update", async () => {
    let newCommunity = new Community;
    await fetchfunctions.load(newCommunity);
    let key1 = newCommunity.Cities.filter(itm => itm.Name === 'Yumai')[0]['key']
    await fetchfunctions.update({
        "key": key1,
        "Name": "Yumai", 
        "Latitude": 28, 
        "Longitude": 93, 
        "Population": 30,
    });
    await fetchfunctions.load(newCommunity);
    expect(newCommunity.Cities.filter(itm => itm.key === key1)[0].Population).toEqual(30);
});
test ("delete", async() => {
    let newCommunity = new Community;
    await fetchfunctions.load(newCommunity);
    let key1 = newCommunity.Cities.filter(itm => itm.Name === 'Yumai')[0]['key']
    await fetchfunctions.delete(key1);
    await fetchfunctions.load(newCommunity);
    expect(newCommunity.Cities.length).toEqual(2);
});