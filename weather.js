 function weather(cityId, cityName) {
			
	var xhr = new XMLHttpRequest();
	var urlWeather='http://api.openweathermap.org/data/2.5/forecast?id='+cityId+'&mode=json&units=Metric&cnt=1&APPID=c43bcb7d07c6849f01b8c0539a370a5a'
    xhr.open('GET', urlWeather, true);
    xhr.send();

    xhr.onreadystatechange = function() {
		if (xhr.readyState != 4) return;
        if (xhr.status != 200) {
			alert(xhr.status + ': ' + xhr.statusText);
        } else {		
			var weather = {};
			
			let jsonResp = JSON.parse(xhr.responseText, function(key, value) {
				if (key == 'Number') return new Number(value);
				return value;
			});
			
			//температура
			if (jsonResp.list[0].main.temp>0){
				weather.temp = "+" + Math.round(jsonResp.list[0].main.temp);
			} else {
				weather.temp = Math.round(jsonResp.list[0].main.temp);
			}
						
			//влажность
			weather.humidity=jsonResp.list[0].main.humidity+"%"
		  
			//скорость ветра
			weather.windSpeed=Math.round(jsonResp.list[0].wind.speed)+" м/с"
			
			// давление
			weather.pressure=Math.round(jsonResp.list[0].main.pressure*0.750062)+" мм.рт.ст."
			
			//осадки
			weather.clouds=jsonResp.list[0].weather[0].main			
			
			var theTemp=document.getElementById("temp");
			theTemp.innerHTML=weather.temp;		
			var theHumidity=document.getElementById("humidity");
			theHumidity.innerHTML=weather.humidity;
			var theWindSpeed=document.getElementById("windSpeed");
			theWindSpeed.innerHTML=weather.windSpeed;
			var thePressure=document.getElementById("pressure");
			thePressure.innerHTML=weather.pressure;		
			var theCity=document.getElementById("city");
			theCity.innerHTML=cityName;
			var theClouds=document.getElementById("clouds");
			
			switch (weather.clouds) {	
				case "Clear":
					theClouds.src="img/Clear.svg";
					break;
				case "Clouds":
					theClouds.src="img/Clouds.svg"
					break;
				case "Rain":
					theClouds.src="img/Rain.svg"
					break;	
				case "Snow":
					theClouds.src="img/Snow.svg"
					break;
				case "Drizzle":
					theClouds.src="img/Drizzle.svg"
					break;	
				case "Thunderstorm":
					theClouds.src="img/Thunderstorm.svg"
					break;	
				 default:
					theClouds.src="img/weather_null.svg"
				}	
        }
	}		 
}
	
(function Run(){
	var arrCity=JSON.parse(listCity)
	var i = arrCity.length-1;
	(function ret() {
		weather(arrCity[i].id,arrCity[i].name);
		i = ++i % arrCity.length;
		window.setTimeout(ret, 5000)
	})()
}())