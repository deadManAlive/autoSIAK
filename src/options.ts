let page = <HTMLElement>document.getElementById("buttonDiv");
let selectedClassName = "current";
const presetButtonColors = ["#3aa757", "#e8453c", "#f9bb2d", "#4688f1"];

function handleButtonClick(event: MouseEvent) {
    let current = (<HTMLElement>(<HTMLElement>event.target).parentElement).querySelector(`.${selectedClassName}`);

    if (current && current !== <HTMLElement>event.target) {
        current.classList.remove(selectedClassName);
    }

    let color = (<HTMLElement>event.target).dataset.color;
    (<HTMLElement>event.target).classList.add(selectedClassName);
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
