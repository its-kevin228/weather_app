//grab required elements
let btn = document.getElementById('btnSend');
let cityField = document.getElementById("city");
let response = document.getElementById('response');

//request options
let baseUrl = "http://api.openweathermap.org/data/2.5/weather"
let key = "c851a6b5a1d664112bc590288fdc304e";
let xhr;

//event listeners
btn.addEventListener('click', handleClick, false);

function handleClick(e){
    //grab city value
    let city = cityField.value;
    //disable form
    cityField.disabled = true;
    btn.disabled = true;
    //show spinner
    updateUI(`<span class="loader"></span>`);
    //create xhr

    xhr = new XMLHttpRequest();
    xhr.open('GET', buildUrl(city));
    xhr.onreadystatechange = handleResponse;
    xhr.send();
}
 
function handleResponse(){
   if(xhr.readyState == 4){
       if (xhr.status == 200){
           //success
           createsuccesshtml(JSON.parse(xhr.responseText));
           
   }else{
       //failure
       createErrorHtml(JSON.parse(xhr.responseText));
   }
    
}
}

function createErrorHtml(data){
    let html = `
        <h1>Une erreur s'est produite !</h1>
        <p>${data.message}</p>
    `
    updateUI(html);
}

function createsuccesshtml(data){
    let weather = data.weather[0]
        let html =  `
            <h1>Le temps à ${data.name}</h1>
            <p class="weatherMain">
                <img src="http://openweathermap.org/img/w/${weather.icon}.png" alt="${weather.description}" /><span>${weather.description}</span>
            </p>
            <p>Température : ${data.main.temp.toFixed(1)} °C</p>
        `
        updateUI(html);
}


/*Utilities*/
let buildUrl = city => `${baseUrl}?units=metric&lang=fr&q=${city}&appid=${key}`;
let updateUI = html => {
    //empty response container
    response.innerHTML = '';
    //replace with htmlString
    response.insertAdjacentHTML( 'beforeend', html);
    //reset form
    cityField.disabled = false;
    btn.disabled = false;
}