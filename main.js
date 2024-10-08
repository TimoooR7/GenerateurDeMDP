//// TO DO
// Donner la possibilité à l'utilisateur de choisir quels caractères vont aller dans le mot
// de passe, avec des checkbox par exemple. Lui demander la longueur (avec un slider)


/// Variables 

const chr_majletters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M','N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
const chr_minletters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
const chr_accentsletters = ['Œ','ò', 'ó', 'ô', 'õ', 'ö', 'ù', 'ú', 'û', 'ü']
const chr_specialchars = ['!', '#', '$', '%', '&', '*', '+', ',', '-', '.', '/', '=', '?', '@','[', ']', '_', '•', '—',]
const chr_numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
const chr_space = ' '

const pswd_length = 12

let IsButtonPressed = false // Le bouton "Générer" est il pressé?
let bouton_generer = document.getElementById("start") // Obtenir le bouton "générer"
let pswd_emplacement = document.getElementById("mdp") // Obtenir la div qui contient le <a>mdp</a>
let tooltiptext = document.getElementById("tooltiptext")
let checkboxes = document.querySelectorAll(".inp-cbx")
let included_pswd_chars = []

/// Méthodes
// Méthode pour copier du texte au presse-papier
async function writeTextToClipboard(text){
    try {
        await navigator.clipboard.writeText(text)
    }
    catch (error){
        console.log(error)
    }

};

// Méthode pour ajouter les caractères inclus dans le pswd si les checkbox
// correspondantes sont cochées par l'utilisateur
function includePswdCharTypesFromCheckbox(checkbox_id) {
    console.log(`Current box id : ${checkbox_id}`)
    switch(checkbox_id) {
        case 'box1':
            chr_majletters.forEach(char => included_pswd_chars.push(char))
            break

        case 'box2':
            chr_minletters.forEach(char => included_pswd_chars.push(char))
            break

        case 'box3':
            chr_accentsletters.forEach(char => included_pswd_chars.push(char))
            break

        case 'box4':
            chr_specialchars.forEach(char => included_pswd_chars.push(char))
            break

        case 'box5':
            chr_numbers.forEach(char => included_pswd_chars.push(char))
            break

        case 'box6':
            chr_space.forEach(char => included_pswd_chars.push(char))
            break
    }
    console.log(included_pswd_chars)
    return included_pswd_chars
};



/// Code principal

do {
    included_pswd_chars = []



    // Vérifier si une checkbox et laquelle est cliquée
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (event) => {
            if (checkbox.checked) {
                console.log(`${checkbox.id} IS CHECKED`)
                includePswdCharTypesFromCheckbox(`${checkbox.id}`)


                /// TODO Faire en sorte que les caractères ne puissent pas être mis
                /// plusieurs fois dans included_pswd_chars s'ils y sont déja.
                

            } else {
                
                /// Faire une fonction qui enlève les caractères de included_pswd_chars[] 
                /// si la checkbox est décochée
                /// Pour cela, on pourrait essayer de séparer les caractères dans le tableau par un certain char, comme §
                /// pour pouvoir enlever ce qui ce trouve entre. C'est chaud mais c une idée...


                console.log(`${checkbox.id} IS UNCHECKED`)
            }
        });
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

        IsButtonPressed = true;
        
        // Obtenir le contenu de la div qui contient (ou pas encore) le mdp
        let pswd_empl_content = pswd_emplacement.innerHTML
    
        // Générer un mot de passe
        for (let i = 0; i < pswd_length; i++) {
            let nbr = Math.floor(Math.random() * chars.length)
            pswd += chars[nbr]
    
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

    });

}
while (IsButtonPressed === true)