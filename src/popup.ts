//popup + main algorithm(?)

import { autoLogIn } from "./login";
import { autoFill } from "./fill";

let run_button = <HTMLElement>document.getElementById("runbutton");

//options view
chrome.storage.sync.get(["code_query", "term_query"], ({code_query, term_query}) => {
    let code_view = <HTMLElement>document.getElementById("cqueries");
    let term_view = <HTMLElement>document.getElementById("tqueries");

    for (const code of code_query) {
        const code_p = document.createElement("p");
        code_p.innerHTML = code;

        code_view.appendChild(code_p);
    }
    term_view.append(term_query.join(" "));
});

run_button.addEventListener("click", async () =>{
    let [tab] = await chrome.tabs.query({active: true, currentWindow: true});

    console.log("this is login page: ", tab.url?.includes("Authentication"));

    autoLogIn();
    return;

    autoFill(<number>tab.id);
});