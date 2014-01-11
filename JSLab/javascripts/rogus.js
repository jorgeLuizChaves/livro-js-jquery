function convertTextToFloat(text){
    var floatValue = text.replace("R$ ", "").replace(",",".");
    return parseFloat(floatValue);
}

function floatToMoneyText(value){
    const COMMA = ",";
    value = Math.floor(value * 100);
    var stringValue = (value < 1 ? "1" : value.toString());
    var result = "R$ " + stringValue.substr(0, stringValue.length - 2) + COMMA + stringValue.substr(stringValue.toString().length - 2);
   return result;
}

function readTotal(){
    var moneyTotal = document.getElementById("total").innerHTML;
    return floatToMoneyText(moneyTotal);
}

function writeTotal(value){
    document.getElementById("total").innerHTML = value;
}

function calculateTotalProducts(){


    hasSupportToClassName();


    var products = document.getElementsByClassName("produto");

    var total =0;
    for(var cont=0; cont < products.length; cont++){
        var quantityElements =   products[cont].getElementsByClassName("quantity");
        var priceElements = products[cont].getElementsByClassName("price");

        var quantity = convertTextToFloat(quantityElements[0].value);
        var price = convertTextToFloat(priceElements[0].innerHTML);

        var subTotal = quantity * price;
        total += subTotal;
    }
    return floatToMoneyText(total);
}

function quantityModified(){
    writeTotal(calculateTotalProducts());
}



function hasSupportToClassName(){
    if("undefined" === "undefined"){
        document.getElementsByClassName = function(className){
            var allElements = document.getElementsByTagName("*");
            var result = [];
            var element;

            for(var cont=0; (element = allElements[cont]) != null; cont++){
                if(element.className && element.className.indexOf(className) != -1){
                    console.log(element.className.indexOf(className));
                    result.push(element);
                }
            }
            return result;
        }
    }
}

window.onload = function(){
    var quantities = document.getElementsByClassName("quantity");

    for(var cont=0; cont < quantities.length; cont++){
        quantities[cont].onchange = quantityModified;
    }
};