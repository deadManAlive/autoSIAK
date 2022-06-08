//popup + main algorithm(?)

let run_button = <HTMLElement>document.getElementById("runbutton");

//options view
chrome.storage.sync.get(["code_query", "term_query"], ({code_query, term_query}) => {
    let code_view = <HTMLElement>document.getElementById("cqueries");
    let term_view = <HTMLElement>document.getElementById("tqueries");

    code_view.append(code_query.join("\n"));
    term_view.append(term_query.join("\n"));
});

function classCodeSelectTest(class_name: string, code_list: string[]): boolean {
    let not_res = true;
    code_list.forEach((current_value, current_index, obj_list) => {
        let res = class_name.includes(current_value);
        if (res) {
            not_res &&= !res;
        }
    });
    return !not_res;
}

function mainproc(codes: string[], terms: number[]) {
    let [internal_class, external_class] = document.getElementsByClassName("box");
    console.log("intenal classes: ", internal_class, "external classes: ",  external_class);

    let iclass_list = internal_class.querySelectorAll('[id ^= "r"]');
    console.log("internal class rows: ", iclass_list);

    console.log("classes list:");
    //code check
    iclass_list.forEach((current_value, current_index, obj_list) => {
        let class_selector = <HTMLInputElement>current_value.querySelector("td.ce")?.querySelector("input[type=radio");
        let class_name = class_selector?.getAttribute("name");
        let selected = classCodeSelectTest(<string>class_name, codes);
        console.log("obj #%d: %s | selected: %s", current_index, class_name, selected?"true":"false");

        if(selected){
            class_selector.checked = true;
            current_value.setAttribute("class", "alt sel"); //just for styling, necessary?
        }
    });

    //submission
    let submit_button = <HTMLInputElement>document.querySelector("input[type=submit]");
    submit_button.click();
}

run_button.addEventListener("click", async () =>{
    let [tab] = await chrome.tabs.query({active: true, currentWindow: true});

    chrome.scripting.executeScript({
        target: {tabId: <number>tab.id},
        func: () => {
            chrome.storage.sync.get(["code_query", "term_query"], ({code_query, term_query}) => {
                console.log("queries: code -> ", code_query, " term --> ", term_query);
                mainproc(code_query, term_query);
            });
        }
    });
});