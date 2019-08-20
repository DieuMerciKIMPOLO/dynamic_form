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
    
    return getTotal(item.classe)<parseInt(item.minimum)?`La quantite minimal n'est pas respecte pour la famille de  ${item.classe} qui est de ${item.minimum}`:``
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
    const datas=JSON.parse(localStorage.getItem('datas'));
     console.log(datas);
    datas.map((item)=>{
     $(`#${item.classe}`).html(getErros(item))
    })
   }

$( document ).ready(function() {

var datas =[];	
$(function() { // ready
    $.getJSON('dada.php', function(data) {
        console.log(data);
        let is_selected=[]
      $.each(data, function(key, val) { // pour chaque entrée du tableau
       if(is_selected.filter(obj=>obj===val.categories_id).length===0){
            var produits=[];
            data.filter(obj=>obj.categories_id===val.categories_id).map((item)=>{
                produits.push(
                    {
                        id: item.product_id,
                        nom:item.quantity,
                        prix:item.rate, 
                        value:item.quantity  
                    }
                )
            });
            datas.push(
                { 
                    id: val.categories_id,
                    classe:val.categories_name,
                    minimum: val.QteCheck,
                    produits:produits
                }
            );
            is_selected.push(val.categories_id)
       }
       });
	    
     });
    });


    var data =[
        {
            id:1,
            classe:"LITTERIE",
            minimum:2,
            produits:[
                {
                    id:1,
                    nom:"S1",
					prix:"12",
                    value:0
                },
                {
                    id:2,
                    nom:"S2",
					prix:"12",
                    value:0
                },
                {
                    id:3,
                    nom:"S3",
					prix:"12",
                    value:0
                }
            ]
        },
        {
            id:2,
            classe:"REFRIGERATEUR",
            minimum:1,
            produits:[
                {
                    id:1,
                    nom:"S1",
					prix:"12",
                    value:0
                },
                {
                    id:2,
                    nom:"S2",
					prix:"12",
                    value:0
                },
                {
                    id:3,
                    nom:"S3",
					prix:"12",
                    value:0
                }
            ]
        },
        {
            id:3,
            classe:"MICRO-ONDES",
            minimum:3,
            produits:[
                {
                    id:1,
                    nom:"S1",
					prix:"12",
                    value:0
                },
                {
                    id:2,
                    nom:"S2",
					prix:"12",
                    value:0
                },
                {
                    id:3,
                    nom:"S3",
					prix:"12",
                    value:0
                }
            ]
        }
    ]
    localStorage.setItem('datas',JSON.stringify(datas))
	
    var section="" // Permet de generer une section, une classe
    // cette boucle permet de parcourir toutes les classes
	 
			
    JSON.parse(localStorage.getItem('datas')).map((item,Key)=>{
        var sect_1=`<div class='row section'> 
                        <b class='col-lg-12'>${item.classe}</b>
                        <div class="col-md-12">
						<table>
    <tbody>
	
                   `;
        //Cette boucle permet de parcourir les produit de la classe courante
        item.produits.map((elt,key)=>{
            //Ici nous construisons pour chaque produit un champs et la fonction handleChange nous permet 
            //de detecter la saisie dans les champs
            sect_1+=`
			<tr>
            <td> Nom produit : ${elt.nom} </td>
            <td> prix <input type="text" name="prix[]"  value=${elt.prix} id=prix class="form-control"  ></td>
            <td> <input type=${item.minimum} name=${item.classe} onkeyup="handleChange(this.name,this.id,this.value,this.type)" id=${elt.nom} class="form-control" placeholder="+" aria-describedby="helpId"></td>
            <td> <input type= name= value="" readonly class="form-control" placeholder=""></td>
             </tr>
            
            <small id="helpId" class="text-muted"></small>
          </div>
            `
        })
        sect_1+=`</tbody></table>
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
