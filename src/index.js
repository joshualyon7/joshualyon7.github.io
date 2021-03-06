function navToExternal(url) {
    window.open(url);
}

function navToInternal(url) {
    window.location = url;
}

// function to get re-usable nav bar and footer bar
const navHtml = `
<div class="header-div">
    <ul class="nav-bar">
        <li class="nav-bar">
            <button class="nav-btn" onclick="navToInternal('index.html')">Home</button>
            <button class="nav-btn" onclick="navToInternal('projects.html')">My Projects</button>
            <button class="nav-btn" onclick="navToInternal('resume.html')">Resume</button>
            <button class="nav-btn" onClick="navToInternal('contact.html')">Contact Me</button>
            <!-- from https://www.w3schools.com/css/css_dropdowns.asp -->
            <!-- animation stuff from https://codinhood.com/micro/10-dropdown-menu-animations-css-transform -->
            <div class="dropdown nav-btn">
                <button class="nav-btn">Class Links</button>
                <div class="drop-content" id="course-drop">
                    <button class="nav-btn drop-btn" onclick="navToExternal('https://mattm401.github.io/')">Course Website</button>
                    <button class="nav-btn drop-btn" onclick="navToExternal('https://aaronliu20.github.io/')">Previous Student</button>
                    <button class="nav-btn drop-btn" onclick="navToExternal('https://psy1alise.github.io/')">Next Student</button>
                </div>
            </div>
        </li>
    </ul>
</div>`

const footerHtml = `
<div class="footer-div">
    <ul class="footer-bar">
        <li class="footer-bar">
            <button class="nav-btn footer-btn" onclick="navToExternal('https://www.linkedin.com/in/joshua-lyon-89273a21b/')"><i class="fab fa-linkedin fa-2x"></i></button>
            <button class="nav-btn footer-btn" onClick="navToExternal('https://github.com/joshualyon7')"><i class="fab fa-github-square fa-2x"></i></button>
            <img src="assets/favicon-32x32.png" class="footer-btn"></img>
            <button class="nav-btn footer-btn" onClick="navToInternal('contact.html')"><i class="fas fa-mail-bulk fa-2x"></i></button>
            <button class="nav-btn footer-btn" onclick="navToExternal('https://www.instagram.com/joshlyon71/?hl=en')"><i class="fab fa-instagram fa-2x"></i></button>
        </li>
    </ul>
</div>`

function loadNav() {
    const navBars = Array.from(document.getElementsByClassName("nav-placeholder"));
    navBars.forEach((div) => {
        div.innerHTML = navHtml;
    });

    const footerBars = Array.from(document.getElementsByClassName("footer-placeholder"));
    footerBars.forEach((div) => {
        div.innerHTML = footerHtml;
    });
}

$(() => {
    loadNav();
    $(".dropdown").hover(() => { // on hover in
        $("#course-drop").show();
    }, () => { // on hover out
        $("#course-drop").hide();
    });

    $(".collapsible").click((e) => {
       $(e.target).next().slideToggle(); 
       $(e.target).text($(e.target).text()[0] === '???' ? `???${$(e.target).text().slice(1)}` : `???${$(e.target).text().slice(1)}`);
       console.log("clicked");
       console.log($(e.target));

    });
    
});
