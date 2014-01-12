function convertTextToFloat(text){
    var floatValue = text.replace("R$ ", "").replace(",",".");
    return parseFloat(floatValue);
}

function floatToMoneyText(value){
    const COMMA = ",";
    value = Math.floor(value * 100);
    var stringValue = (value < 1 ? "1" : value.toString());
    var result = "R$ " + stringValue.substr(0, stringValue.length - 2)
    + COMMA + stringValue.substr(stringValue.toString().length - 2);
   return result;
}

function readTotal(){
    return floatToMoneyText($("#total").text());
}

function writeTotal(value){
    $("#total").text(value);
}

function calculateTotalProducts(){

    var $products = $(".produto");

    var total =0;
    $products.each(function(pos, produto){
        var quantityElements =   $(produto).find(".quantity").val();
        var priceElements = $(produto).find(".price").text();

        var quantity = convertTextToFloat(quantityElements);
        var price = convertTextToFloat(priceElements);

        var subTotal = quantity * price;
        total += subTotal;
    })

    return floatToMoneyText(total);
}

function quantityModified(){
    writeTotal(calculateTotalProducts());
}

window.onload = function(){
    var quantities = document.getElementsByClassName("quantity");

    for(var cont=0; cont < quantities.length; cont++){
        quantities[cont].onchange = quantityModified;
    }
};