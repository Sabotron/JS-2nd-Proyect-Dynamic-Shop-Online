let counter = 0;
let session_id = 0;
let product_id = 0;

function consecutive() {
    let new_counter = JSON.parse(localStorage.getItem("consecutive"));
    if (!new_counter) {
        new_counter = 0;
    } else {
        counter = new_counter;
    }
}
/*-------------------------------------------------------------------------*/
function actual_session() {
    let session = JSON.parse(localStorage.getItem("session_id"));
        session_id = session;
}
/*-------------------------------------------------------------------------*/
function last_product() {
    let product = JSON.parse(localStorage.getItem("lastest_product"));
    if (!product) {
        product = 0;
    } else {
        product_id = product;
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
function check_description() {
    if (document.getElementById("producto").value.length >= 3 &&
        document.getElementById("categoria").value.length >= 3 &&
        document.getElementById("descripcion").value.length >= 3 &&
        document.getElementById("descripcion").value.length <= 300 &&
        document.getElementById("interes").value.length >= 3 &&
        document.getElementById("interes").value.length <= 300) {
        document.getElementById("btn_guardar").disabled = false;
    } else {
        document.getElementById("btn_guardar").disabled = true;
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
    clear_input();
    window.location.href = "Login.html"; 
}
/*-------------------------------------------------------------------------*/
function check_user() {
    let registry_db = JSON.parse(localStorage.getItem("registry"));
    if (registry_db) {
        var user_email = document.getElementById("email").value;
        var user_passwd = document.getElementById("password").value;
        for (i = 0; i < registry_db.length; i++) {
            if (registry_db[i].email == user_email
                && registry_db[i].passw == user_passwd) {
                let user_id = registry_db[i].id;
                localStorage.setItem("session_id", user_id);
                window.location.href = "Dashboard.html";
                clear_login();
                break;
            }
        }
        clear_login();
    } else {
        auxiliar_catch();
    }
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
function get_product() {
    last_product();
    product_id = product_id + 1;
    let inventory_db = JSON.parse(localStorage.getItem("inventory"));
    if (!inventory_db) {
        inventory_db = [];
    }
    actual_session();
    const new_product = {
        id: product_id,
        user_id: session_id,
        product: document.getElementById("producto").value,
        category: document.getElementById("categoria").value,
        description: document.getElementById("descripcion").value,
        interest: document.getElementById("interes").value
    }
    inventory_db.push(new_product);
    localStorage.setItem("inventory", JSON.stringify(inventory_db));
    localStorage.setItem("lastest_product", product_id);
    alert("Nuevo producto creado: " +
    new_product.product + " de tipo " + new_product.category);
    window.location.href = "Dashboard.html";
    //clear_input();
}
/*-------------------------------------------------------------------------*/
function auxiliar_catch() {
    alert("Ningun usuario se encuentra registrado!");
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
}
/*-------------------------------------------------------------------------*/
function clear_login() {
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
}
/*-------------------------------------------------------------------------*/
consecutive();