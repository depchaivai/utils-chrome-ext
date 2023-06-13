let count = 0;
let it0 = setInterval(() => {
    const shows = document.querySelectorAll('div[data-testid="sr-settings-about"]');
    if (shows && shows.length) {
        shows.forEach((element,index) => {
            if (index < 6) {
                return;
            }
            const btnText = `<button class="local-hide vd-btn vd-btn--do">Hide</button>`;
            element.insertAdjacentHTML('beforebegin',btnText);
        });
        const localHideBtns = document.querySelectorAll('.local-hide');
        if (localHideBtns && localHideBtns.length > 0) {
            clearInterval(it0);
        }
        localHideBtns.forEach((e,i)=>{
            const parent = e.closest('div');
            const hide = parent.querySelector('div[data-testid="sr-settings-content"]');
            hide.setAttribute('data-is-hidden',1);
            hide.style.display = 'none';
            e.innerHTML = 'Show';
            e.addEventListener('click', () => {
                let isHide = hide.getAttribute('data-is-hidden');
                if (!isHide) {
                    hide.setAttribute('data-is-hidden',1);
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
    console.log(`turn-${count}`);
}, 1000);
setTimeout(() => {
    clearInterval(it0);
}, 15000);