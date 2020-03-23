var songBook;
var sbLength;

function loadJSON(callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'songs.json', true);
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

function sortByProperty(property) {
    return function (a, b) {
        if (a[property] > b[property])
            return 1;
        else if (a[property] < b[property])
            return -1;

        return 0;
    }
}


function init() {
    loadJSON(function (response) {
        // Parse JSON string into object
        songBook = JSON.parse(response);
        var ordinated = songBook.songs.sort(sortByProperty("title"));

        ordinated.forEach(function (song, index) {
            addSong(song.title, song.link, index);
            sbLength = index;
        });
        addSong("Total Songs:", sbLength, sbLength + 1)
    });
}

async function registerSW() {
    if ('serviceWorker' in navigator) {
        try {
            await navigator.serviceWorker.register('./sw.js');
        } catch (e) {
            alert('ServiceWorker registration failed. Sorry about that.');
        }
    } else {
        document.querySelector('.alert').removeAttribute('hidden');
    }
}

window.addEventListener('load', e => {
    init();
    registerSW();
});


