let page = <HTMLElement>document.getElementById("buttonDiv");
let selectedClassName = "current";
const presetButtonColors = ["#3aa757", "#e8453c", "#f9bb2d", "#4688f1"];

function handleButtonClick(event: MouseEvent) {
    let current = ((event.target as HTMLElement).parentElement as HTMLElement).querySelector(`.${selectedClassName}`);

    if (current && current !== (event.target as HTMLElement)) {
        current.classList.remove(selectedClassName);
    }

    let color = (event.target as HTMLElement).dataset.color;
    (event.target as HTMLElement).classList.add(selectedClassName);
    chrome.storage.sync.set({ color });
}

function constructOptions(buttonColors: string[]) {
    chrome.storage.sync.get("color", (data: DOMStringMap) => {
        let currentColor = data.color;

        for(let buttonColor of buttonColors) {
            let button = document.createElement("button");
            button.dataset.color = buttonColor;
            button.style.backgroundColor = buttonColor;

            if (buttonColor === currentColor) {
                button.classList.add(selectedClassName);
            }

            button.addEventListener("click", handleButtonClick);
            page.append(button);
        }
    })
}

constructOptions(presetButtonColors);
