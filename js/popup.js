// function getAllStorageSyncData(top_key) {
//     return new Promise((resolve, reject) => {
//         chrome.storage.local.get(top_key, (items) => {
//             if (chrome.runtime.lastError) {
//                 return reject(chrome.runtime.lastError);
//             }
//             resolve(items);
//         });
//     });
// }

const sendMessage = async (data) => {
    let tab = await chrome.tabs.query({ currentWindow: true, active: true });
    await chrome.tabs.sendMessage(
        tab[0].id,
        data,
        (response) => {
            console.log(response);
        }
    );
  };
const popup = document.querySelector('#actionExPop');
exList.forEach(element => {
    let val = window.localStorage.getItem(element.name)
    if (val) {
        val = JSON.parse(val.toLowerCase());
    } else {
        val = false;
    }
    let newSwitchText = `<div><label class="switch">
        <input data-name = "${element.name}" class="turnOn" type="checkbox" ${val ? ' checked' : ''}>
        <span class="slider round"></span>
      </label><span>${element.title}</span></div>`;
    popup.insertAdjacentHTML('beforeend',newSwitchText);
});
const turnOns = document.querySelectorAll('.turnOn');
if (turnOns) {
    turnOns.forEach(e => {
        e.addEventListener('change', async (event)=>{
            let val = event.target.checked;
            let name = e.getAttribute('data-name');
            if (name) {
                window.localStorage.setItem(name, val);
                await sendMessage({[name]: val});
            }
        })
    })
}
chrome.storage.sync.get(["tempUrl"]).then((result) => {
    let arr = result.tempUrl;
    if (!Array.isArray(arr)) {
        arr = [];
    }
    console.log(arr);
    if (arr.length > 0) {
        const hrefDiv = document.querySelector('#updateProuctHistories');
        arr.forEach(e=>{
            let newLi = `<p><a class="redirect" href="${e}">${e}</a></p>`;
            hrefDiv.insertAdjacentHTML('beforeend',newLi);
        })
    } 
    const redirectUrl = document.querySelectorAll('a.redirect');
    redirectUrl.forEach(r=>{
        r.addEventListener('click',(e)=>{
            chrome.tabs.update({url:e.target.href});
        });
    })
});
