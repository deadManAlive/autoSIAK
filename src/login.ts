//login page automation

chrome.storage.sync.get(["username", "password"], async ({uname, pswrd}) => {
    let [tab] =  await chrome.tabs.query({
        active: true,
        currentWindow: true,
    });

    chrome.scripting.executeScript({
        target: {tabId: <number>tab.id},
        func: () => {
            let [form] = document.querySelectorAll("form");
            console.log(form);
        }
    })
});
