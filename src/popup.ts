//popup + main algorithm(?)

let runButton = <HTMLElement>document.getElementById("runAgent");

runButton.addEventListener("click", async () =>{
    let [tab] = await chrome.tabs.query({active: true, currentWindow: true});

    chrome.scripting.executeScript({
        target: {tabId: <number>tab.id},
        func: () => {
            chrome.storage.sync.get(["codeQuery", "termQuery"], ({codeQuery, termQuery}) => {
                console.log("queries: code -> ", codeQuery, " term --> ", termQuery);
            });
        }
    });
});