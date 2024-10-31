/// Variables 

const chr_majletters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
const chr_minletters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
const chr_accentsletters = ['Œ', 'ò', 'ó', 'ô', 'õ', 'ö', 'ù', 'ú', 'û', 'ü']
const chr_specialchars = ['!', '#', '$', '%', '&', '*', '+', ',', '-', '.', '/', '=', '?', '@', '[', ']', '_', '•', '—',]
const chr_numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
const chr_space = [" "]

const pswd_length = 12

let bouton_generer = document.getElementById("start") // Obtenir le bouton "générer"
let pswd_emplacement = document.getElementById("mdp") // Obtenir la div qui contient le <a>mdp</a>
let tooltiptext = document.getElementById("tooltiptext")
let checkboxes = document.querySelectorAll(".inp-cbx")
let included_pswd_chars = []

// Liste de liste qui contient la checkbox et ses caractères attribués
const charOptions = [
    { checkbox: document.getElementById("box1"), chars: chr_majletters },
    { checkbox: document.getElementById("box2"), chars: chr_minletters },
    { checkbox: document.getElementById("box3"), chars: chr_accentsletters },
    { checkbox: document.getElementById("box4"), chars: chr_specialchars },
    { checkbox: document.getElementById("box5"), chars: chr_numbers },
    { checkbox: document.getElementById("box6"), chars: chr_space }
];


/// Méthodes
// Méthode pour copier du texte au presse-papier
async function writeTextToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text)
    }
    catch (error) {
        console.log(error)
    }

};

// Fonction pour mettre à jour included_pswd_chars. Elle check si la box est cochée ou non
function updateIncludedChars() {

    included_pswd_chars = []; // Réinitialiser à chaque changement

    charOptions.forEach(option => {
        if (option.checkbox.checked) {
            included_pswd_chars = included_pswd_chars.concat(option.chars);
        }
    });


    console.log(included_pswd_chars)
}


/// PARTIE PRINCIPALE

// Mettre à jour les caractères inclus si le bouton a été coché/décoché
charOptions.forEach(option => {
    option.checkbox.addEventListener('change', updateIncludedChars);
});


// Obtenir bouton copy et l'effacer
var bouton_copy = document.getElementById("copy")
bouton_copy.style.display = "none"

/// Ecoute un événement "click" sur le bouton
/// Lance la fonction si il a lieu
bouton_generer.addEventListener("click", (event) => {
    console.log(event.target)

    let pswd = ""
    let a = ""


    // Check si il y a pas de caractères inclus. -> Si aucune checkbox est cochée quoi. Saute la génération si oui
    if (included_pswd_chars.length > 0) {

        // Générer un mot de passe
        for (let i = 0; i < pswd_length; i++) {
            let nbr = Math.floor(Math.random() * included_pswd_chars.length)
            pswd += included_pswd_chars[nbr]

        }

        // Créer l'interpolation qui contient le mdp
        a = `
                <a>${pswd}</a>
                `;

        // Placer le mot de passe dans la div
        pswd_emplacement.innerHTML = a

        // Faire apparaître le bouton copy
        bouton_copy.style.display = "flex"

        // Si le bouton "Copy" a été pressé
        bouton_copy.addEventListener("click", (event) => {
            writeTextToClipboard(pswd)
            tooltiptext.textContent = "Copié !!"
            setTimeout(() => {
                tooltiptext.textContent = "Copier au presse-papier"
            }, 1000);
        });
    }
    else 
    {
        console.log("Le mot de passe est vide.")
    }
});
