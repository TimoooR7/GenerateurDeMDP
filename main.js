//// Donner la possibilité à l'utilisateur e choisir qurels caractères vont aller dans le mot
// de passe, avec des checkbox par exemple. Lui demander la longueur.

// Pour donner le mot de passe, créer un élément à côté du bouton

/// Variables 
let win1852 = ['!', '#', '$', '%', '&', '*', '+', ',', '-', '.', '/', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '=', '?', '@', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '[', ']', '_', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'Œ', ' ', '•', '—', 'ò', 'ó', 'ô', 'õ', 'ö', 'ù', 'ú', 'û', 'ü', ' ']
let pswd_length = 12

let IsButtonPressed = false // Le bouton "Générer" est il pressé?
let bouton_generer = document.getElementById("start") // Obtenir le bouton "générer"
let pswd_emplacement = document.getElementById("mdp") // Obtenir la div qui contient le <a>mdp</a>

/// Méthodes
// Méthode pour copier du texte au presse-papier
async function writeTextToClipboard(text){
    try {
        await navigator.clipboard.writeText(text)
    }
    catch (error){
        console.log(error)
    }

}


/// Code principal

do {
    var bouton_copy = document.getElementById("copy")
        console.log(bouton_copy)
        bouton_copy.style.display = "none"

    /// Ecoute un événement "click" sur le bouton
    /// Lance la fonction si il a lieu
    bouton_generer.addEventListener("click", (event) => {
        console.log(event.target)

        let pswd = ""
        let a = ""

        IsButtonPressed = true;
        
        // Obtenir le contenu de la div qui contient (ou pas encore) le mdp
        let pswd_empl_content = pswd_emplacement.innerHTML
    
        // Générer un mot de passe
        for (let i = 0; i < pswd_length; i++) {
            let nbr = Math.floor(Math.random() * win1852.length)
            pswd += win1852[nbr]
    
        }
    
        // Créer l'interpolation qui contient le mdp
        a = `
        <a>${pswd}</a>
        `;
        
        // Placer le mot de passe dans la div
        pswd_emplacement.innerHTML = a

        // Faire apparaître le bouton copy
        bouton_copy.style.display = "flex"

        bouton_copy.addEventListener("click", (event) => {
            writeTextToClipboard(pswd) 
            let tooltiptext = document.querySelector("tooltiptext")
            console.log(tooltiptext)
            tooltiptext.textContent = "Copié !!"
        });

    });

}
while (IsButtonPressed === true)