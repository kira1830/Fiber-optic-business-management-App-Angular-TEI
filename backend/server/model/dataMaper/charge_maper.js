module.exports=function(res){
    let charge={
        id:res.ID_PRODUIT,
        designation:res.DESIGNATION,
        unite:res.UNITE,
        prix_u:res.PRIX_U,
        chapitre:res.CHAPITRE,
        type:res.TYPE,
        quantite:res.QT
    }
    return charge
}