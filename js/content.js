let enableVendHide = window.localStorage.getItem('hideApp');
console.log(enableVendHide);
if (enableVendHide) {
    enableVendHide = JSON.parse(enableVendHide.toLowerCase());
} else {
    enableVendHide = false;
    window.localStorage.setItem('hideApp',false);
}
if (enableVendHide) {
    let count = 0;
    let it0 = setInterval(() => {
        const shows = document.querySelectorAll('div[data-testid="sr-settings-about"]');
        if (shows && shows.length) {
            shows.forEach((element, index) => {
                if (index < 6) {
                    return;
                }
                const btnText = `<button class="local-hide vd-btn vd-btn--do">Hide</button>`;
                element.insertAdjacentHTML('beforebegin', btnText);
            });
            const localHideBtns = document.querySelectorAll('.local-hide');
            if (localHideBtns && localHideBtns.length > 0) {
                clearInterval(it0);
            }
            localHideBtns.forEach((e, i) => {
                const parent = e.closest('div');
                const hide = parent.querySelector('div[data-testid="sr-settings-content"]');
                hide.setAttribute('data-is-hidden', 1);
                hide.style.display = 'none';
                e.innerHTML = 'Show';
                e.addEventListener('click', () => {
                    let isHide = hide.getAttribute('data-is-hidden');
                    if (!isHide) {
                        hide.setAttribute('data-is-hidden', 1);
                        hide.style.display = 'none';
                        e.innerHTML = 'Show';
                    } else {
                        hide.removeAttribute('data-is-hidden');
                        hide.style.display = 'block';
                        e.innerHTML = 'Hide';
                    }
                })
            })
        }
        count++;
        console.log(`vend-hide-turn-${count}`);
    }, 1000);
    setTimeout(() => {
        clearInterval(it0);
    }, 15000);
}
(async () => {
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        console.log(request);
        if (request.hideApp) {
            window.localStorage.setItem('hideApp', 'true');
        }
        if (!request.hideApp) {
            window.localStorage.setItem('hideApp', 'false');
        }
        sendResponse({ status: true });
    });
})();
