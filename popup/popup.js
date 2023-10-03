var checkBoxArray = ["vend", "unlockShopify", "vendAge"];
function onCheckClick(paramId) {
    var value = document.querySelector("#" + paramId).checked;
    var data = {}
    data[paramId] = value
    chrome.storage.sync.set(data)
}

checkBoxArray.forEach(pramId => {
    document.getElementById(pramId).addEventListener("change", () => { onCheckClick(pramId) });
    chrome.storage.sync.get([pramId]).then((result) => {
        document.querySelector("#" + pramId).checked = result[pramId]
    });
});


document.getElementById("generate-vend-age").addEventListener("click", function () {
    const onlyInputs = document.querySelectorAll('#form-vend-age input');
    data = [];
    var missingData = 1;
    onlyInputs.forEach(input => {
        data.push(input.value);
        if (input.value == '') {
            missingData = 0;
        }
    });

    [expired, lastName, firstName, birthday, dlNumber] = data;
    let dlBarcode = '636015080001DL00310300DLDCACDDAFDDB10102016DCBNONEDCDNONEDBA' + expired +
        'DCS' + lastName + 'DDENDAC' + firstName +
        'DDFNDADJASEDDGNDBD03162017DBB' + birthday +
        'DBC1DAYBRODAZBRODAU070 INDAW160DCLWDDJ03212018DDK1DAG17501 REGATTA VIEW DRDAIJONESTOWNDAJTXDAK786454636  DCK' + dlNumber +
        '  20170317DAQ' + dlNumber;
    if (missingData) {
        alert(dlBarcode);
    }
});

document.getElementById('vendAge').addEventListener("change", () => {
    let form = document.getElementById('div-vend-age');
    let displayCurrent = form.style.display;
    if (displayCurrent == 'none') {
        form.style.display = 'block';
    } else {
        form.style.display = 'none';
    }
});