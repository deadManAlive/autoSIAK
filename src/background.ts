// service worker

// queries
//  query by class code
let codeQuery = ["ENEE607106", "ENEE605024", "ENEE603012"];
//  query by term
let termQuery = [5];

// init
chrome.runtime.onInstalled.addListener(() => {
    //property set
    chrome.storage.sync.set({
        codeQuery,
        termQuery,
    });
    // url check
    chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
        chrome.action.disable();
        chrome.declarativeContent.onPageChanged.addRules([
            {
                conditions: [
                    new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: { urlContains: "academic.ui.ac.id/main/CoursePlan/" },
                    })
                ],
                actions: [ new chrome.declarativeContent.ShowAction() ]
            }
        ]);
    });
});