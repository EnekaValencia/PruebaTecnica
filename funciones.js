function buscarPeliculaPorTitulo(nombre)
{
    var a = nombre.value;
        console.log(a)
    var tituloPelicula = document.getElementById("titulo").value;
    var informacionPelicula = "";

    if(tituloPelicula == ""){
        informacionPelicula += 
            "<tr>" + 
                "<td> Introduce una pelicula para buscar </td>" + 
            "</tr>";   
        document.getElementById("informacion").innerHTML = informacionPelicula;
    } else {
        
        if(window.XMLHttpRequest){
            httpRequest = new XMLHttpRequest();
        } else {
            httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
        }

        function getRandomInt() {
            return Math.floor(Math.random() * 6);
        }
        httpRequest.onreadystatechange = function() {
            if(this.readyState == 4 && this.status == 200){
               var datos = JSON.parse(this.responseText);
               datos.Search.forEach(element => {
                    informacionPelicula += 
                    "<tr>" +
                        "<td>" + element.imdbID + "</td>" +
                        "<td>" + element.Title + "</td>" + 
                        "<td>" + element.Year + "</td>" +
                        "<td>" + getRandomInt(); + "</td>" +
                    "</tr>";
               });
               mostrarTabla();
               document.getElementById("informacion").innerHTML = informacionPelicula;

            } else {
                "<tr>" + 
                    "<td>  No hay información de la pelicula" + tituloPelicula +  "</td>" + 
                "</tr>"; 
            }
        };
        httpRequest.open("POST","http://www.omdbapi.com/?apikey=731e41f&s=" + tituloPelicula + "&plot=full&page=" + a, true);
        httpRequest.send();
    }
}

function mostrarTabla() {
    div = document.getElementById("cabecera");
    div.style.display = '';
}