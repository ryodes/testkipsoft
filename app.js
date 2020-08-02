$(document).ready(function() {
    $("#button-addon2").click(function() {
            //  rajoute la class "disabled" au h4 afin d'enlever "Aucun résultat trouvé."
        $("#notfound").addClass("disabled");

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
                    console.log("success");
                }
            });
        }
    })
});