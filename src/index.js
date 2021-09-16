function navToUrl(url) {
    window.location = url;
}

// function to get re-usable nav bar
const navHtml = `<div class="header-footer">
<ul class="nav-bar">
    <li class="nav-bar">
        <button class="nav-btn" onclick="navToUrl(\'index.html\')">Home</button>
        <button class="nav-btn" onclick="navToUrl(\'aboutMe.html')">About Me</button>
        <button class="nav-btn" onclick="navToUrl('https://github.com/joshualyon7')">My Github</button>
        <button class="nav-btn" onclick="navToUrl('https://github.com/joshualyon7/joshualyon7.github.io')">Website Source</button>
        <button class="nav-btn" onclick="navToUrl('https://aaronliu20.github.io/')">Previous Student</button>
        <button class="nav-btn" onclick="navToUrl('https://psy1alise.github.io/')">Next Student</button>
        <button class="nav-btn" onclick="navToUrl('contact.html')">Contact me!</button>
    </li>
</ul>
</div>`

function loadNav() {
    const navBars = Array.from(document.getElementsByClassName("nav-placeholder"));
    navBars.forEach((div) => {
        div.innerHTML = navHtml;
    });
}
loadNav();