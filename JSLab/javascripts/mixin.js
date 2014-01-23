/**
 * Created by jorge on 1/21/14.
 */
Object.prototype.includes = function (constructor){
    var obj = new constructor();

    for(var property in obj){
        if(constructor.hasOwnProperty(property)){
            this.prototype[property] = object[property];
        }
    }
}

function Animal() {
    this.comer = function() {
        console.log("Eu como");
    };
    this.respirar = function() {
        console.log("Eu respiro");
    };
}

function Peixe() {
    this.respirar = function() {
        console.log("Eu respiro embaixo d'água");
    };
}

Peixe.prototype = new Animal();

function Nadador() {
    this.nadar = function() {
        console.log("Eu nado");
    }
}

Peixe.includes(Nadador);