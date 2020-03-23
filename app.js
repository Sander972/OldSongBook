var songBook;
var sbLength;

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

function addSong(title, link, i) {
    var tr = document.createElement('tr');
    var th = document.createElement('th');
    th.setAttribute('scope', 'row');
    tr.appendChild(th);
    th.innerHTML += title;
    var td = document.createElement('td');
    tr.appendChild(td);
    var a = document.createElement('a');
    a.setAttribute('href', "https://" + link);
    a.setAttribute('id', 'link' + i);
    a.className = 'badge badge-primary';
    a.innerHTML += link;
    td.appendChild(a);
    document.getElementById('foo').appendChild(tr);
}


function init() {
    loadJSON(function (response) {
        // Parse JSON string into object
        songBook = JSON.parse(response);

        songBook.songs.forEach(function (song, index) {
            addSong(song.title, song.link, index);
            sbLength = index;
        });
        addSong("Total Songs:", sbLength, sbLength + 1)
    });
}

init();
