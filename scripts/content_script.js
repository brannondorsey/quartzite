//------------------GLOBALS------------------//


//------------------DOC READY-------------------//

$("document").ready(function(){
    
    chrome.runtime.sendMessage({screenshotRequest: true, url: document.URL}, function(response) {
        for(var parameter in response){
            console.log(response[parameter]);
        }
    });
});

//--------------------EVENTS------------------------//
