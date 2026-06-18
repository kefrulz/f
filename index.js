(function () {
  var root = document.documentElement;
  root.classList.add("tv-mode");

  try {
    localStorage.setItem("funbetsRemoteMode", "1");
  } catch (error) {}

  function registerKeys() {
    try {
      if (!window.tizen || !tizen.tvinputdevice) return;
      [
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown",
        "Enter",
        "Return",
        "Exit",
        "ColorF0Red",
        "ColorF3Blue"
      ].forEach(function (key) {
        try {
          tizen.tvinputdevice.registerKey(key);
        } catch (error) {}
      });
    } catch (error) {}
  }

  function focusFirstGame() {
    var card = document.querySelector(".game-card.remote-focus") || document.querySelector(".game-card");
    if (!card) return;
    try {
      card.focus({ preventScroll: true });
    } catch (error) {
      card.focus();
    }
  }

  function boot() {
    registerKeys();
    focusFirstGame();
    setTimeout(focusFirstGame, 300);
    setTimeout(focusFirstGame, 900);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
}());
