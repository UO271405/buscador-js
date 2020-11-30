"use strict";
class NewsSearcher{
    constructor(){
        this.apikey = "7935cdd94991c17859785285d21b5038";
        this.tema = "";
        this.error = "<h2>No se pudo obtener información de <a href='https://openweathermap.org'>OpenWeatherMap</a></h2>";
    }
    
    load(){
        this.tema = document.getElementById("txtPalabraClave").value;
        var noticias = document.querySelector('.news');

        //empty
        if(this.tema === ''){
            alert("Palabra clave no introducida");
            return;
        }
        //Para vaciar la lista
        noticias.innerHTML = '';

        //Obtener url
        var url = "https://gnews.io/api/v4/search?q=" + this.tema + "&token=" + this.apikey;
        
        
        var res = $.getJSON(url).done(function(datos){
            $.each(datos.articles, function(i, item){
                    //$('.news').append("<a href=" + item.url +">"+ item.title + "</a><br>");
                    //
                    //let li = document.createElement('li');
                    let p = document.createElement('p');
                    let a = document.createElement('a');
                    a.setAttribute('href', item.url);
                    a.setAttribute('target', '_blank');
                    a.textContent = item.title;
                    let br = document.createElement('br');
                    p.appendChild(a);
                    noticias.appendChild(p);
            })
        })
    }

    cargarDatos(ciudad, codigoPais){
        var url = "https://api.openweathermap.org/data/2.5/weather?q=" + ciudad + this.tipo + this.unidades + this.idioma + "&APPID=" + this.apikey;
        
        $.ajax({
            dataType: "json",
            url: url,
            method: 'GET',
            success: function(datos){
                //$('.json').text(JSON.stringify(datos, null, 2));

                $('.datos').empty();    
                $('.datos').append('<img src="https://openweathermap.org/img/w/' + datos.weather[0].icon + '.png" height="64px" width="64px">');
                $('.datos').append("<p>Ciudad: " + datos.name + "<br>");
                $('.datos').append("País: " + datos.sys.country + "<br>");
                $('.datos').append("Latitud: " + datos.coord.lat + " grados<br>");
                $('.datos').append("Longitud: " + datos.coord.lon + " grados<br>");
                $('.datos').append("Temperatura: " + datos.main.temp + " grados Celsius<br>");
                $('.datos').append("Máx temperatura: " + datos.main.temp_max + " celsius<br>");
                $('.datos').append("Min temperatura: " + datos.main.temp_min + " celsius<br>");
                $('.datos').append("Presión: " + datos.main.pressure + " milímetros<br>");
                $('.datos').append("Humedad: " + datos.main.humidity + "%<br>"); 
                $('.datos').append("Amanece a las: " + new Date(datos.sys.sunrise *1000).toLocaleTimeString() + "<br>"); 
                $('.datos').append("Oscurece a las: " + new Date(datos.sys.sunset *1000).toLocaleTimeString() + "<br>"); 
                $('.datos').append("Velocidad del viento: " + datos.wind.speed + "metros/segundo<br>"); 
                $('.datos').append("Dirección del viento: " + datos.wind.deg +"grados<br>");
                $('.datos').append("Fecha de la medida: " + new Date(datos.dt *1000).toLocaleDateString() + "<br>");
                $('.datos').append("Descripción: " + datos.weather[0].description + "<br>");
                $('.datos').append("Visibilidad: " + datos.visibility + " metros<br>");
                $('.datos').append("Nubosidad: " + datos.clouds.all + " %</p>");
            },
            error:function(){
                document.write(this.error);    
            }
        });
    }
}

var searcher = new NewsSearcher();