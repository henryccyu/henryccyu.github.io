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

    while (index >= 0) {
        console.log(inputText);
        index = inputText.search(regex);
        if (index < 0)
            break;
        console.log(index);
        result += inputText.substring(0, index + 1) + ":";
        inputText = inputText.substring(index + 2);
    }
    result += inputText;
    
    console.log(inputText);
    document.getElementById("markup").value = inputText;
}
