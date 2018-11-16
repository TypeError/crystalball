const screenshots = document.querySelectorAll(".screenshot");

screenshots.forEach(screenshot => {
  screenshot.addEventListener("click", () => {
    if (screenshot.className === "screenshot small") {
      screenshot.className = "screenshot large";
    } else {
      screenshot.className = "screenshot small";
    }
  });
});
