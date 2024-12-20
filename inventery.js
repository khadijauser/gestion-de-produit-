const readline = require("readline");
const Inventory = require("./inventory");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("welcome in our product management");
panneauDeControle();

function panneauDeControle() {
  console.log("Panneau de Contrôle ; Merci de saisir votre choix :");
  console.log("1: Ajouter.");
  console.log("2: Afficher.");
  console.log("3: Modifier.");
  console.log("4: Suprimer.");
  console.log("5: Quitter.");
  rl.question("Entrez votre choix : ", (choix) => {
    switch (choix) {
      case "1":
        console.log("Ajouter un nouveau produit :");

        panneauDeControle();
        break;
      case "2":
        console.log("Disponibilité  des produits :");
        panneauDeControle();
        break;
      case "3":
        console.log("Modification sur les infos des produits :");
        panneauDeControle();
        break;
      case "4":
        console.log("Supprimer le produit :");
        panneauDeControle();
        break;
      case "5":
        console.log("\n A très bien tôt !");
        rl.close();
        break;
      default:
        console.log("\nChoix invalide. veuillez essayez les options disponible  ");
        panneauDeControle();
        break;
    }
  });
}