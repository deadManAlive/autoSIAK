//popup + main algorithm(?)

let runButton = <HTMLElement>document.getElementById("runAgent");

//options view
chrome.storage.sync.get(["codeQuery", "termQuery"], ({codeQuery, termQuery}) => {
    let cview = <HTMLElement>document.getElementById("cqueries");
    let tview = <HTMLElement>document.getElementById("tqueries");

    cview.append(codeQuery.join("\n"));
    tview.append(termQuery.join("\n"));
});


function mainproc(codes: string[], terms: number[]) {
    let c = document.getElementsByClassName("box");
    console.log(c);
}

runButton.addEventListener("click", async () =>{
    let [tab] = await chrome.tabs.query({active: true, currentWindow: true});

    chrome.scripting.executeScript({
        target: {tabId: <number>tab.id},
        func: () => {
            chrome.storage.sync.get(["codeQuery", "termQuery"], ({codeQuery, termQuery}) => {
                mainproc(codeQuery, termQuery);
                console.log("queries: code -> ", codeQuery, " term --> ", termQuery);
            });
        }
    });
});