//------------------GLOBALS------------------//
var endpointKey = 54183;
var rootDirLink = "http://localhost:8888/quartzite";

var timeLogEndpoint = rootDirLink + "/server/src/timelogendpoint.php";
var uploadEnpoint = rootDirLink + "/server/src/uploadendpoint.php";
var blockedUrlsEndpoint = rootDirLink + "/server/src/blockeddomains.php";
var data = {
        key: endpointKey,
        //pass the address for the ajax upload to the background page so that all addresses can be stored above
        uploadEndpointUrl: uploadEnpoint, 
        screenshotRequest: true, 
        title: document.title,
        url: document.URL,
        domain: document.domain,
        referrer: document.referrer
    };
var focused = true;

//------------------DOC READY-------------------//

$("document").ready(function(){

    var domainBlocked = false;
    var blockedUrls = getBlockedUrls();

    //if the blocked urls were loaded correctly...
    if(blockedUrls){

        var blockedUrl;

        //loop through the blocked domains...
        for(var i = 0; i < blockedUrls.length; i++){
            blockedUrl = blockedUrls[i];
            //if this blockedUrls element includes this document's domain...
            if(document.domain.indexOf(blockedUrl) != -1){
                domainBlocked = true;
                break;
            }
        }
    }
    
    //if the domain is not blocked...
    if(!domainBlocked){

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
            //if there was a response from the ajax request and the image was saved successfully or a refresh was detected
            if(typeof response.result !== 'undefined' &&
                response.result.toLowerCase().indexOf("image saved") != -1 ||
                typeof response.result !== 'undefined' &&
                response.result.toLowerCase().indexOf("refresh detected") != -1
                ){
                
                //get the timestamp from the result of uploadendpoint.php
                var startIndex = response.result.indexOf(": ") + 2;
                var imageTimestamp = response.result.substring(startIndex);
                imageTimestamp = imageTimestamp.trim();

                //set the interval to ping the timelogendpoint.php page with
                var interval = 1000;
                setInterval(function(){

                    //if the window is focused...
                    if(focused){

                        //send the ajax request to increment length_visited
                        $.ajax({
                            type: "POST",
                            url: timeLogEndpoint,
                            dataType: "html",
                            data: {
                                key: endpointKey,
                                timestamp: imageTimestamp,
                                interval: interval
                            },
                            contentType: "application/x-www-form-urlencoded;charset=UTF-8",
                            success: function(data){
                                console.log(data);
                            },
                            error: function(){
                                console.log("Request failed");
                            }
                        });
                    }
                }, interval);
            }
        });
    }else{ //the domain was blocked
        console.log("DOMAIN BLOCKED: Image was not saved");
    }
});

//--------------------FUNCTIONS------------------------//

function getPropertyFromMeta(selector){
    var element = $(selector);
    if(element.length > 0){
        return element.attr("content");
    }else return false;
}

//returns an array of blocked urls from blockedurlsendpoint.php
function getBlockedUrls(){
    var returnVal;
    $.ajax({
        type: "POST",
        async: false,
        url: blockedUrlsEndpoint,
        dataType: "json",
        data: {
            key: endpointKey,
        },
        contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        success: function(data){
            //if the result is an array
            if($.isArray(data)){
                returnVal = data;
            }else returnVal = false;
        },
        error: function(){
            console.log("Request failed");
            returnVal = false;
        }
    });
    // while(true){
    //     if(typeof returnVal !== 'undefined') break;
    // }
    return returnVal;
}


//--------------------EVENTS------------------------//
window.onfocus = function() {
    focused = true;
};
window.onblur = function() {
    focused = false;
};