let count = 0;
let it0 = setInterval(() => {
  chrome.storage.sync.get(["testStorage"]).then((result) => {
    if (result.testStorage) {
      runScript();
    } else {
      clearInterval(it0);
    }
  });
}, 1000);
setTimeout(() => {
  clearInterval(it0);
}, 15000);
function runScript() {
  const shows = document.querySelectorAll(
    'div[data-testid="sr-settings-about"]'
  );
  if (shows && shows.length) {
    shows.forEach((element, index) => {
      if (index < 6) {
        return;
      }
      const btnText = `<button class="local-hide vd-btn vd-btn--do">Hide</button>`;
      element.insertAdjacentHTML("beforebegin", btnText);
    });
    const localHideBtns = document.querySelectorAll(".local-hide");
    if (localHideBtns && localHideBtns.length > 0) {
      clearInterval(it0);
    }
    localHideBtns.forEach((e, i) => {
      const parent = e.closest("div");
      const hide = parent.querySelector(
        'div[data-testid="sr-settings-content"]'
      );
      hide.setAttribute("data-is-hidden", 1);
      hide.style.display = "none";
      e.addEventListener("click", () => {
        let isHide = hide.getAttribute("data-is-hidden");
        if (!isHide) {
          hide.setAttribute("data-is-hidden", 1);
          hide.style.display = "none";
        } else {
          hide.removeAttribute("data-is-hidden");
          hide.style.display = "block";
        }
      });
    });
  }
  count++;
  console.log(`turn-${count}`);
}
