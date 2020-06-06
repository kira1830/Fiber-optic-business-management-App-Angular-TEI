const client_model=require("../client.model")

module.exports=function(results){

    let client = new client_model();
    client.id_societe=results.ID_SOCIETE
    client.Nom_societe=results.NOM_SOCIETE
    client.adresse=results.ADRESSE
    client.fax=results.FAX
    client.tel=results.TEL
    client.MF=results.MF
    client.N_RC=results.N_RC
    client.Nif=results.NIF
    client.Nis=results.NIS
    client.email=results.email
    client.do_bancaire=results.do_bancaire
    client.AI=results.AI
    client.capital_social=results.capital_social
    return client

}