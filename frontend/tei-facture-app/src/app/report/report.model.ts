export class  MesInfo{
    id_c;
    RC;
    Nis;
    Nif;
    AI;
    DO_BANCAIRE;
    tel;
    fax;
    email;
    Siege_social
    capital_social
}



export class Facture{
    id_facture;
    id_projet;
    n_facture;
    date_facture;
    mode_payement
}

export class Proforma{
    num_facture;
    id_projet;
    date_proforma;
    valide;
    mode_payement
}