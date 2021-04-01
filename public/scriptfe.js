const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName ('navbar-links')[0]
const optieLinks = document.getElementsByClassName ('noJsList')[0]
const pijltje = document.getElementsByClassName ('arrowdown')[0]

toggleButton.addEventListener('click', klikken);
window.addEventListener('load', laden);

function klikken(){
    navbarLinks.classList.toggle('active');
    console.log("er is geklikt");
}

function laden(){
    optieLinks.classList.toggle('active');
    pijltje.classList.toggle('active');
    toggleButton.classList.toggle('active');
}