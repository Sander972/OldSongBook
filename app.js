function loadJSON(callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'songs.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}


function init() {
    loadJSON(function (response) {
        // Parse JSON string into object
        var actualJson = JSON.parse(response);
        //console.log(actual_JSON);

        actualJson.forEach(function(song){
            
            var tr = document.createElement('tr');
            var th = document.createElement('th');
            th.setAttribute('scope', 'row');
            tr.appendChild(th);
            th.innerHTML += song.title;
            var td = document.createElement('td');
            tr.appendChild(td);
            var a = document.createElement('a');
            a.setAttribute('href', "https://" + song.link);
            a.setAttribute('id', 'link' + i);
            a.className = 'badge badge-primary';
            a.innerHTML += song.link;
            td.appendChild(a);
            document.getElementById('foo').appendChild(tr);
          });
    });
}


init();