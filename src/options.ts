// options page

const submit_creds = <HTMLElement>document.getElementById("credsubmit");

submit_creds.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({active: true, currentWindow: true});

    let uname = (<HTMLInputElement>document.querySelector("input#username")).value;
    let pswrd = (<HTMLInputElement>document.querySelector("input#password")).value;

    console.log(uname, pswrd);

    chrome.storage.sync.set({
        username: uname,
        password: pswrd,
    });

    chrome.storage.sync.get(["username", "password"], ({username, password}) => {
        console.log("Logging ", username, " by identifier ", password);
    });
})