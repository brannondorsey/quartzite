//------------------GLOBALS------------------//
var uploadEndpoint =  "http://localhost:8888/quartzite/uploadendpoint.php"; //"http://brannondorsey.com/hidden/quartzite/uploadendpoint.php";
var endpointKey = 54183;


//------------------EVENTS------------------//
chrome.runtime.onMessage.addListener(
function(request, sender, sendResponse) {
var responseObj = new Object();

//if the request to screenshot was sent from the content_script.js...
if(request.screenshotRequest == true){

	//take a screenshot...
	chrome.tabs.captureVisibleTab({ format: "png"}, function(dataUrl){
		
        delete request.screenshotRequest;
        request.img = encodeURIComponent(dataUrl);
        request.key = endpointKey;

		//use AJAX to send the image to the server and a response to the content script
		sendImageToServer(sendResponse, request);

	});
}
return true;
});


//------------------FUNCTIONS------------------//
function sendImageToServer(sendResponse, request){
    //if the string length is greater than 50... send it to the endpoint
    console.log("The title is " + request.title);
    if(request.img.length > 50){
        $.ajax({
            type: "POST",
            url: uploadEndpoint,
            dataType: "html",
            data: request,
            contentType: "application/x-www-form-urlencoded;charset=UTF-8",
            success: function(data){
                sendResponse({result: data});
            },
            error: function(){
                sendResponse({result: "The request failed"});
            }
        });
	}
}
