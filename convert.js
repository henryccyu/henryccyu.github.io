function convert()
{
    var input = document.getElementById("input");
    var inputText = input.value; 
    var inputTextLines = inputText.split("\n");

    //Patter matching for each line
    for (i = 0; i < inputTextLines.length; i++) { 
        text = inputTextLines[i];

        //Replace some punctuations
        text = text.replace(/,/g, "，");
        text = text.replace(/[?]/g, "？");
        text = text.replace(/:/g, "：");
        text = text.replace(/!/g, "！");
    }
}
