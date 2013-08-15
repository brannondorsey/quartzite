//------------------GLOBALS------------------//
var uploadEndpoint = "http://localhost:8888/quartzite/uploadendpoint.php";
var endpointKey = 54183;


//------------------EVENTS------------------//
chrome.runtime.onMessage.addListener(
function(request, sender, sendResponse) {
var responseObj = new Object();

//if the request to screenshot AND the url were sent from the content_script.js...
if(request.screenshotRequest == true &&
	typeof request.url !== 'undefined'){

	//take a screenshot...
	chrome.tabs.captureVisibleTab({ format: "png"}, function(dataUrl){
		responseObj.screenshotRequest = "Screenshot saved";
		responseObj.url = request.url;

		//use AJAX to send the image to the server
		sendImageToServer(dataUrl, sendResponse, responseObj);

		//send a response 
		//sendResponse(responseObj);
	});
}
return true;
});


//------------------FUNCTIONS------------------//
function sendImageToServer(encode64String, sendResponse, responseObj){
    //if the string length is greater than 50... send it to the endpoint
    if(encode64String.length > 50){
        $.ajax({
            type: "POST",
            url: uploadEndpoint,
            dataType: "html",
            // jsonp: false,
            data: {key: endpointKey, img: encodeURIComponent(encode64String), url: responseObj.url},
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
