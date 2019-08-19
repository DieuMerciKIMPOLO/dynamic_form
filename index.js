var errors={

}
var form_data=[]
const getTotal=(classe)=>{
    let total=0;
    form_data.map((item)=>{
        if(item.classe===classe){
            return total+=item.value
        }
    });
    return total
  }
const getErros=(item)=>{
    
    return getTotal(item.classe)<parseInt(item.minimum)?`La quantite minimal n'est pas respecte pour cette classe de produit ${item.classe}`:``
}
const handleChange=(classe,produit, value, minimum)=>{

    form_data=[...form_data.filter(obj=>obj.classe!==classe || obj.produit!==produit), {
      classe:classe,
      produit:produit,
      value:isNaN(parseInt(value))?0:parseInt(value),
      minimum:parseInt(minimum)
    }]
    //$(`#${classe}`).html(getErros({classe:classe, produit:produit, minimum:parseInt(minimum)}))
    console.log(form_data)    
}

const handleSubmit=()=>{
    //$(`#Sumsung3`).html(getErros({classe:"Sumsung3", produit:'produit', minimum:parseInt(12)}))
    //e.preventDefault();
    const data=JSON.parse(localStorage.getItem('data'));
    data.map((item)=>{
     $(`#${item.classe}`).html(getErros(item))
    })
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
    localStorage.setItem('data',JSON.stringify(data))
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
            <input type=${item.minimum} name=${item.classe} onkeyup="handleChange(this.name,this.id,this.value,this.type)" id=${elt.nom} class="form-control" placeholder=${elt.nom} aria-describedby="helpId">
            <small id="helpId" class="text-muted"></small>
          </div>
            `
        })
        sect_1+=`
        <small id=${item.classe} style="color:red" class="text-muted"></small>
        </div>
        </div>
        `;
        section+=sect_1;
    })
    section+=`
    <button onclick="handleSubmit()" type="button" value="send" class="btn btn-primary">Submit</button>
    `
    $("#form").html(section);
    console.log(section)
});