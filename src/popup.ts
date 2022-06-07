let changeColor = <HTMLElement>document.getElementById("colorPreview");

console.log(changeColor);

chrome.storage.sync.get("color", ({ color }) => {
    changeColor.style.backgroundColor = color;
});

function setPageBackgroundColor() {
    chrome.storage.sync.get("color", ({ color }) => {
        document.body.style.backgroundColor = color;
    });
}

changeColor.addEventListener("click",async () => {
   let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
   
   chrome.scripting.executeScript({
       target: {tabId: <number>tab.id},
       func: setPageBackgroundColor,
   })
});