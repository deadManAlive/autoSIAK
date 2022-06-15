// filling automation

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

    let iclass_list = internal_class.querySelectorAll('[id ^= "r"]');

    //code check
    iclass_list.forEach((current_value, current_index, obj_list) => {
        let class_selector = <HTMLInputElement>current_value.querySelector("td.ce")?.querySelector("input[type=radio");
        let class_name = class_selector?.getAttribute("name");
        let selected = classCodeSelectTest(<string>class_name, codes);

        if(selected){
            class_selector.checked = true;
            current_value.setAttribute("class", "alt sel"); //just for styling, necessary?
        }
    });

    //submission
    let submit_button = <HTMLInputElement>document.querySelector("input[type=submit]");
    submit_button.click();
}

export function autoFill(tabid: number) {
    chrome.scripting.executeScript({
        target: {tabId: tabid},
        func: () => {
            chrome.storage.sync.get(["code_query", "term_query"], ({code_query, term_query}) => {
                console.log("queries: code -> ", code_query, " term --> ", term_query);
                mainproc(code_query, term_query);
            });
        }
    });
}