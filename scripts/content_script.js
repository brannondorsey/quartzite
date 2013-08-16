//------------------GLOBALS------------------//
var data = {
        screenshotRequest: true, 
        title: document.title,
        url: document.URL,
        domain: document.domain,
        referrer: document.referrer
    };

//------------------DOC READY-------------------//

$("document").ready(function(){

    //add contents of <meta> tags to data obj if tag exist
    if(getPropertyFromMeta("meta[name='keywords']")) data.keywords = getPropertyFromMeta("meta[name='keywords']");
    if(getPropertyFromMeta("meta[name='author']")) data.author = getPropertyFromMeta("meta[name='author']");
    if(getPropertyFromMeta("meta[name='owner']")) data.owner = getPropertyFromMeta("meta[name='owner']");
    if(getPropertyFromMeta("meta[name='description']")) data.description = getPropertyFromMeta("meta[name='description']");
    if(getPropertyFromMeta("meta[name='copywrite']")) data.copywrite = getPropertyFromMeta("meta[name='copywrite']");

    chrome.runtime.sendMessage(data, function(response) {
        for(var parameter in response){
            console.log(response[parameter]);
        }
    });
    // $(window).on('hashchange', function(){
    //     console.log("I changed the hash");
    //     // chrome.runtime.sendMessage({screenshotRequest: true, url: document.URL}, function(response) {
    //     //     for(var parameter in response){
    //     //         console.log(response[parameter]);
    //     //     }
    //     // });
    // });
});

//--------------------FUNCTIONS------------------------//

function getPropertyFromMeta(selector){
    var element = $(selector);
    if(element.length > 0){
        return element.attr("content");
    }else return false;
}