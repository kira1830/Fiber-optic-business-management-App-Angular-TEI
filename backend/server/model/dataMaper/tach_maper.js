module.exports=function(res){
    let tach={
        id:res.id_tach,
        code:res.CODE,
        designation:res.DESIGNATION,
        unite:res.UNITE,
        prix_u:res.PRIX_U,
        chapitre:res.CHAPITRE,
        type:res.TYPE,
        quantite:res.QT,
        qt_real:res.qt_real,
        borduro:res.borduro,
        date_creation:res.date_creation
    }
    return tach
}