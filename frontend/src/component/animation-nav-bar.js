
// When the user scrolls down 80px from the top of the document, resize the navbar's padding and the logo's font size
window.onscroll = function () { scrollFunction() }

function scrollFunction () {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        document.getElementById('navbarComplete').style.padding = '0px 0px'
        document.getElementById('navbarComplete').style.fontSize = '2em'
        document.getElementById('divLogo').style.fontSize = '45px'
        document.getElementById('barreRecherche').style.fontSize = '2rem'
        document.getElementById('btnRecherche').style.fontSize = '2rem'
        document.getElementById('inputGroupSelect04').style.fontSize = '2rem'
        document.getElementById('btnPlaylist').style.fontSize = '2rem'
    } else {
        document.getElementById('navbarComplete').style.padding = '30px 0px'
        document.getElementById('navbarComplete').style.fontSize = '2.5em'
        document.getElementById('divLogo').style.fontSize = '48px'
        document.getElementById('barreRecherche').style.fontSize = '2.5rem'
        document.getElementById('btnRecherche').style.fontSize = '2.5rem'
        document.getElementById('inputGroupSelect04').style.fontSize = '2.5rem'
        document.getElementById('btnPlaylist').style.fontSize = '2.5rem'
    }
}
