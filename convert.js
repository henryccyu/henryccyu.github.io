function convert()
{
    var inputText = document.getElementById("input").value;
    var regex = /[0-9]：[0-9]/g;
    var index = 0;
    var result = "";

    console.log(inputText);
    
    inputText = inputText.replace(/,/g, "，");
    inputText = inputText.replace(/[?]/g, "？");
    inputText = inputText.replace(/:/g, "：");
    inputText = inputText.replace(/!/g, "！");

    do {
        console.log(inputText);
        index = inputText.search(regex);
        if (index >= 0) {
            console.log(result);
            result += inputText.substring(0, index + 1) + ":";
            console.log(result);
            inputText = inputText.substring(index + 2);
        }
    } while (index >= 0);
    
    result += inputText;
    
    console.log(inputText);
    document.getElementById("markup").value = inputText;
}
