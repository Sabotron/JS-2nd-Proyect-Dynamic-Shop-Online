let counter = 0;

function consecutive() {
    let new_counter = JSON.parse(localStorage.getItem("consecutive"));
    if (!new_counter) {
        new_counter = 0;
    } else {
        counter = new_counter;
    }
}
/*-------------------------------------------------------------------------*/
function check_info() {

    if (document.getElementById("nombre").value.length >= 3 &&
        document.getElementById("apellido").value.length >= 3 &&
        document.getElementById("address1").value.length >= 3 &&
        document.getElementById("ciudad").value.length >= 3 &&
        document.getElementById("email").value.length >= 3 &&
        document.getElementById("password").value.length >= 3) {
        document.getElementById("btn_registrar").disabled = false;
    } else {
        document.getElementById("btn_registrar").disabled = true;
    }
}

/*-------------------------------------------------------------------------*/

function get_user() {

    counter = counter + 1;
    let registry_db = JSON.parse(localStorage.getItem("registry"));
    if (!registry_db) {
        registry_db = [];
    }
    const new_user = {
        id: counter,
        name: document.getElementById("nombre").value,
        last_name: document.getElementById("apellido").value,
        adr1: document.getElementById("address1").value,
        adr2: document.getElementById("address2").value,
        //const js_pais = js_lista_pais.options[js_lista_pais.selectedIndex].text;
        country: "pending",
        city: document.getElementById("ciudad").value,
        email: document.getElementById("email").value,
        passw: document.getElementById("password").value
    }

    registry_db.push(new_user);
    localStorage.setItem("registry", JSON.stringify(registry_db));
    localStorage.setItem("consecutive", counter);
    alert("Nuevo usuario creado: " +
    new_user.name + " " + new_user.last_name);
    window.location.replace("Login.html");
    clear_input();

}

/*-------------------------------------------------------------------------*/

function clear_input() {

    document.getElementById("btn_registrar").disabled = true;
    document.getElementById("nombre").value = "";
    document.getElementById("apellido").value = "";
    document.getElementById("address1").value = "";
    document.getElementById("address2").value = "";
    document.getElementById("lista_pais").value = "";
    //const js_pais = js_lista_pais.options[js_lista_pais.selectedIndex].text;
    document.getElementById("ciudad").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";

}

/*-------------------------------------------------------------------------*/
consecutive();