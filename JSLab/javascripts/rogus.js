function convertTextToFloat(text){
    var floatValue = text.replace("R$", "").replace(",",".");
    return parseFloat(floatValue);
}