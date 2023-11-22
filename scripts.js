$(document).ready(function() {

    $(document).ready(function() {
        $("#registerMbutton").on("click", function() {
            $("#loginModal").modal("hide");
            $("#registerModal").modal("show");
        });
    
        //registro
        $("#registerButton").on("click", function () {
            var email = $("#emailRegistro").val();
            var usuario = $("#usuarioRegistro").val();
            var password = $("#passwordRegistro").val();
            if (usuario === "" || password === "" || email === "") {
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


    //inicio de sesión
    $("#loginMbutton").on("click", function (event) {
        event.preventDefault();
        var usuario = $("#username").val();
        var password = $("#password").val();
        if (usuario === "" || password === "") {
            alert("Por favor, completa todos los campos.");
            return;
        }
        $.ajax({
            type: "POST",
            url: "php/user.php",
            data: { usuario: usuario, password: password },
            success: function(response) {
                console.log(response);
                if (response === "Usuario no encontrado") {
                    alert("Nombre de usuario no encontrado.");
                } else if (response === "Contraseña incorrecta") {
                    alert("Contraseña incorrecta.");
                } else if (response === "Exito") {
                    // Cambio boton
                    localStorage.setItem("usuario", usuario);
                    $("#loginModal").modal("hide");
                    $('body').removeClass('modal-open');
                    $('.modal-backdrop').remove();
                    var dropdownButton = `
                        <div class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle mr-2" type="button" id="DDusuario" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                ${usuario}
                            </button>
                            <div class="dropdown-menu">
                            <a class="dropdown-item" href="Administracion.html">Administracion</a>
                            <a class="dropdown-item" href="GestionC.html">Gestor de citas</a>
                            <a class="dropdown-item" id="logoutLink" href="#">Cerrar sesión</a>
                            </div>
                        </div>
                    `;
                    $("#ISbotton").replaceWith(dropdownButton);
                    $("#logoutLink").on("click", function() {
                        var loginButton = `
                            <button type="button" id="ISbotton" class="btn btn-primary mr-2" data-toggle="modal" data-target="#loginModal">
                                Iniciar sesión
                            </button>
                        `;
                        $("#DDusuario").replaceWith(loginButton);
                        location.reload();
                    });
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error("Error en la solicitud AJAX: " + textStatus, errorThrown);
            }
        });
    });

    //Cambio boton usuario
    var storedUsuario = localStorage.getItem("usuario");
    if (storedUsuario) {
        var dropdownButton = `
            <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle mr-2" type="button" id="DDusuario" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    ${storedUsuario}
                </button>
                <div class="dropdown-menu">
                    <a class="dropdown-item" href="Administracion.html">Administracion</a>
                    <a class="dropdown-item" href="GestionC.html">Gestor de citas</a>
                    <a class="dropdown-item" id="logoutLink" href="#">Cerrar sesión</a>
                </div>
            </div>
        `;
        $("#ISbotton").replaceWith(dropdownButton);
        $("#logoutLink").on("click", function() {
            var loginButton = `
                <button type="button" id="ISbotton" class="btn btn-primary mr-2" data-toggle="modal" data-target="#loginModal">
                    Iniciar sesión
                </button>
            `;
            $("#DDusuario").replaceWith(loginButton);
            localStorage.removeItem("usuario");
            location.reload();
        });
    }
})    
});
