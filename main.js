
        // Making a map and tiles 
        const mymap = L.map('issMap').setView([0, 0], 1);  // initial latitude and longitude of the center of what is being loaded
        
        const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
        
        const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        const tiles = L.tileLayer(tileUrl, { attribution });
        tiles.addTo(mymap);

        // Making a marker with a custom icon
        var issIcon = L.icon({
        iconUrl: 'images/iss.png',
        iconSize: [60, 60],
        iconAnchor: [25, 16]
        });
    
        const marker = L.marker([0, 0], {icon: issIcon}).addTo(mymap);

        
        // DATA from : https://wheretheiss.at/w/developer 
        const api_url = 'https://api.wheretheiss.at/v1/satellites/25544';
        
        // Get data with creating a function
        async function getISS(){
            const response = await fetch (api_url);
            const data = await response.json();                         // converting response into json
            const { latitude, longitude } = data;                       // javascript destucturing, which takes the pieces out of a js object or an array and puts them into seperate variables

            //specifying the location of the marker and map itself
            
            marker.setLatLng([latitude, longitude]);
            mymap.setView([latitude, longitude], 2);

            // add javascript function toFixed, which will fix what it is adding to only 2 decimal places
            document.getElementById('lat').textContent = latitude.toFixed(2);
            document.getElementById('lon').textContent = longitude.toFixed(2);

        }

        getISS();

        // setInterval function = take a function and have it happen every so often
        
        setInterval(getISS, 1000);