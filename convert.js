function convert()
{
    var inputText = document.getElementById("input").value;
    var regex = /[0-9]:[0-9]/g;
    var index = 0;
    var result = "";

    //console.log(inputText);
    
    inputText = inputText.replace(/,/g, ",");
    inputText = inputText.replace(/[?]/g, "?");
    inputText = inputText.replace(/:/g, ":");
    inputText = inputText.replace(/!/g, "!");

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
    
    result = ConvertBulletPoints(result);
    result = ConvertNumberedList(result);
    
    //console.log("result: " + result);
    
    document.getElementById("markup").value = result;
}

function getBibleGatewayLink()
{
    var inputText = document.getElementById("input").value;
    result = "<a href=\"https://www.biblegateway.com/quicksearch/?quicksearch=" + inputText + "&qs_version=CUVMPT\">" + inputText + "</a>\r\n";
    result += "[" + inputText + "](https://www.biblegateway.com/quicksearch/?quicksearch=" + inputText + "&qs_version=CUVMPT)";
    document.getElementById("markup").value = result;
}

function ConvertBulletPoints(txt)
{
    var result = "";

    lines = txt.split("\n");
    for (i=0; i<lines.length; i++) {
        index = lines[i].indexOf("+ ");
        result += (index >= 0 ? "<li>" + lines[i].substring(index + 2, lines[i].length) + "</li>" : lines[i]) + "\r\n";
        console.log("result: " + result);
    }

    return result;
}

function ConvertNumberedList(txt)
{
    var result = "";

    do {
        //console.log("txt: " + txt);
        index = txt.search(/[0-9]\. /g);
        if (index >= 0) {
            result += txt.substring(0, index + 1) + "\uff0e";
            //console.log("result: " + result);
            txt = txt.substring(index + 3);
        }
    } while (index >= 0);
    
    result += txt;

    return result;
}
