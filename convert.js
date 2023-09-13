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
							.replace("供應幫助(Provision)", "**幫助供應 (Provision)**  \r\n>")
							.replace("幫助供應(Provision)", "**幫助供應 (Provision)**  \r\n>")
							.replace("憐憫饒恕(Pardon)", "**憐憫饒恕 (Pardon)**  \r\n>")
							.replace("保抱守護(Protection)", "**保抱守護 (Protection)**  \r\n>")
							.replace("供應(Provision)", "**幫助供應 (Provision)**  \r\n>")
							.replace("饒恕(Pardon)", "**憐憫饒恕 (Pardon)**  \r\n>")
							.replace("保護(Protection)", "**保抱守護 (Protection)**  \r\n>")
							.replace(/•/g, ">\r\n>")
							.replace(/^ +>/gm, ">")
							.replace(/^ +/gm, "　")
							.replace(/^Zhuolin/gm, "`2020- Zhuolin`")
							.replace("疫情中的禱告 第", "## 疫情中的禱告\r\n第");
    document.getElementById("markup").value = header + result;
}

function for2022()
{
    var inputText = document.getElementById("input").value;
    var lines = inputText.split('\n');
    var language = "language: Chinese";
    var categoryText = "categories: daily";
    var layout = "layout: daily"
    var title = "";
    var dateText = "";
	var content = "";
	var isMetaData = false;
    var dateInfo
	
	for (var i = 0; i < lines.length; i++)
    {
		if (lines[i].indexOf("---") >= 0)
			isMetaData = !isMetaData
        else if (lines[i].indexOf("language:") >= 0)
            language = lines[i];
        else if (lines[i].indexOf("categories:") >= 0)
            categoryText = lines[i];
        else if (lines[i].indexOf("layout:") >= 0)
            layout = lines[i];
        else if (lines[i].indexOf("date:") >= 0)
        {
            dateText = lines[i].substring(6).trim();
            dateInfo = getDateInfo(dateText)
        }
        else if (lines[i].indexOf("title:") >= 0)
        {
            if (lines[i].indexOf("Week") > 0) // English
                title = lines[i].replaceAll('"', '').split(": ");
            else if (lines[i].indexOf("每日靈修") > 0)
                title = lines[i].replaceAll('"', '').split("每日靈修：");
            else
                title = lines[i].replaceAll('"', '').split(" ");
            title = title[title.length - 1];
        }
		else if (!isMetaData && lines[i].indexOf("---") < 0)
        {
            if (lines[i].indexOf('BibleLinks') >= 0)
                content += '\r\n{% include BibleLinks' + dateInfo.cycle + '.html %}\r\n'
            else
			    content += lines[i] + "\r\n"
        }
    }

    var result = "";
    var category = categoryText.split(' ')[1]
    var titleText = "每日靈修：" + title
    var permalinkRoot = '/sharing/zhuolin/'
    if (category == "daily" && language.indexOf("English") >= 0)
    {
        titleText = '"' + dateInfo.cycle + '-' + (dateInfo.cycle+1) + ' Week ' + dateInfo.numberOfWeek + ' Day ' + dateInfo.numberOfDay + ': ' + title + '"'
        permalinkRoot = '/en/' + category + '/'
    } else if (category == "daily" && language.indexOf("Chinese") >= 0) {
        titleText = '第' + dateInfo.numberOfWeek + '週 第' + dateInfo.numberOfDay + '天 ' + title
        permalinkRoot = '/' + category + '/'
    }

    if (layout.indexOf("daily") >= 0)
        layout = "layout: daily" + dateInfo.cycle;

    result += '---\r\n'
            + "cycle: " + dateInfo.cycle + "\r\n"
            + layout + "\r\n"
            + categoryText + "\r\n"
            + language + "\r\n"
            + "title: " + titleText + "\r\n"
            + "date: " + dateInfo.dateText + "\r\n"
            + "weekNum: " + dateInfo.numberOfWeek + "\r\n"
            + "dayNum: " + dateInfo.numberOfDay + "\r\n"
            + "permalink: " + permalinkRoot + dateInfo.cycle + "/wk" + dateInfo.numberOfWeek + "-day" + dateInfo.numberOfDay + "-" + category + ".html\r\n"
            + "---\r\n"

    document.getElementById("markup").value = result + content;
}

function for2020()
{
    var inputText = document.getElementById("input").value;
    var result = inputText.replace("layout: daily2", "layout: daily2020")
                            .replace("cycle: 2018", "cycle: 2020")
							.replace("permalink: /daily/wk", "permalink: /daily/2020/wk")
							.replace("BibleLinks.html", "BibleLinks2020.html")
							.replace(/周/g, "週")
							.replace(/週圍/g, "周圍")
							.replace(/\*\*/g, "")
    .replace("问题：", "問題：")
							.replace("問題：", "### 問題：")
							.replace("默想：神的故事", "### 默想：神的故事")
							.replace("默想：我的故事", "### 默想：我的故事")
							.replace("禱告：", "### 禱告：")
							.replace("### 祷告", "### 禱告")
							.replace("筆記與回應：", "### 筆記與生活回應：")
							.replace("笔记与回应：", "### 筆記與生活回應：")
							.replace(/### ###/g, "###")
							.replace("### {%- include BibleLinks2020.html", "{%- include BibleLinks2020.html");
    if (result.indexOf("cycle: ") == -1)
    {
    	result = result.replace("layout: ", "cycle: 2020\nlayout: ");
    }
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

function getBsfVersesInChinese_real()
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

function getBsfVersesInChinese()
{
    var inputText = document.getElementById("input").value;
    var result = "";
	var lines = inputText.split('\n')
	for (i = 0; i < lines.length; i++) {
		result += "{\r";
		var columns = lines[i].split('\t')
		result += '\t"id": "' + columns[0] + '",\r';
		result += '\t"progress": 100' + ',\r';
		result += '\t"deploymentStatus": "' + columns[4] + '",\r';
		result += '\t"createdTime": "' + columns[1] + '",\r';
		result += '\t"startTime": "' + columns[2] + '",\r';
		result += '\t"endTime": "' + columns[3] + '"\r';
		result += "},\r";
	}

    document.getElementById("markup").value = result;
}

function IsDigit(charCode)
{
	var charCodeZero = "0".charCodeAt(0);
	var charCodeNine = "9".charCodeAt(0);
	return charCode >= charCodeZero && charCode <= charCodeNine;
}
function normalize(inputText)
{
    var result = useChinesePunctuation(inputText).replace(/周/g, "週").replace(/週圍/g, "周圍");

    result = useRomanCommaForVerses(result);
    result = ConvertNumberedList(result);
	result = result.replace(/^-/gm, "—");
	var arr = result.split("：");
	var st = "";
	for (i = 0; i < arr.length - 1; i++)
	{
		if (IsDigit(arr[i].charCodeAt(arr[i].length - 1)) && IsDigit(arr[i+1].charCodeAt(0)))
		    st += arr[i] + ":";
		else
		    st += arr[i] + "：";
	}
	result = st + arr[arr.length - 1];
    if (!document.getElementById("keepSpace").checked)
		result = result.replace(/ /g, "");
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

function getNumberOfWeek(dateText)
{
    var date = new Date(dateText);
    var time = date.getTime();
    // Calculate the week number by dividing the time by the number of milliseconds in a week
    var weekNumber = Math.ceil(((time - new Date(date.getFullYear(), 0, 1).getTime()) / 86400000) / 7);
    return weekNumber + (date.getFullYear() % 2) * 52;
}

function getDateInfo(dateText)
{
    var date = new Date(dateText.replaceAll('-', '/'));
    var year = date.getFullYear();
    var month = date.getMonth();
    var monthText = month + 1;
    if (month < 9)
        monthText = "0" + monthText;
    var day = date.getDate();
    var dayText = day;
    if (day < 10)
        dayText = "0" + dayText;
    dateText = year + "-" + monthText + "-" + dayText;
    var cycle = year - year % 2;
    var numberOfWeek = getNumberOfWeek(date);
    var numberOfWeekText = numberOfWeek;
    if (numberOfWeek < 10)
	numberOfWeekText = "00" + numberOfWeekText;
    else if (numberOfWeek < 100)
	numberOfWeekText = "0" + numberOfWeekText;
    var numberOfDay = date.getDay();
    if (numberOfDay == 0)
        numberOfDay = 7;

    var DateInfo = {
        dateText: dateText,
        numberOfWeek: numberOfWeek,
	numberOfWeekText: numberOfWeekText,
        numberOfDay: numberOfDay,
        cycle: cycle
    }

    return DateInfo;
}

function getQianBinSharingTemplate()
{
    var inputText = document.getElementById("input").value;
    var dateInfo = getDateInfo(inputText.split(' ')[0]);
    var title = inputText.split(' ')[1];
    var result = "---\r\n" +
                "cycle: " + dateInfo.cycle + "\r\n" +
                "categories: sharing\r\n" +
                "layout: sharing\r\n" +
                "date: " + dateInfo.dateText + "\r\n" +
                "title: \"神學梳理：" + title + "\"\r\n" +
                "weekNum: " + dateInfo.numberOfWeek + "\r\n" +
                "dayNum: " + dateInfo.numberOfDay + "\r\n" +
                "permalink: /sharing/2022/wk" + dateInfo.numberOfWeek + "-day" + dateInfo.numberOfDay + "-sharing.html\r\n" +
                "---\r\n" +
                "\r\n" +
                "[" + title + "](https://eccseattle.github.io/media/sharing/" + dateInfo.cycle + "/wk" + dateInfo.numberOfWeekText + "/" + dateInfo.dateText + "-bin.m4a)\r\n" +
                "\r\n" +
                "`小錢`\r\n" +
                "\r\n";

    document.getElementById("markup").value = result;
}

function getZhuolinSharingTemplate()
{
    var inputText = document.getElementById("input").value;
    var firstLine = inputText.split("\n")[0].trim();
    var dateText = inputText.split("\n")[1].trim();
    var dt = new Date(dateText.replace(/-/g, "/"));
    var dayOfWeek = dt.getDay();
    var day = (dt.getDate() < 10 ? "0" : "") + dt.getDate();
    var monthNum = dt.getMonth() + 1;
    var month = (monthNum < 10 ? "0" : "") + monthNum;
    var title = firstLine.split(' ').slice(-1)[0];
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

function getZhuolinSharingTemplate2()
{
    var inputText = document.getElementById("input").value;
    var dateInfo = getDateInfo(inputText.split(' ')[0]);
    var title = inputText.split(' ')[1];

	var result = "---\r\n" +
				"layout: sharing\r\n" +
				"date: " + dateInfo.dateText + "\r\n" +
				"title: \"親子導讀：" + title + "\"\r\n" +
				"categories: sharing Zhuolin\r\n" +
				"weekNum: " + dateInfo.numberOfWeek + "\r\n" +
				"dayNum: " + dateInfo.numberOfDay + "\r\n" +
				"permalink: /sharing/zhuolin/" + dateInfo.cycle + "/wk" + dateInfo.numberOfWeek + "-day" + dateInfo.numberOfDay + "-sharing2.html\r\n" +
				"author: Zhuolin\r\n" +
				"cycle: 2022\r\n" +
				"---\r\n";
	document.getElementById("markup").value = result;
}

function getZhuolinSharingTemplate3()
{
	var result = "---\r\n" +
				"layout: sharing\r\n" +
				"date: 2022-\r\n" +
				"title: \"親子導讀：\"\r\n" +
				"categories: sharing Zhuolin\r\n" +
				"weekNum: \r\n" +
				"dayNum: \r\n" +
				"permalink: /sharing/zhuolin/2022/wk-day-sharing3.html\r\n" +
				"author: Zhuolin\r\n" +
				"cycle: 2022\r\n" +
				"---\r\n" +
				"\r\n" +
				"1. 打印經文。  \r\n" +
				"2. 一起禱告開始。  \r\n" +
				"3. 讓孩子讀，勾畫重點，紀錄下自己想問的問題。  \r\n" +
				"4. 討論時間，請孩子分享自己的問題。討論、紀錄。經文引導列在下面。  \r\n" +
				"5. 應用分享（不可缺）。應用部分也列在下面。  \r\n" +
				"6. 禱告結束。\r\n" +
				"\r\n" +
				"#### 今天的經文可以引導的方向：\r\n" +
				"\r\n" +
				"\r\n" +
				"\r\n" +
				"#### 應用部分\r\n" +
				"\r\n" +
				"1. 今天的經文和後面的分享討論，給你印象最深的是哪一點？  \r\n" +
				"2. 如果反省一下你自己的生命，你認識到你自己的什麼掙扎，是跟沒有意識到與上面的1中所分享的相關的。  \r\n" +
				"3. 從這一點你有什麼思考？你覺得遇到同樣的掙扎的時候，你可以怎樣提醒自己？\r\n" +
				"\r\n" +
				"琢琳\r\n" +
				"\r\n" +
				"附：[親子導讀簡介](https://bibleplan.github.io/ParentChild-BibleStudyIntro.html)\r\n";
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

