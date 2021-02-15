const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName ('navbar-links')[0]

toggleButton.addEventListener('click', klikken)

function klikken(){
    navbarLinks.classList.toggle('active')
}