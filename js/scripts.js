function saludo(saludo) {
  console.log(saludo);
}

/// Cookies
/*import CookiesEuBanner from "./cookies.js";*/
new CookiesEuBanner(function () {
  // Google analytics
  let a = document.createElement("script");
  let r = document.getElementsByTagName("script")[0];
  a.src = "https://www.googletagmanager.com/gtag/js?id=G-2H8HF1Q1MT";
  r.parentNode.insertBefore(a, r);

  window.dataLayer = window.dataLayer || [];

  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "G-2H8HF1Q1MT");
}, true);

//form Newsletter

document.addEventListener("DOMContentLoaded", () => {
  const forms = document.getElementsByClassName("edfutura-form");
  const success_msg = document.getElementsByClassName("suscription-success");
  const titles = document.getElementsByClassName("title-newsletter-form");

  for (const form of forms) {
    form.onsubmit = async function (e) {
      e.preventDefault();

      try {
        const data = new FormData(form);

        await fetch("https://app.colorsoftalent.com/api/edfutura/subscribe", {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: serForm(data),
        });

        //this make that success message appears and form disapears

        form.style.display = "none";

        for (const title of titles) {
          title.style.display = "none";
        }

        for (const msg of success_msg) {
          msg.style.display = "flex";
        }
      } catch (e) {
        alert("There's been an error, please try again");
      }
    };
  }
});

function serForm(data) {
  const object = {};
  data.forEach((value, key) => {
    // Reflect.has in favor of: object.hasOwnProperty(key)
    if (!Reflect.has(object, key)) {
      object[key] = value;
      return;
    }
    if (!Array.isArray(object[key])) {
      object[key] = [object[key]];
    }
    object[key].push(value);
  });
  return JSON.stringify(object);
}

// Contact form script for API Colors
const contactForm = document.getElementById("contact-form");

if (contactForm != null) {
  contactForm.onsubmit = function (e) {
    e.preventDefault();
    
      const obj = Object.fromEntries(new FormData(contactForm).entries());

      fetch("https://app.colorsoftalent.com/api/landing/submitForm", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });

    document.getElementById("contact-sent").style.display = "block";

    if (document.getElementById("message")) {
      document.getElementById("message").value = "";
    }

    if(document.getElementById("name")){
        document.getElementById("name").value = "";
    }

    if(document.getElementById("email")){
        document.getElementById("email").value = "";
    }

    if (document.getElementById("surname")) {
      document.getElementById("surname").value = "";
    }

    if (document.getElementById("age")) {
      document.getElementById("age").value = "";
    }

    if (document.getElementById("phone")) {
      document.getElementById("phone").value = "";
    }

    if (document.getElementById("message")) {
      document.getElementById("message").value = "";
    }

    return false;
  };
}
