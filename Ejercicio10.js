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
                    let li = document.createElement('li');
                    let a = document.createElement('a');
                    a.setAttribute('href', item.url);
                    a.setAttribute('target', '_blank');
                    a.textContent = item.title;
                    li.appendChild(a);
                    noticias.appendChild(li);
            })
        })

        /*var res = $.getJSON(url).done(function(datos){
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
                    noticias.appendChild(br);
            })
        })*/
    }
}

var searcher = new NewsSearcher();