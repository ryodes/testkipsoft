    //  variable global qui va stocker les données de l'api
var stock;
$(document).ready(function() {
    $("#button-addon2").click(function() {
            //  rajoute la class "disabled" au h4 afin d'enlever "Aucun résultat trouvé."
        $("#notfound").addClass("disabled");

        //  Supprimer les potentiels précédentes recherches
        $(".panel").remove();
        $(".page-item").remove();

            //  Recupere le nom saisi dans l'input.
        var textInput = $("#nom").val();

            //  Verifie si au moins un champ à était saisi.
        if (textInput.length > 0) {
            $.ajax({
                    //  Connection à l'api pour récupérer les données de l'entreprise souhaité
                url: "https://entreprise.data.gouv.fr/api/sirene/v1/full_text/"+ textInput +"?per_page=5&page=1",
                error: function() {
                        //  enlever la class "disabled" du message "Aucun résultat trouvé." pour l'afficher.
                    $("#notfound").removeClass("disabled");
                },
                success: function(result) {
                    stock = result;
                    for (let i=0; i<result["etablissement"].length;  i++) {
                        $("#results").append("<a id='"+i+"' href='#' class='panel' data-toggle='modal' data-target='#exampleModal' onclick='modal("+i+")'>"+
                                                "<li class='list-group-item'>" + 
                                                    "<h4>" + result['etablissement'][i]['l1_normalisee'] + "</h4>" +
                                                    "<p>" + result['etablissement'][i]['libelle_activite_principale'] + "</p>" +
                                                    "<p>" + result['etablissement'][i]['l6_normalisee'] + "</p>" +
                                                "</li>" +
                                            "</a>");
                    }
                    for (let i=0; i<result["total_pages"]; i++) {
                        $(".pagination").append("<li class='page-item'><a class='page-link' href='#'>" + (i+1) + "</a></li>");
                    }
                }
            });
        }
    })
});

    //  fonction qui modifie la modal en fonction du panel choisi
function modal(id){
    $("#modal-title").text(stock['etablissement'][id]['l1_normalisee']);
    $("#modal-siren").text("(" + stock['etablissement'][id]['siren'] + ")");
    $("#modal-ville").text(stock['etablissement'][id]['l6_normalisee']);
    $("#modal-siret").text(stock['etablissement'][id]['siret']);
    $("#modal-nic").text(stock['etablissement'][id]['nic']);
    $("#modal-activite_principale").text(stock['etablissement'][id]['activite_principale']);
    $("#modal-activite_principale").append(" - " + stock['etablissement'][id]['libelle_activite_principale']);
    $("#modal-nature_juridique_entreprise").text(stock['etablissement'][id]['nature_juridique_entreprise']);
    $("#modal-nature_juridique_entreprise").append(" - " + stock['etablissement'][id]['libelle_nature_juridique_entreprise']);
}

