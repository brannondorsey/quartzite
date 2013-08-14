//------------------GLOBALS------------------//

var thingToSay = "Im working on this webpage";
var uploadEndpoint = "http://localhost:8888/quartzite/uploadendpoint.php";
var endpointKey = 54183;

//------------------DOC READY-------------------//

$("document").ready(function(){
    console.log(thingToSay);
    // html2canvas(document.body, options);
    html2canvas([document.body], {
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
                    data: {key: endpointKey, img: encodeURIComponent(encode64String)},
                    contentType: "application/x-www-form-urlencoded;charset=UTF-8",
                    success: function(data){
                        console.log("The ajax request succeeded!");
                        console.log("The result is: ");
                        data = data.replace(/^[^(]*\(/, '').replace(/\);?$/, '');
                        console.log(data);
                        //...
                    },
                    error: function(){
                        console.log("The request failed");
                    }
                });
            }
        } 
      });
});

//--------------------EVENTS------------------------//
