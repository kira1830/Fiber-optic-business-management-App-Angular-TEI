import { Client } from '../mes-client/client.model';

export class Projet{
    id_projet = -1;
    N_ODS = 0;
    N_BNC= 0;
    Designation	="Algerie telecome";
    Date_debut="26/06/1996";
    Date_fin="26/06/1996";
    Date_ODS = "";
    delais=15;
    Description ="No description";
    adress:string="blida"
    client:Client =null;
}