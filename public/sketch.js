function setup() {

    noCanvas();
    const video = createCapture(VIDEO);
    video.size(350, 350);


    //Dichiarazione cose della pagina
    var myla = 0;
    var mylo = 0;
    var tpms = 0;


    const Map = L.map('Mypos').setView([myla, mylo], 1);



    const attribution = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>';
    const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const tiles = L.tileLayer(tileUrl, { attribution });
    tiles.addTo(Map);
    const marker = L.marker([0, 0]).addTo(Map);


    //Inizializzazione delle funzioni------------------------------------------


    const button = document.getElementById("submit");
    
    button.addEventListener('click', async event => {

        const mood = document.getElementById("mood").value;
        video.loadPixels();
        const image64 = video.canvas.toDataURL();

        if ("geolocation" in navigator) {
            console.log("ok");

            navigator.geolocation.getCurrentPosition(async position => {


                console.log(position.coords.latitude);
                console.log(position.coords.longitude);
                console.log(position.timestamp);
                console.log(position);
                myla = position.coords.latitude;
                mylo = position.coords.longitude;
                tpms = position.timestamp;






                document.getElementById('lat').textContent = myla;
                document.getElementById('lon').textContent = mylo;

                const data = { myla, mylo, tpms, mood, image64 };

                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                };


                const response = await fetch('/api', options);
                const json = response.json();
                console.log(json);




                marker.setLatLng([myla, mylo]);
                Map.setView([myla, mylo], 10);
            });
        } else {
            console.log("not ok");
        }



    });






}