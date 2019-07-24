function convert()
{
    var inputText = document.getElementById("input").value;
    var regex = /[0-9]：[0-9]/g;
    var index = 0;
    var result = "";

    //console.log(inputText);
    
    inputText = inputText.replace(/,/g, "，");
    inputText = inputText.replace(/[?]/g, "？");
    inputText = inputText.replace(/:/g, "：");
    inputText = inputText.replace(/;/g, "；");
    inputText = inputText.replace(/!/g, "！");

    do {
        //console.log("inputText: " + inputText);
        index = inputText.search(regex);
        if (index >= 0) {
            result += inputText.substring(0, index + 1) + ":";
            //console.log("result: " + result);
            inputText = inputText.substring(index + 2);
        }
    } while (index >= 0);
    
    result += inputText;
    
    //console.log("result: " + result);
    
    document.getElementById("markup").value = result;
}
