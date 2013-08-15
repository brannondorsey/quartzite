//------------------GLOBALS------------------//


//------------------DOC READY-------------------//

$("document").ready(function(){
    
    chrome.runtime.sendMessage({screenshotRequest: true, url: document.URL}, function(response) {
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
