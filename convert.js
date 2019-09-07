function convert()
{
    var result = normalize(document.getElementById("input").value);
       
    document.getElementById("markup").value = result;
}

function normalize(inputText)
{
    var result = useChinesePunctuation(inputText);
    result = result.replace(/（小錢）/g, "\n`小錢`");
    result = result.replace(/禱告：/g, "禱告：\n>");
    result = result.replace(/提醒：/g, "提醒：\n>");
    result = result.replace(/（Zhuolin）/ig, "`Zhuolin`");

    result = appendEndingSpaces(result);
    result = useRomanCommaForVerses(result);
    result = ConvertNumberedList(result);

    return result;
}

function useChinesePunctuation(inputText)
{
    var result = inputText.replace(/,/g, "，");
    return result.replace(/[?]/g, "？")
				 .replace(/:/g, "：")
				 .replace(/;/g, "；")
				 .replace(/!/g, "！");
}

function stitchParagraph()
{
    var result = document.getElementById("input").value;
    result = result.replace(/[\r\n]/g, "");
    result = useChinesePunctuation(result);
    result = useRomanCommaForVerses(result);
    result = ConvertNumberedList(result);
    document.getElementById("markup").value = result;
}

function appendEndingSpaces(txt)
{
    var result = "";
	
    lines = txt.split("\n");
    for (i=0; i<lines.length; i++) {
        result += lines[i];
    	if (lines[i].length > 0)
            result += "  ";
        result += "\r\n";
    }
	
    return result;
}

function useRomanCommaForVerses(txt)
{
    var regex = /[0-9]：[0-9]/g;
    var result = "";

    do {
        //console.log("txt: " + inputText);
        index = txt.search(regex);
        if (index >= 0) {
            result += txt.substring(0, index + 1) + ":";
            //console.log("result: " + result);
            txt = txt.substring(index + 2);
        }
    } while (index >= 0);
	
    return result + txt;
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
    var inputText = document.getElementById("input").value;
    var firstLine = inputText.split("\n")[0];
    var dateText = firstLine.split(' ')[0];
    var dt = new Date(dateText);
    var dayOfWeek = dt.getDay();
    var day = (dt.getDate() < 10 ? "0" : "") + dt.getDate();
    var monthNum = dt.getMonth() + 1;
    var month = (monthNum < 10 ? "0" : "") + monthNum;
    var title = firstLine.split(' ')[-1];
    var result = "---\r\n";
    result += "layout: sharing\r\n";
    result += "date: 2019-" + month + "-" + day + "\r\n";
    result += "title: \"讀經分享：【" + title + "】\"\r\n";
    result += "categories: sharing\r\n";
    result += "weekNum: \r\n";
    result += "dayNum: " + dayOfWeek + "\r\n";
    result += "permalink: /sharing/day" + dayOfWeek + "-wk-sharing.html\r\n";
    result += "---\r\n";

    result += normalize(inputText);

    document.getElementById("markup").value = result;
}

function getZhuolinSharingTemplate()
{
    var inputText = document.getElementById("input").value;
    var firstLine = inputText.split("\n")[0];
    var dateText = firstLine.split(' ')[0];
    var dt = new Date(dateText);
    var dayOfWeek = dt.getDay();
    var day = (dt.getDate() < 10 ? "0" : "") + dt.getDate();
    var monthNum = dt.getMonth() + 1;
    var month = (monthNum < 10 ? "0" : "") + monthNum;
    var title = firstLine.substr(dateText.length + 1);
    var result = "---\r\n";
    result += "layout: sharing\r\n";
    result += "date: 2019-" + month + "-" + day + "\r\n";
    result += "title: \"每日靈修：" + title + "\"\r\n";
    result += "categories: sharing Zhuolin\r\n";
    result += "weekNum: \r\n";
    result += "dayNum: " + dayOfWeek + "\r\n";
    result += "permalink: /sharing/zhuolin/day" + dayOfWeek + "-wk-sharing.html\r\n";
    result += "author: Zhuolin\r\n";
    result += "---\r\n";
    
    result += normalize(inputText);
	
    document.getElementById("markup").value = result;
}

function getBiblePlanDailySummary()
{
    var inputText = document.getElementById("input").value;
    var result = "";

    lines = inputText.split("\n");
    for (i=0; i<lines.length; i++) {
	elem = lines[i].split(" ");
	result += " <details>\r\n";
	result += "  <summary>" 
		+ elem[0] 
		+ ". <a href=\"https://www.biblegateway.com/quicksearch/?quicksearch="
		+ elem[1]
		+ "&qs_version=CUVMPT\">"
		+ elem[1]
		+ "</a> - <a href=\"https://bibleplan.github.io/daily/"
		+ elem[2]
		+ "-daily.html\">"
		+ elem[3]
		+ "</a></summary>\r\n";
		result += "  <ul>\r\n";
		result += "  </ul>\r\n";
		result += " </details>\r\n";
	}

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
