function convertTextToFloat(text){
    var floatValue = text.replace("R$", "").replace(",",".");
    return parseFloat(floatValue);
}

function floatToMoneyText(value){
    const COMMA = ",";
    value = value * 100;
    var stringValue = value.toString();
    var result = "R$" + stringValue.substr(0, stringValue.length - 2) + COMMA + stringValue.substr(stringValue.toString().length - 2);
   return result;
}