// service worker

import "dotenv/config";

// queries
//  query by class code
let code_query = ["ENEE607106", "ENEE605024", "ENEE603012", "ENEE605031"];
//  query by term
let term_query = [5];

//debug
const uname = process.env.SIAK_USERNAME;
const pswrd = process.env.SIAK_PASSWORD;

// init
chrome.runtime.onInstalled.addListener(() => {
    //property set
    chrome.storage.sync.set({
        code_query: code_query,
        term_query: term_query,
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