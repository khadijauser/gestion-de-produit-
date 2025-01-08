const prompt = require("prompt-sync")();
const inventory = require("./inventory")
const inv = new inventory();

// hello test

function stockManager(){
    let menuOption;
do {
    inv.showMainMenu();
    menuOption = Number(prompt("Enter your choice :"));
    switch (menuOption) {
        case 1:
            inv.addProducts();
            break;
        case 2:
            inv.displayAllProducts();
            break;
        case 3:
            inv.modifyProduct();
            break;
        case 4:
            inv.deleteProduct();
            break;
        case 0:
            console.log("---------------------");
            console.log(" Exiting");
           
            break;
        default:
            console.log("----------------------");
            console.log("invalid option! please select a valid option");
            
            break;
        }
    } while (menuOption);
}

stockManager();
