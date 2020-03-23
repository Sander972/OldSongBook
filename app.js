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

var theme = "light";
$("#theme").click(function () {
    if (theme == "light") {
        darkTheme();
    } else {
        lightTheme();
    };
});

function darkTheme() {
    $("body").css("background-color", "#212529");
    $("body").css("color", "#f4f4f4");
    document.getElementById("theme").classList.remove('btn-dark'); /*modifica colori del bottone, sono l'opposto del tema*/
    document.getElementById("theme").classList.add('btn-light');
    document.getElementById("nav").classList.remove('navbar-light');
    document.getElementById("nav").classList.add('navbar-dark');
    document.getElementById("table").classList.add('table-dark');
    for (var i = 0; i < sbLength; i++) {
        document.getElementById(`link${i}`).classList.remove('badge-primary');
        document.getElementById(`link${i}`).classList.add('badge-secondary');
    };
    theme = "dark";
};

function lightTheme() {
    $("body").css("background-color", "white");
    $("body").css("color", "#262525");
    document.getElementById("theme").classList.remove('btn-light'); /*modifica colori del bottone, sono l'opposto del tema*/
    document.getElementById("theme").classList.add('btn-dark');
    document.getElementById("nav").classList.remove('navbar-dark');
    document.getElementById("nav").classList.add('navbar-light');
    document.getElementById("table").classList.remove('table-dark');
    for (var i = 0; i < sbLength; i++) {
        document.getElementById(`link${i}`).classList.remove('badge-secondary');
        document.getElementById(`link${i}`).classList.add('badge-primary');
    };
    theme = "light";
};
$(window).scroll(function () {
    if ($(this).scrollTop() >= 50) {
        $('#return-to-top').fadeIn(200);
    } else {
        $('#return-to-top').fadeOut(200);
    };
});
$('#return-to-top').click(function () {
    $('body,html').animate({
        scrollTop: 0
    }, 500);
});