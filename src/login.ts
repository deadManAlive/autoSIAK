// login page automation

export async function autoLogIn() {
    let [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
    })

    chrome.scripting.executeScript({
        target: {tabId: <number>tab.id},
        func: () => {
            let [unamef, pwdf, submitb] = document.querySelectorAll("input");

            chrome.storage.sync.get(["username", "password"], ({username, password}) => {
                unamef.value = username;
                pwdf.value = password;
                // submitb.click();
            });
        }
    });
}