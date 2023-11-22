$(document).ready(function(){

    $(document).ready(function(){
        $("#registerMbutton").on("click", function(){
            $("#loginModal").modal("hide");
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
            $("#registerModal").modal("show");
        });

    //registro
    $("#registerButton").on("click", function () {
        var email = $("#emailRegistro").val();
        var usuario = $("#usuarioRegistro").val();
        var password = $("#passwordRegistro").val();
        $.ajax({
            type: "POST",
            url: "php/register.php",
            data: { email: email, usuario: usuario, password: password },
            success: function (response) {
                alert(response);
                if (response === "Registro exitoso") {
                }
            }
                });
        });
    })





});