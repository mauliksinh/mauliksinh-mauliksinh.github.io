(function () {
  "use strict";

  var root = document.documentElement;

  // ----- Theme: follows the OS until the visitor picks one -----
  function storedTheme() {
    try { return localStorage.getItem("theme"); } catch (e) { return null; }
  }
  function storeTheme(value) {
    try { localStorage.setItem("theme", value); } catch (e) { /* private mode: ignore */ }
  }
  function currentTheme() {
    var set = root.getAttribute("data-theme");
    if (set) return set;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  var saved = storedTheme();
  if (saved === "light" || saved === "dark") root.setAttribute("data-theme", saved);

  var toggle = document.querySelector("[data-theme-toggle]");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      storeTheme(next);
    });
  }

  // ----- Header border once the page scrolls -----
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () { header.classList.toggle("scrolled", window.scrollY > 8); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // ----- Email: never written into the HTML, assembled only in the browser -----
  // Stored reversed so simple scrapers reading the page source find nothing usable.
  var parts = ["moc.liamg", "kil321uam"];
  function address() {
    return parts[1].split("").reverse().join("") + "@" + parts[0].split("").reverse().join("");
  }

  document.querySelectorAll("[data-email-reveal]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var a = document.createElement("a");
      a.href = "mailto:" + address();
      a.className = btn.className;
      a.textContent = address();
      btn.replaceWith(a);
      a.focus();
    });
  });

  document.querySelectorAll("[data-email-text]").forEach(function (el) {
    var a = document.createElement("a");
    a.href = "mailto:" + address();
    a.textContent = address();
    el.replaceWith(a);
  });

  // ----- Year in footer -----
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
