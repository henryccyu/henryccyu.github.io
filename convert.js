function convert()
{
    var result = normalize(document.getElementById("input").value);
       
    document.getElementById("markup").value = result;
}

function getPrayersForCovid19()
{
	var inputText = document.getElementById("input").value
	var lines = inputText.split('\n');
	var header = "---\r\n"
			+ "title: \"疫情中的禱告: " + lines[2] + "\"\r\n"
			+ "permalink: /sharing/covid19/zhuolin/wk-day-prayer.html\r\n"
			+ "auther: Zhuolin\r\n"
			+ "---\r\n";
    var result = normalize(inputText.replace(lines[1], "\n**" + lines[1] + "**")
									.replace(lines[2], "**" + lines[2] + "**"))
							.replace(/經文：/, "\r\n經文：")
							.replace("感謝贊美(Praise)", "**感謝贊美 (Praise)**  \r\n>")
							.replace("優先事項(Priority)", "**優先事項 (Priority)**  \r\n>")
							.replace("供應幫助(Provision)", "**供應幫助 (Provision)**  \r\n>")
							.replace("憐憫饒恕(Pardon)", "**憐憫饒恕 (Pardon)**  \r\n>")
							.replace("保抱守護(Protection)", "**保抱守護 (Protection)**  \r\n>")
							.replace("供應(Provision)", "**供應幫助 (Provision)**  \r\n>")
							.replace("饒恕(Pardon)", "**憐憫饒恕 (Pardon)**  \r\n>")
							.replace("保護(Protection)", "**保抱守護 (Protection)**  \r\n>")
							.replace(/•/g, ">\r\n>")
							.replace(/^ +>/gm, ">")
							.replace(/^ +/gm, "　")
							.replace(/^Zhuolin/gm, "`2020- Zhuolin`")
							.replace("疫情中的禱告 第", "## 疫情中的禱告\r\n第");
    document.getElementById("markup").value = header + result;
}

function for2020()
{
    var inputText = document.getElementById("input").value;
    var result = inputText.replace("layout: daily2", "layout: daily2020")
							.replace("layout: daily", "layout: daily2020")
							.replace("permalink: /daily/wk", "permalink: /daily/2020/wk")
							.replace("title", "cycle: 2020\ntitle")
							.replace("BibleLinks.html", "BibleLinks2020.html")
							.replace(/周/g, "週")
							.replace(/\*\*/g, "")
							.replace("問題：", "{%- include BibleLinks2020.html -%}\r\n\r\n### 問題：")
							.replace("默想：神的故事", "### 默想：神的故事")
							.replace("默想：我的故事", "### 默想：我的故事")
							.replace("禱告：", "### 禱告：")
							.replace("筆記與回應：", "### 筆記與生活回應：");
    document.getElementById("markup").value = result;
}

function trimNumbers()
{
    var inputText = document.getElementById("input").value;
    var result = inputText.replace(/[0-9]/g, "").replace(/ /g, "");
    document.getElementById("markup").value = result;
}

function getEccVideoLink()
{
    var inputText = document.getElementById("input").value;
    document.getElementById("markup").value = "https://www.youtube.com/embed/" + inputText + "?autoplay=1";
}

function getBsfVersesInChinese()
{
    var inputText = document.getElementById("input").value;
    var result = "";
	result = inputText.replace(/Genesis/g, "創世記")
						.replace(/Galatians/g, "加拉太書")
						.replace(/Luke/g, "路加福音")
					  	.replace(/Acts/g, "使徒行傳")
					  	.replace(/Colossians/g, "歌羅西書")
					  	.replace(/Philemon/g, "腓利門書")
					  	.replace(/1 Timothy/g, "提摩太前書")
					  	.replace(/2 Timothy/g, "提摩太後書")
					  	.replace(/Philippians/g, "腓立比書")
					  	.replace(/1 John/g, "約翰一書")
					  	.replace(/2 John/g, "約翰二書")
					  	.replace(/3 John/g, "約翰三書")
					  	.replace(/John/g, "約翰福音")
					  	.replace(/Matthew/g, "馬太福音")
					  	.replace(/Ephesians/g, "以弗所書")
					  	.replace(/Romans/g, "羅馬書")
					  	.replace(/Revelation/g, "啟示錄")

    document.getElementById("markup").value = result;
}

function normalize(inputText)
{
    var result = useChinesePunctuation(inputText).replace(/周/g, "週");

    result = useRomanCommaForVerses(result);
    result = ConvertNumberedList(result);
    if (!document.getElementById("keepSpace").checked)
		result = result.replace(/ /g, "").replace(/　/g, "");
    result = appendEndingSpaces(result);

    return result;
}

function useChinesePunctuation(inputText)
{
	if (document.getElementById("english").checked)
		return inputText;
	
    var result = inputText.replace(/,/g, "，");
    return result.replace(/[?]/g, "？")
                .replace(/:/g, "：")
                .replace(/;/g, "；")
                .replace(/!/g, "！")
                .replace(/（/g, "(")
                .replace(/）/g, ")");
}

function stitchParagraph()
{
    var inputText = document.getElementById("input").value;
    var result = "";
    var stitch = true;
    lines = inputText.split("\n");
    for (i = 0; i < lines.length; i++) 
    {
    	if (lines[i].trim().length == 0) {
            stitch = false;
            result += "\r\n";
        } else {
            result += lines[i].trim() + (document.getElementById("english").checked ? " " : "");
        }

	    if (!stitch) {
            result += "\r\n";
            stitch = true;
	    }
    }

//    result = result.replace(/[\r\n]/g, "");
    result = useChinesePunctuation(result);
    result = useRomanCommaForVerses(result);
    result = ConvertNumberedList(result);
	
	// remove "-"
	if (document.getElementById("english").checked)
		result = result.replace(/- /g, "");
	
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
    var bullet = "+";

    lines = inputText.split("\n");
    for (i=0; i<lines.length; i++) {
        if (lines[i].length > 0) {
            index = lines[i].indexOf(bullet);
            line = index >= 0 ? lines[i].substring(index + 1, lines[i].length).trim() : lines[i];
            result += "    <li>" + line.replace(/[ `]/g, "") + "</li>";
            if (lines[i].length > 0) result += "\r\n";
        }
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
	if (inputText.length == 0) {
		document.getElementById("markup").value = "---"
					+ "\r\n"
					+ "layout: sharing"
					+ "\r\n"
					+ "date: "
					+ "\r\n"
					+ "title: \"讀經分享：(視頻)\""
					+ "\r\n"
					+ "categories: sharing"
					+ "\r\n"
					+ "weekNum: "
					+ "\r\n"
					+ "dayNum: "
					+ "\r\n"
					+ "permalink: /sharing/2020/wk-day-sharing.html"
					+ "\r\n"
					+ "cycle: 2020"
					+ "\r\n"
					+ "---"
					+ "\r\n"
					+ "\r\n"
					+ "\r\n"
					+ "[YouTube視頻]()\r\n"
					+ "\r\n"
					+ "\r\n"
					+ "`小錢`";
		return;
	}

    var firstLine = inputText.split("\n")[0];
    var monthNum = firstLine.split("月")[0];
    var month = (monthNum < 10 ? "0" : "") + monthNum;
    var dayNum = firstLine.split("月")[1].split("日")[0];
    var day = (dayNum < 10 ? "0" : "") + dayNum;
    var dt = new Date("2020/" + monthNum + "/" + dayNum);
    var dayOfWeek = dt.getDay();
    var lines = inputText.split("\n");
    var title;
    var result = "---\r\n";
	for (var i = 0; i < lines.length; i++) {
        if (lines[i].trim().length == 2) {
            title = lines[i].trim();
            break;
        }
    };
    result += "layout: sharing\r\n";
    result += "date: 2020-" + month + "-" + day + "\r\n";
    result += "title: \"讀經分享：【" + title + "】\"\r\n";
    result += "categories: sharing\r\n";
    result += "weekNum: \r\n";
    result += "dayNum: " + dayOfWeek + "\r\n";
    result += "permalink: /sharing/2020/wk-day" + dayOfWeek + "-sharing.html\r\n";
    result += "cycle: 2020\r\n";
    result += "---\r\n";

    result += normalize(inputText);
    result = result.replace(/（小錢）/g, "\n`小錢`");
    result = result.replace(/\(小錢\)/g, "\n`小錢`");
    result = result.replace(/默想：/g, "默想：\n>");
    result = result.replace(/禱告：/g, "禱告：\n>");
    result = result.replace(/提醒：/g, "提醒：\n>");
    result = result.replace(/家庭問答：/g, "家庭問答：\n>");

    document.getElementById("markup").value = result;
}

function getZhuolinSharingTemplate()
{
    var inputText = document.getElementById("input").value;
    var firstLine = inputText.split("\n")[0].trim();
    var dateText = firstLine.split(' ')[0];
    var dt = new Date(dateText.replace(/-/g, "/"));
    var dayOfWeek = dt.getDay();
    var day = (dt.getDate() < 10 ? "0" : "") + dt.getDate();
    var monthNum = dt.getMonth() + 1;
    var month = (monthNum < 10 ? "0" : "") + monthNum;
    var title = firstLine.substr(dateText.length + 1);
    var result = "---\r\n";
    result += "layout: sharing\r\n";
    result += "date: 2020-" + month + "-" + day + "\r\n";
    result += "title: \"每日靈修：" + title + "\"\r\n";
    result += "categories: sharing Zhuolin\r\n";
    result += "weekNum: \r\n";
    result += "dayNum: " + dayOfWeek + "\r\n";
    result += "permalink: /sharing/zhuolin/2020/wk-day" + dayOfWeek + "-sharing.html\r\n";
    result += "author: Zhuolin\r\n";
    result += "cycle: 2020\r\n";
    result += "---\r\n";
    
    result += normalize(inputText);
    result = result.replace(/\(Zhuolin\)/ig, "`Zhuolin`")
				   .replace(/（Zhuolin）/ig, "`Zhuolin`");
	if (result.indexOf("`Zhuolin`") < 0)
		result = result.replace(/^Zhuolin/gm, "`Zhuolin`");
	
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
	var biblegatewayUrl = inputText.replace(/ /g, "+")
									.replace(/:/g, "%3A")
									.replace(/;/g, "%3B")

    //result = "<a href=\"https://www.biblegateway.com/quicksearch/?quicksearch=" + inputText + "&qs_version=CUVMPT\">" + inputText + "</a>\r\n";
    var result = "[" + inputText + "](https://www.biblegateway.com/quicksearch/?quicksearch=" + biblegatewayUrl + "&qs_version=CUVMPT)";
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
        line = index >= 0 ? lines[i].substring(index + 2, lines[i].length) : lines[i];
        result += "<li>" + lines[i] + "</li>";
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
