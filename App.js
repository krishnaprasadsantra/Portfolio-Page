function opentab(tabname, el) {

    let tablinks = document.getElementsByClassName("tab-links");
    let tabcontents = document.getElementsByClassName("tab-contents");

    for (let tablink of tablinks) {
        tablink.classList.remove("active-link");
    }

    for (let tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }

    el.classList.add("active-link");  // 
    document.getElementById(tabname).classList.add("active-tab");
}

document.getElementById("seeMoreBtn").addEventListener("click", function () {
    let more = document.getElementById("more-projects");
    more.style.display = "flex";

    setTimeout(() => {
        more.classList.add("show");
    }, 50);

    this.style.display = "none";
});


let menu = document.getElementById("menu");

function openMenu(){
  menu.classList.add("active");
}

function closeMenu(){
  menu.classList.remove("active");
}


const scriptURL = "https://script.google.com/macros/s/AKfycbyf4TOz1aAgerAL1IIYZHQcCXixGvjeoMoi8HkSjO5PswjGrcSEymu9ygmQM2hCD_aoyQ/exec";

const form = document.getElementById("contact-form");
const msg = document.getElementById("response-msg");

// ⏱️ Prevent instant spam
const startTime = Date.now();

form.addEventListener("submit", e => {
  e.preventDefault();

  // ⏱️ Block bots submitting too fast
  if (Date.now() - startTime < 2000) {
    msg.innerHTML = "⚠️ Please wait a moment...";
    msg.style.color = "orange";
    return;
  }

  msg.innerHTML = "Sending...";
  msg.style.color = "black";

  fetch(scriptURL, {
    method: "POST",
    body: new FormData(form)
  })
  .then(res => res.text())
  .then(data => {
    if (data === "Success") {
      msg.innerHTML = "✅ Message sent successfully!";
      msg.style.color = "green";
      form.reset();
    } else {
      msg.innerHTML = "❌ " + data;
      msg.style.color = "red";
    }

    setTimeout(() => msg.innerHTML = "", 3000);
  })
  .catch(err => {
    msg.innerHTML = "❌ Network error!";
    msg.style.color = "red";
  });
});