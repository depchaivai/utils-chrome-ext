function onCheckClick() {
    var value = document.querySelector('#test').checked;
    chrome.storage.sync.set({ testStorage: value })
}
var x = "234";
chrome.storage.sync.get(["testStorage"]).then((result) => {
    document.querySelector('#test').checked = result.testStorage
});
document.getElementById("test").addEventListener("change", onCheckClick);
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