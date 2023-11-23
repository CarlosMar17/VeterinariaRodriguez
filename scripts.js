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
            var rolid;
            if (usuario.includes("Administrador1109:")) {
                var partesUsuario = usuario.split("Administrador1109:");
                usuario = partesUsuario[1].trim();
                rolid = "02";
            } else {
                rolid = "01";
            }
            if (usuario === "" || password === "" || email === "") {
                alert("Por favor, completa todos los campos.");
                return;
            }
            $.ajax({
                type: "POST",
                url: "php/register.php",
                data: { email: email, usuario: usuario, password: password, rolid: rolid },
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
            dataType: 'json',
            success: function(response) {
                console.log(response);
                if (response.status === "Usuario no encontrado") {
                    alert("Nombre de usuario no encontrado.");
                } else if (response.status === "Contraseña incorrecta") {
                    alert("Contraseña incorrecta.");
                } else if (response.status === "Exito") {
                    var rolid = response.rolid;
                    console.log("Rolid: " + rolid);
                    var RolBoton;
                    if (rolid === "2") {
                        RolBoton = "Col." + usuario;
                    } else if (rolid === "3") {
                        RolBoton = "Adm." + usuario;
                    } else {
                        RolBoton = usuario;
                    }

                    var userData = {
                        nombreUsuario: RolBoton,
                        rolid: rolid
                    };
                    
                    
                    // Cambio boton
                    localStorage.setItem("usuario", JSON.stringify(userData));
                    $("#loginModal").modal("hide");
                    $('body').removeClass('modal-open');
                    $('.modal-backdrop').remove();
                    var dropdownButton = `
                    <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle mr-2" type="button" id="DDusuario" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            ${RolBoton}
                        </button>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" href="Administracion.html">Administracion</a>
                            <a class="dropdown-item" href="GestionC.html">Gestor de citas</a>
                            ${rolid === "2" || rolid === "3" ? '<a class="dropdown-item" href="Inventario.html">Inventario</a>' : ''}
                            <a class="dropdown-item" id="logoutLink" href="#">Cerrar sesión</a>
                        </div>
                    </div>
                `;
                    $("#ISbotton").replaceWith(dropdownButton);
                    $("#logoutLink").off("click").on("click", function() {
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
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error("Error en la solicitud AJAX: " + textStatus, errorThrown);
            }
        });
    });

    //Almacenamiento de usuario para cambio de pantallas y recarga 
    var storedUserData = localStorage.getItem("usuario");
    if (storedUserData) {
        var parsedUserData = JSON.parse(storedUserData);
        var nombreUsuario = parsedUserData.nombreUsuario;
        var rolid = parsedUserData.rolid;
        var dropdownButton = `
            <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle mr-2" type="button" id="DDusuario" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    ${nombreUsuario} <!-- Cambiado de RolBoton a nombreUsuario -->
                </button>
                <div class="dropdown-menu">
                    <a class="dropdown-item" href="Administracion.html">Administracion</a>
                    <a class="dropdown-item" href="GestionC.html">Gestor de citas</a>
                    ${rolid === "2" || rolid === "3" ? '<a class="dropdown-item" href="Inventario.html">Inventario</a>' : ''}
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
});
