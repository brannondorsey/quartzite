//------------------GLOBALS------------------//
var uploadEndpoint = "http://localhost:8888/quartzite/uploadendpoint.php";
var endpointKey = 54183;


//------------------EVENTS------------------//
chrome.runtime.onMessage.addListener(
function(request, sender, sendResponse) {
var responseObj = new Object();

//if the request to screenshot was sent from the content_script.js...
if(request.screenshotRequest == true){

	//take a screenshot...
	chrome.tabs.captureVisibleTab({ format: "png"}, function(dataUrl){
		responseObj.screenshotRequest = "Screenshot saved";
		responseObj.title = request.title;
		responseObj.domain = request.domain;
		responseObj.url = request.url;

		//use AJAX to send the image to the server and a response to the content script
		sendImageToServer(dataUrl, sendResponse, request);

	});
}
return true;
});


//------------------FUNCTIONS------------------//
function sendImageToServer(encode64String, sendResponse, responseObj){
    //if the string length is greater than 50... send it to the endpoint
    console.log("The title is " + responseObj.title);
    if(encode64String.length > 50){
        $.ajax({
            type: "POST",
            url: uploadEndpoint,
            dataType: "html",
            // jsonp: false,
            data: {
            	key: endpointKey, 
            	img: encodeURIComponent(encode64String), 
            	title: responseObj.title,
            	domain: responseObj.domain,
            	url: responseObj.url,
            	referrer: responseObj.referrer
            },
            contentType: "application/x-www-form-urlencoded;charset=UTF-8",
            success: function(data){
                // console.log("The ajax request succeeded!");
                // console.log("The result is: ");
                //data = data.replace(/^[^(]*\(/, '').replace(/\);?$/, '');
                responseObj.url = "The url is: " + responseObj.url;
                responseObj.result = data;
                sendResponse(responseObj);
                //console.log(data);
                //...
            },
            error: function(){
                console.log("The request failed");
            }
        });
	}
}
