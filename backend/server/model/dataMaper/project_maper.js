projetModel=require("../projet.model")
module.exports=function(res,client){
    var projet=new projetModel();
    projet.id_projet=res.ID_PROJET;
    projet.N_ODS=res.N_ODS
    projet.N_BNC=res.N_BNC
    projet.Designation=res.DESIGNATION
    projet.Date_debut=res.DATE_DEBUT
    projet.Date_ODS=res.date_ods
    projet.Date_fin=res.DATE_FIN
    projet.delais=res.DELAIS
    projet.Description=res.DESCRIPTION
    projet.adress=res.ADRESS
    projet.client=client
    
    return projet
}