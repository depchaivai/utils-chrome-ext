let count = 0;
let currentPage = document.location.href;
var checkBoxArray = ["vend", "unlockShopify", "vendAge"];
let it0 = setInterval(() => {
    checkBoxArray.forEach(id => {
        chrome.storage.sync.get([id]).then((result) => {
            if (result[id]) {
                switch (id) {
                    case "vend":
                        runScript();
                        break;
                    case "unlockShopify":
                        unlockShopify();
                        break;
                    default:
                        break;
                }
            } else {
                clearInterval(it0);
            }
        });
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

function unlockShopify() {
    let pageUrl = "shopify"
    if (currentPage.search(pageUrl) != -1) {
        let rms = document.querySelectorAll('iframe');
        rms.forEach(e => {
            e.style.position = "initial"
        });
    }
}