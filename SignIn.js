let counter = 0;
let session_id = 0;
let product_id = 0;
let selected_product = 0;
let seller_name = "";
/*-------------------------------------------------------------------------*/
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
function actual_product() {
    let selection = JSON.parse(localStorage.getItem("selected"));
    selected_product = selection;
    //console.log("selection: " + selected_product);
}
/*-------------------------------------------------------------------------*/
function get_seller(id) {
    console.log("el Id es: " + id);
    let registry_db = JSON.parse(localStorage.getItem("registry"));
    for (var i = 0; i < registry_db.length; i++) {
        if (id == registry_db[i].id) {
            seller_name = registry_db[i].name;
            console.log("nombre del vendedor: " + seller_name);
        }
    }
    /*-------------------------------------------------------------------------*/
}
/*-------------------------------------------------------------------------*/
function log_out() {
    localStorage.setItem("session_id", 0);
    window.location.replace("Login.html");
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
    window.location.href = "Login.html";
}
/*-------------------------------------------------------------------------*/
function check_user() {
    let registry_db = JSON.parse(localStorage.getItem("registry"));
    if (registry_db) {
        var user_email = document.getElementById("email").value;
        var user_passwd = document.getElementById("password").value;
        for (var i = 0; i < registry_db.length; i++) {
            if (registry_db[i].email == user_email
                && registry_db[i].passw == user_passwd) {
                let user_id = registry_db[i].id;
                localStorage.setItem("session_id", user_id);
                window.location.href = "Dashboard.html";
                break;
            }
        }
        clear_login();
    } else {
        auxiliar_catch();
    }
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
        img: document.getElementById("img_url").value,
        interest: document.getElementById("interes").value
    }
    inventory_db.push(new_product);
    localStorage.setItem("inventory", JSON.stringify(inventory_db));
    localStorage.setItem("lastest_product", product_id);
    alert("Nuevo producto creado: " +
        new_product.product + " de tipo " + new_product.category);
    window.location.href = "Dashboard.html";
}
/*-------------------------------------------------------------------------*/

/*-------------------------------------------------------------------------*/
function check_product() {
    let stock_db = JSON.parse(localStorage.getItem("inventory"));
    //console.log(stock_db);
    actual_session();
    if (stock_db) {
        for (var i = 0; i < stock_db.length; i++) {
            if (session_id == stock_db[i].user_id) {
                let div_product = document.createElement("div");
                let img_product = document.createElement("img");
                let p_product = document.createElement("p");
                let div_info = document.createElement("div");
                let inp_edit = document.createElement("input");
                let br_line = document.createElement("br");
                let inp_delete = document.createElement("input");
                div_product.setAttribute("class", "product");
                img_product.setAttribute("class", "thumbnail");
                img_product.setAttribute("onclick", "run_product(" + stock_db[i].id + ")");
                inp_edit.setAttribute("type", "button");
                inp_edit.setAttribute("class", "btn_editar");
                inp_edit.setAttribute("value", "Editar");
                inp_edit.setAttribute("onclick", "run_edit(" + stock_db[i].id + ")");
                inp_delete.setAttribute("type", "button");
                inp_delete.setAttribute("class", "btn_eliminar");
                inp_delete.setAttribute("value", "Eliminar");
                inp_delete.setAttribute("onclick", "run_delete(" + stock_db[i].id + ")");
                p_product.innerHTML = stock_db[i].product;
                img_product.src = stock_db[i].img;
                div_product.appendChild(img_product);
                div_info.appendChild(p_product);
                div_info.appendChild(inp_edit);
                div_info.appendChild(br_line);
                div_info.appendChild(inp_delete);
                document.getElementById("stock_product").appendChild(div_product);
                document.getElementById("stock_product").appendChild(div_info);
            }
        }
    }
}
/*-------------------------------------------------------------------------*/
function public_products() {
    let stock_db = JSON.parse(localStorage.getItem("inventory"));
    if (stock_db) {
        for (var i = 0; i < stock_db.length; i++) {
            let div_product = document.createElement("div");
            let img_product = document.createElement("img");
            let p_product = document.createElement("p");
            let p_seller = document.createElement("p");
            let div_info = document.createElement("div");
            let br_line = document.createElement("br");
            div_product.setAttribute("class", "product");
            img_product.setAttribute("class", "thumbnail");
            img_product.setAttribute("onclick", "run_product(" + stock_db[i].id + ")");
            p_product.innerHTML = "Producto: " + stock_db[i].product;
            p_seller.innerHTML = "Vendedor: " + stock_db[i].user_id;
            img_product.src = stock_db[i].img;
            div_info.appendChild(p_product);
            div_info.appendChild(br_line);
            div_info.appendChild(p_seller);
            div_product.appendChild(img_product);
            div_product.appendChild(div_info);
            document.getElementById("mini_product").appendChild(div_product);
        }
    }
}
/*-------------------------------------------------------------------------*/

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
        document.getElementById("img_url").value.length >= 3 &&
        document.getElementById("interes").value.length >= 3 &&
        document.getElementById("interes").value.length <= 300) {
        document.getElementById("btn_guardar").disabled = false;
    } else {
        document.getElementById("btn_guardar").disabled = true;
    }
}
/*-------------------------------------------------------------------------*/
function run_product(id) {
    localStorage.setItem("selected", id);
    window.location.href = "Product.html";
    //console.log(selected_product);
}
/*-------------------------------------------------------------------------*/
function show_product() {
    actual_product();
    //console.log("after function 'show_product': " + selected_product);
    let stock_db = JSON.parse(localStorage.getItem("inventory"));
    //console.log("after calling inventory: " + selected_product);
    if (stock_db) {
        for (var i = 0; i < stock_db.length; i++) {
            if (selected_product == stock_db[i].id) {
                get_seller(stock_db[i].id);
                let img_product = document.createElement("img");
                img_product.setAttribute("class", "big_img");
                img_product.src = stock_db[i].img;
                document.getElementById("big").appendChild(img_product);
                document.getElementById("name").innerHTML = stock_db[i].product;
                document.getElementById("vendedor").innerHTML = "Vendedor: " + seller_name;
                document.getElementById("descripcion").innerHTML = stock_db[i].description;
                document.getElementById("interes").innerHTML = stock_db[i].interest;
            }
        }
    }
}
/*-------------------------------------------------------------------------*/
function run_edit(id) {
  //  console.log(id);
}
/*-------------------------------------------------------------------------*/
function run_delete(id) {
   // console.log(id);
}
/*-------------------------------------------------------------------------*/
function auxiliar_catch() {
    alert("Ningun usuario se encuentra registrado!");
    clear_login();
}
/*-------------------------------------------------------------------------*/
function clear_login() {
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
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