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
    inputText = inputText.replace(/（小錢）/g, "`小錢`");
    inputText = inputText.replace(/禱告：/g, "禱告：\r\n>");
    inputText = inputText.replace(/提醒：/g, "提醒：\r\n>");
    inputText = inputText.replace(/（Zhuolin）/ig, "`Zhuolin`");

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
    
//    result = ConvertBulletPoints(result);
    result = ConvertNumberedList(result);
    
    //console.log("result: " + result);
    
    document.getElementById("markup").value = result;
}

function convertBulletPoints()
{
	var inputText = document.getElementById("input").value;
    var result = "";
    var bullet = "\u2022 ";

    if (inputText.indexOf("+ ") >= 0) {
        bullet = "+ ";
    }

    lines = inputText.split("\n");
    for (i=0; i<lines.length; i++) {
        index = lines[i].indexOf(bullet);
        result += (index >= 0 ? "<li>" + lines[i].substring(index + 2, lines[i].length) + "</li>" : lines[i]);
        if (lines[i].length > 0) result += "\r\n";
//        console.log("result: " + result);
    }

    document.getElementById("markup").value = result;
}

function normalizeLineEnding()
{
	var inputText = document.getElementById("input").value;
    var result = "";

    lines = inputText.split("\n");
    for (i=0; i<lines.length; i++) {
		result += lines[i];
		if (lines[i].length > 0)
			result += "  ";
		result += "\r\n";
    }

    document.getElementById("markup").value = result;
}

function getQianBinSharingTemplate()
{
    result = "---\r\n";
    result += "layout: sharing\r\n";
    result += "date: 2019-\r\n";
    result += "title: \"讀經分享：【】\"\r\n";
    result += "categories: sharing\r\n";
    result += "weekNum: \r\n";
    result += "dayNum: \r\n";
    result += "permalink: /sharing/day-wk-sharing.html\r\n";
    result += "---\r\n";
    
    document.getElementById("markup").value = result;
}

function getZhuolinSharingTemplate()
{
    result = "---\r\n";
    result += "layout: sharing\r\n";
    result += "date: 2019-\r\n";
    result += "title: \"每日靈修：\"\r\n";
    result += "categories: sharing Zhuolin\r\n";
    result += "weekNum: \r\n";
    result += "dayNum: \r\n";
    result += "permalink: /sharing/zhuolin/day-wk-sharing.html\r\n";
    result += "author: Zhuolin\r\n";
    result += "---\r\n";
    
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
    var bullet = "\u2022 ";

    if (txt.indexOf("+ ") >= 0) {
        bullet = "+ ";
    }

    lines = txt.split("\n");
    for (i=0; i<lines.length; i++) {
        index = lines[i].indexOf(bullet);
        result += (index >= 0 ? "<li>" + lines[i].substring(index + 2, lines[i].length) + "</li>" : lines[i]);
        if (!document.getElementById("removeEmptyLines").checked || lines[i].length > 0) result += "\r\n";
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
