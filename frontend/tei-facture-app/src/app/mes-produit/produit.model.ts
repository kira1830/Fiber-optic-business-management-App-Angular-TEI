export class Tach{
    id;
    code="";
    designation:string="";
    unite:string="u";
    prix_u:number=0;
    quantite:number=1;
    qt_real;
    chapitre:string=null;
    type:string=null;
    borduro:any
    date_creation
    mode=0//mode de  1 ajout out 0 update in form tach 
}

export class Produit{
    id:number=0;
    designation:string="";
    unite:string="u";
    prix_u:number=0;
    quantite:number=1;
    valable:boolean=true;
}
export class Dotation{
    id_dotation:number=0;
    id_projet:number=0;
    designation:string="";
    unite:string="u";
    quantite_initial:number=1;
    quantite_final:number=1;
}


export class Reintegration{
    id_reintegration:number=0;
    id_projet:number=0;
    designation:string="";
    unite:string="u";
    qt_demende:number=1;
    qt_livre:number=1;
}