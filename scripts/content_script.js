//------------------GLOBALS------------------//

var uploadEndpoint = "http://localhost:8888/quartzite/uploadendpoint.php";
var endpointKey = 54183;

//------------------DOC READY-------------------//

$("document").ready(function(){
    //chrome.tabs.captureVisibleTab({ format: "png"}, function(data){
        console.log(data);
    });
    html2canvas([document.body], {
      //allowTaint: true,
      onrendered: function(canvas) {
            console.log("The screenshot was rendered");
            var encode64String = canvas.toDataURL();
            //if the string length is greater than 50... send it to the endpoint
            if(encode64String.length > 50){
                $.ajax({
                    type: "POST",
                    url: uploadEndpoint,
                    dataType: "html",
                    // jsonp: false,
                    data: {key: endpointKey, img: encodeURIComponent(encode64String), width: window.outerWidth, height: window.outerHeight},
                    contentType: "application/x-www-form-urlencoded;charset=UTF-8",
                    success: function(data){
                        console.log("The ajax request succeeded!");
                        console.log("The result is: ");
                        //data = data.replace(/^[^(]*\(/, '').replace(/\);?$/, '');

                        console.log(data);
                        //...
                    },
                    error: function(){
                        console.log("The request failed");
                    }
                });
            }
        },
        //allowTaint: true 
      });
});

//--------------------EVENTS------------------------//
