
function setup() {

    noCanvas();


getData();
async function getData() {
    const response = await fetch('/api')
    const data = await response.json();


    for (item of data) {
        const root = document.createElement('div');
        const mood = document.createElement('div');
        const geo = document.createElement('div');
        const date = document.createElement('div');
        const image = document.createElement('img');



        mood.textContent = `mood: ${item.mood}`;
        geo.textContent = `LAT: ${item.myla}°, LON: ${item.mylo}°`;
        const dateString = new Date(item.timestamp).toLocaleString();
        date.textContent = dateString;
        image.src = item.image64;





        root.append(mood, geo, date, image);
        document.body.append(root);

    }
    console.log(data);


};
}