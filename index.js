var errors={

}
var form_date=[]
const handleChange=(classe,produit, value)=>{

    form_date=[...form_date.filter(obj=>obj.classe!==classe || obj.produit!==produit), {
      classe:classe,
      produit:produit,
      value:parseInt(value)  
    }]
    console.log(form_date)    
}
const getErros=(item)=>{
    
    return !errors[item.id]?`La quantite minimal n'est pas respecte pour cette classe de produit ${item.classe}`:``
}
const handleSubmit=()=>{
   alert("Okay! it's done!!!!")
}
$( document ).ready(function() {
    /*
    Les donnees recuperees de la BD via ajax doivent etre structurees de de cette facon
    */
    var data =[
        {
            id:1,
            classe:"Sumsung",
            minimum:2,
            produits:[
                {
                    id:1,
                    nom:"S1",
                    value:0
                },
                {
                    id:2,
                    nom:"S2",
                    value:0
                },
                {
                    id:3,
                    nom:"S3",
                    value:0
                }
            ]
        },
        {
            id:2,
            classe:"Sumsung2",
            minimum:1,
            produits:[
                {
                    id:1,
                    nom:"S1",
                    value:0
                },
                {
                    id:2,
                    nom:"S2",
                    value:0
                },
                {
                    id:3,
                    nom:"S3",
                    value:0
                }
            ]
        },
        {
            id:3,
            classe:"Sumsung3",
            minimum:1,
            produits:[
                {
                    id:1,
                    nom:"S1",
                    value:0
                },
                {
                    id:2,
                    nom:"S2",
                    value:0
                },
                {
                    id:3,
                    nom:"S3",
                    value:0
                }
            ]
        }
    ];
    var section="" // Permet de generer une section, une classe
    // cette boucle permet de parcourir toutes les classes
    data.map((item,Key)=>{
        var sect_1=`<div class='row section'> 
                        <b class='col-lg-12'>${item.classe}</b>
                        <div class="col-md-12">
                   `;
        //Cette boucle permet de parcourir les produit de la classe courante
        item.produits.map((elt,key)=>{
            //Ici nous construisons pour chaque produit un champs et la fonction handleChange nous permet 
            //de detecter la saisie dans les champs
            sect_1+=`
            <div class="form-group">
            <label for="">${elt.nom}</label>
            <input type="text" name=${item.classe} onkeyup="handleChange(this.name,this.id,this.value)" id=${elt.nom} class="form-control" placeholder=${elt.nom} aria-describedby="helpId">
            <small id="helpId" class="text-muted"></small>
          </div>
            `
        })
        sect_1+=`
        <small id="helpId" style="color:red" class="text-muted">${getErros(item)}</small>
        </div>
        </div>
        `;
        section+=sect_1;
    })
    section+=`
    <button class="btn btn-primary" onclick="handleSubmit()">
          Soumettre <span class="badge badge-primary"></span>
    </button>
    `
    $("#form").html(section);
    console.log(section)
});