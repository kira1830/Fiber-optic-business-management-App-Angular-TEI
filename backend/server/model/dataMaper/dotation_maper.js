module.exports=function(res){
    console.log(res)
    let dotation={
        id_dotation:res.ID_DOTATION,
        id_projet:res.ID_PROJET,
        designation: res.DESIGNATION,
        unite: res.UNITE,
        quantite_initial:res.QT_INITIAL,
        quantite_final:res.QT_FINAL
    }
    return dotation
}