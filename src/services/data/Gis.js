import Contants from '../Constants'

let Gis = {
    // returns GeoJSON polygons of all counties in the US
    getUSCounties: async function() { 
        const PAGESIZE = 2000;
        let offset = 0;
        let data = null;
        let exceededLimit = false;

        // the API only returns a max of 2000 records, so we need to make 
        // multiple requests with an offset to retrieve everything
        do {
            let response = await fetch(Contants.ApiUrls.GETUSCOUNTIES
                    .replace('{{offset}}', offset * PAGESIZE));
 
            let json = await response.json(); 

            if(!data) {
                data = json;
            } else {
                data.features = data.features.concat(json.features);
            }

            exceededLimit = json.properties && json.properties.exceededTransferLimit;

            offset++;
        }
        while(exceededLimit);

        return data; 
    }
}

export default Gis;