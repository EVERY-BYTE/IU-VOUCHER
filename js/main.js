// Load content dynamically
document.getElementById("home-content").innerHTML = fetchHtml("home.html");
document.getElementById("profile-content").innerHTML =
  fetchHtml("profile.html");

// Navigation logic
document.getElementById("nav-home").addEventListener("click", function () {
  document.getElementById("home-section").classList.remove("d-none");
  document.getElementById("profile-section").classList.add("d-none");
  setActiveNav(this);
});

document.getElementById("nav-profile").addEventListener("click", function () {
  document.getElementById("profile-section").classList.remove("d-none");
  document.getElementById("home-section").classList.add("d-none");
  setActiveNav(this);
});

function setActiveNav(activeElement) {
  document.querySelectorAll(".bottom-nav .nav-link").forEach((nav) => {
    nav.classList.remove("active");
  });
  activeElement.classList.add("active");
}

function fetchHtml(filePath) {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", filePath, false);
  xhr.send(null);
  return xhr.responseText;
}
