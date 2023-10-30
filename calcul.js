document.getElementById('formulaire').addEventListener('submit',function(e) {
    
    document.getElementById('resultats').style.display = 'none';
    
    document.getElementById('chargement').style.display = 'block';
    
    setTimeout(calculResultats,2000);
    
    e.preventDefault();
    
});

function calculResultats(e) {
    
    const montant = document.getElementById('montant');
    const interets = document.getElementById('interets');
    const annees = document.getElementById('annees');
    
    const paiementMensuel = document.getElementById('paiement-mensuel');
    const montantTotal = document.getElementById('montant-total');
    const coutInterets = document.getElementById('montant-interet');
    
    const montantDecimal = parseFloat(montant.value);
    const calculInterets = parseFloat(interets.value)/100/12;
    const calculPaiements = parseFloat(annees.value)*12;
    
    // Calcul
    
    const x = Math.pow(1 + calculInterets,calculPaiements);
    const mensuel = (montantDecimal * x * calculInterets) / (x-1);
    
    if(isFinite(mensuel)) {
       
        paiementMensuel.value = mensuel.toFixed(2);
        montantTotal.value = (mensuel * calculPaiements).toFixed(2);
        coutInterets.value = ((mensuel * calculPaiements) - montantDecimal).toFixed(2);
        
        document.getElementById('resultats').style.display = 'block';
    
        document.getElementById('chargement').style.display = 'none';
        
    }
       
    else {
        
        showError('Merci de vérifier votre saisie');
    }
    
}

function showError(error) {
    
    document.getElementById('resultats').style.display = 'none';
    
    document.getElementById('chargement').style.display = 'none';
    
    const errorDiv = document.createElement('div');
    
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    
    errorDiv.className = 'alert alert-danger';
    
    errorDiv.appendChild(document.createTextNode(error));
    
    // Insertion du message d'erreur 
    
    card.insertBefore(errorDiv,heading);
    
    // Supprimer le message d'erreur après 3 sec
    
    setTimeout(clearError,3000);
}

function clearError() {
    
    document.querySelector('.alert').remove();
}