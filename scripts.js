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
        if (usuario === "" || password === ""|| email === "") {
            alert("Por favor, completa todos los campos.");
            return;
          }
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

    // Validación de inicio de sesión
    $("#loginMbutton").on("click", function (event) {
        event.preventDefault();
    
        // Validar que el usuario y la contraseña no estén vacíos
        var usuario = $("#username").val();
        var password = $("#password").val();
        if (usuario === "" || password === "") {
        alert("Por favor, completa todos los campos.");
        return;
        }
    
        // Verificar existencia en la base de datos
        $.ajax({
            type: "POST",
            url: "php/user.php",
            data: { usuario: usuario, password: password },
            success: function(response) {
                console.log(response); // Muestra la respuesta en la consola para depurar
                if (response === "Usuario no encontrado") {
                    alert("Nombre de usuario no encontrado.");
                } else if (response === "Contraseña incorrecta") {
                    alert("Contraseña incorrecta.");
                } else if (response === "Exito") {
                    $("#loginModal").modal("hide");
                    $('body').removeClass('modal-open');
                    $('.modal-backdrop').remove();
                    // alert("Inicio de sesión exitoso.");
                    // Crear el código del nuevo botón de dropdown
                    var dropdownButton = `
                        <div class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                ${usuario}
                            </button>
                            <div class="dropdown-menu">
                                <a class="dropdown-item" href="#">Opción 1</a>
                                <a class="dropdown-item" href="#">Opción 2</a>
                                <a class="dropdown-item" href="#">Opción 3</a>
                            </div>
                        </div>
                    `;

                    // Reemplazar el botón de inicio de sesión por el dropdown
                    $("#ISbotton").replaceWith(dropdownButton);
                
            
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error("Error en la solicitud AJAX: " + textStatus, errorThrown);
            }
        });
    });
    });
});
        
