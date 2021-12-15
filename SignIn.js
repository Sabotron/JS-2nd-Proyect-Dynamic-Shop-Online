// Variables globales para control del localStorage.
let counter = 0; // Codigo de usuario.
let session_id = 0; // Almacena el id de usuario logueado.
let product_id = 0; // Codigo de producto.
let selected_product = 0; // Guarda el id del producto para consultarlo.
let seller_name = ""; // Toma el nombre del Vendedor de "x" producto. 
/*-------------------------------------------------------------------------*/
/*
    Revisa el último código de usuario guardado en memoria 
    y actualiza el contador.
*/ 
function consecutive() {
    let new_counter = JSON.parse(localStorage.getItem("consecutive"));
    if (!new_counter) {
        new_counter = 0;
    } else {
        counter = new_counter;
    }
}
/*-------------------------------------------------------------------------*/
/*
    Mantiene actualizado el id del usuario logueado, para ingresar 
    el id correspondiente en los productos creados, también en su dashboard.
*/ 
function actual_session() {
    let session = JSON.parse(localStorage.getItem("session_id"));
    session_id = session;
}
/*-------------------------------------------------------------------------*/
/*
    Obtiene el id del producto consultado, guardado antes de cambiar a la página con detalles
*/ 
function actual_product() {
    let selection = JSON.parse(localStorage.getItem("selected"));
    selected_product = selection;
}
/*-------------------------------------------------------------------------*/
/*
    Busca el nombre del vendedor por medio del Id y lo guarda en la variable global.
*/ 
function get_seller(id) {
    let registry_db = JSON.parse(localStorage.getItem("registry"));
    for (var i = 0; i < registry_db.length; i++) {
        if (id == registry_db[i].id) {
            seller_name = registry_db[i].name;
            console.log("nombre del vendedor: " + seller_name);
        }
    }
}
/*-------------------------------------------------------------------------*/
/*
    Función optimizada que obtiene el nombre del vendedor sin usar variable global.
*/ 
function name_seller(id) {
    let registry_db = JSON.parse(localStorage.getItem("registry"));
    for (var i = 0; i < registry_db.length; i++) {
        if (id == registry_db[i].id) {
            return registry_db[i].name + " " + registry_db[i].last_name;
        }
    }
}
/*-------------------------------------------------------------------------*/
/*
    Se llama desde los html al cerrar sesión, torna el id del usuario actual a "0".
*/ 
function log_out() {
    localStorage.setItem("session_id", 0);
    window.location.replace("Login.html");
}
/*-------------------------------------------------------------------------*/
/*
    Obtiene el código del último producto creado.
*/ 
function last_product() {
    let product = JSON.parse(localStorage.getItem("lastest_product"));
    if (!product) {
        product = 0;
    } else {
        product_id = product;
    }
}
/*-------------------------------------------------------------------------*/
/*
    Crea la estructura del JSON para agregar un nuevo usuario 
    después de pasar por las validaciones requeridas.
*/ 
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
        // una API puede desplegar un listado completo de países, (no aplica en la evaluación)       
        city: document.getElementById("ciudad").value,
        email: document.getElementById("email").value,
        passw: document.getElementById("password").value
    }
    registry_db.push(new_user);
    localStorage.setItem("registry", JSON.stringify(registry_db));
    localStorage.setItem("consecutive", counter);
    // Mensaje de creación exitosa.
    alert("Nuevo usuario creado: " +
        new_user.name + " " + new_user.last_name);
    window.location.href = "Login.html";
}
/*-------------------------------------------------------------------------*/
/*
    Valida el correo y contraseña del usuario en el Login, para acceder 
    al dashboard. Caso contrario, se vacían los textfields.
*/ 
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
                // Redirecciona al Dashboard.
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
/*
    Función para crear o editar un producto, una puerta lógica revisa 
    el Id del "producto seleccionado", si es 0; es un producto nuevo.

    Si es mayor que 0; se trata de un producto que debe ser editado.
*/ 
function get_product() {
    last_product(); // acutaliza el Id del último producto creado.
    log(); // función de monitoreo.
    if (selected_product == 0) {
        product_id = product_id + 1; // agrega 1 al contador (nuevo código para producto).
        let inventory_db = JSON.parse(localStorage.getItem("inventory"));
        if (!inventory_db) {
            inventory_db = [];
        }
        actual_session(); // Invoca el Id del usuario logueado en la sesión.
        const new_product = {
            id: product_id, // Id único para cada producto, auque sea serial, es irrepetible.
            user_id: session_id, // Guarda el Id del usuario creador para relacionarlo a él.
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
    } else {
        product_id = selected_product; // "Setea" el código del producto seleccionado
        log();
        let inventory_db = JSON.parse(localStorage.getItem("inventory"))
        for (i = 0; i < inventory_db.length; i++) {
            if (inventory_db[i].id == product_id) {
                inventory_db[i].product = document.getElementById("producto").value;
                inventory_db[i].category = document.getElementById("categoria").value;
                inventory_db[i].description = document.getElementById("descripcion").value;
                inventory_db[i].img = document.getElementById("img_url").value;
                inventory_db[i].interest = document.getElementById("interes").value;
                break;
            }
        }
        localStorage.setItem("inventory", JSON.stringify(inventory_db));
        alert("Se ha editado el producto!");
        window.location.href = "Dashboard.html";
    }
}
/*-------------------------------------------------------------------------*/
/*
    Monitoreo interno durante el desarrollo de varias funciones
*/ 
function log() {
    console.log(
        "sesion = " + session_id +
        " product_id = " + product_id +
        " selected_product = " + selected_product +
        " seller_name= " + seller_name
    )
}
/*-------------------------------------------------------------------------*/
/*
    Se invoca al ingresar al dashboard, "checkea" si existen productos creados 
    por el usuario,
*/ 
function check_product() {
    let stock_db = JSON.parse(localStorage.getItem("inventory"));
    localStorage.setItem("selected", 0); // "Setea" el producto seleccionado a 0.
    actual_session(); // Acutaliza Id de sesión (usa el mismo Id del usuario).
    if (stock_db) {
        for (var i = 0; i < stock_db.length; i++) {
            if (session_id == stock_db[i].user_id) {

                // Elementos prefabricados

                let div_product = document.createElement("div");
                let img_product = document.createElement("img");
                let p_product = document.createElement("p");
                let div_info = document.createElement("div");
                let inp_edit = document.createElement("input");
                let br_line = document.createElement("br");
                let inp_delete = document.createElement("input");

                // Asignación de atributos a los nuevos elementos

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

                // Distribución de contenido a los elementos

                p_product.innerHTML = stock_db[i].product;
                img_product.src = stock_db[i].img;
                div_product.appendChild(img_product);
                div_info.appendChild(p_product);
                div_info.appendChild(inp_edit);
                div_info.appendChild(br_line);
                div_info.appendChild(inp_delete);

                // Inserción de los elementos dentro del DOM

                document.getElementById("stock_product").appendChild(div_product);
                document.getElementById("stock_product").appendChild(div_info);
            }
        }
    }
}
/*-------------------------------------------------------------------------*/
/*
    Función activada desde el html cuando se ingresa a la página "Cambalaches".
    Despliega todos los productos ingresados al sistema, no requiere loguearse.
*/
function public_products() {
    let stock_db = JSON.parse(localStorage.getItem("inventory"));
    if (stock_db) {
        // recorre todos los productos (sin puerta lógica).
        for (var i = 0; i < stock_db.length; i++) { 

            // Prefabrica elementos

            let div_product = document.createElement("div");
            let img_product = document.createElement("img");
            let p_product = document.createElement("p");
            let p_seller = document.createElement("p");
            let div_info = document.createElement("div");
            let br_line = document.createElement("br");

            // Asigna atributos

            div_product.setAttribute("class", "product");
            img_product.setAttribute("class", "thumbnail");
            img_product.setAttribute("onclick", "run_product(" + stock_db[i].id + ")");

            // Distribuye valores

            p_product.innerHTML = "Producto: " + stock_db[i].product;
            p_seller.innerHTML = "Vendedor: " + name_seller(stock_db[i].user_id);
            //p_seller.innerHTML = "Vendedor: " + stock_db[i].user_id;
            img_product.src = stock_db[i].img;
            div_info.appendChild(p_product);
            div_info.appendChild(br_line);
            div_info.appendChild(p_seller);
            div_product.appendChild(img_product);
            div_product.appendChild(div_info);

            // Inserta en el DOM

            document.getElementById("mini_product").appendChild(div_product);
        }
    }
}
/*-------------------------------------------------------------------------*/
/*
    Realiza las validaciones para ingresar un nuevo usuario.
*/            
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
/*
    Busca que se cumplan los requisitos para agregar un nuevo producto.
*/
function check_description() {
    if (document.getElementById("producto").value.length >= 3 &&
        document.getElementById("producto").value.length <= 200 &&
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
/*
    Se activa al seleccionar la imagen de un producto, 
    guarda su Id en memoria local antes de redirigir a la página con detalles.
*/
function run_product(id) {
    localStorage.setItem("selected", id); 
    window.location.href = "Product.html";
}
/*-------------------------------------------------------------------------*/
/*
    Activada cuando un producto va a ser editado. 
    Su Id queda en memoria para retomarlo después de la edición.
*/
function run_edit(id) {
    localStorage.setItem("selected", id);
    window.location.href = "Gestion.html";
}
/*-------------------------------------------------------------------------*/
/*
    Muestra una imagen grande del producto junto a su descripción y detalles.
    Utiliza el valor guardado en la variable "selected product" como Id de referencia. 
*/
function show_product() {
    actual_product();
    let stock_db = JSON.parse(localStorage.getItem("inventory"));
    if (stock_db) {
        for (var i = 0; i < stock_db.length; i++) {
            if (selected_product == stock_db[i].id) {
                get_seller(stock_db[i].id); // Busca el nombre del vendedor por medio del Id.
                let img_product = document.createElement("img"); // Crea el elemento Imagen.
                img_product.setAttribute("class", "big_img"); // Asigna atributos.
                img_product.src = stock_db[i].img; // La fuente de la imagen.
                document.getElementById("big").appendChild(img_product); // Inserta la imagen en el elemento,

                // Busca los detalles correspondientes al producto y los muestra junto a la imagen.
                document.getElementById("name").innerHTML = stock_db[i].product;
                document.getElementById("vendedor").innerHTML = "Vendedor: " + name_seller(stock_db[i].user_id);
                //document.getElementById("vendedor").innerHTML = "Vendedor: " + seller_name;
                document.getElementById("descripcion").innerHTML = stock_db[i].description;
                document.getElementById("interes").innerHTML = stock_db[i].interest;
            }
        }
    }
}
/*-------------------------------------------------------------------------*/
/*
    Función invocada al ingresar a la página para edición o 
    creación de un producto. Una puerta lógica verifica el valor del Id.
    Si es 0, se trata de un producto nuevo. Si es mayor que 0, se buscarán
    sus detalles para mostrarlos dentro de los textfields y poder editarlos.
*/
function edit(id) {
    actual_product();
    get_category();
    if (selected_product > 0) {
        let stock_db = JSON.parse(localStorage.getItem("inventory"));
        if (stock_db) {
            for (var i = 0; i < stock_db.length; i++) {
                if (stock_db[i].id == selected_product) {
                    document.getElementById("producto").value = stock_db[i].product;
                    document.getElementById("categoria").value = stock_db[i].category;
                    document.getElementById("descripcion").value = stock_db[i].description;
                    document.getElementById("img_url").value = stock_db[i].img;
                    document.getElementById("interes").value = stock_db[i].interest;
                }
            }
        }
    }
}
/*-------------------------------------------------------------------------*/
/*
    Función para recopilar las categorías de todos los productos registrados, 
    luego se cargan en los "select" en las páginas Index y Gestión. 
*/
function get_category() {
    const select = document.getElementById("list_categoria");
    select.innerHTML = "";
    const types = JSON.parse(localStorage.getItem("inventory"));
    if (types) {
        for (var i = 0; i < types.length; i++) {
            // Crea una nueva opción para seleccionar.
            var option = document.createElement("option"); 
            // Le asigna el valor de la categoría almacenada.
            option.textContent = types[i].category;
            // Inserta la opción dentro del select (DOM).
            select.appendChild(option);
        }
    }
}
/*-------------------------------------------------------------------------*/
/*
    Toma el nombre de la categoría seleccionada y lo añade al texfield.
*/
function set_category() {
    var select = document.getElementById("list_categoria");
    var category = select.options[select.selectedIndex].text;
    var inp_category = document.getElementById("categoria");
    inp_category.value = category;
}
/*-------------------------------------------------------------------------*/
/*
    Se activa en la página Index al presionar el botón "Buscar", 
    recorre la lista de inventario en memoria seleccionando los productos 
    que coincidan con la categoría seleccionada.
*/
function search() {
    document.getElementById("result_cat").innerHTML = "";
    var select = document.getElementById("list_categoria");
    var find_cat = select.options[select.selectedIndex].text;
    let stock_db = JSON.parse(localStorage.getItem("inventory"));
    if (stock_db) {
        for (var i = 0; i < stock_db.length; i++) {
            if (stock_db[i].category == find_cat) {

                // Prefabrica los elementos.

                let div_product = document.createElement("div");
                let img_product = document.createElement("img");
                let br_line = document.createElement("br");
                let p_category = document.createElement("p");

                // Asigna los atributos.

                div_product.setAttribute("class", "cat");
                img_product.setAttribute("class", "thumbnail");
                img_product.setAttribute("onclick", "run_product(" + stock_db[i].id + ")");

                // Reparte los datos del contenido.

                p_category.innerHTML = "Categoría: " + stock_db[i].category;
                img_product.src = stock_db[i].img;
                div_product.appendChild(img_product);
                div_product.appendChild(br_line);
                div_product.appendChild(p_category);

                // Iserta en el DOM.

                document.getElementById("result_cat").appendChild(div_product);
            }
        }
    }
}
/*-------------------------------------------------------------------------*/
/*
    Recorre de manera inversa el inventario guardado en memoria.
    Solo toma los 2 últimos elementos añadidos 
    y los muestra en pantalla (Index) 
*/
function last_two_products() {

    let stock_db = JSON.parse(localStorage.getItem("inventory"));
    if (stock_db) {
        for (var i = (stock_db.length-1); i > (stock_db.length-3); i--) {
            
            // Prefabrica elementos

            let div_product = document.createElement("div");
            let img_product = document.createElement("img");
            let br_line = document.createElement("br");
            let p_product = document.createElement("p");
            
            // Asigna atributos
            
            div_product.setAttribute("class", "cat");
            img_product.setAttribute("class", "medium_img");
            img_product.setAttribute("alt", "reciente");
            img_product.setAttribute("onclick", "run_product(" + stock_db[i].id + ")");
            
            // Otorga contenido a los elementos

            p_product.innerHTML = "Producto: " + stock_db[i].product;
            img_product.src = stock_db[i].img;
            div_product.appendChild(img_product);
            div_product.appendChild(br_line);
            div_product.appendChild(p_product);

            // Inserta en el DOM

            document.getElementById("recent_two").appendChild(div_product);
        }
    }
}

/*-------------------------------------------------------------------------*/
/*
    Función de "primer orden" invocada desde el index.
    
    Activa funciones complejas como cargar el buscador de categorías
    y mostrar los dos últimos productos ingresados al sistema.
*/
function run_index() {
    get_category();
    last_two_products();
}
/*-------------------------------------------------------------------------*/
/*
    Busca el Id del producto seleccionado para eliminarlo de la memoria local
*/
function run_delete(id) {

    let stock_db = JSON.parse(localStorage.getItem("inventory"));
    let inventory_mod = [];
    for (i = 0; i < stock_db.length; i++) {
        if (stock_db[i].id != id) {
            inventory_mod.push(stock_db[i]);
        }
    }
    localStorage.setItem("inventory", JSON.stringify(inventory_mod));
    alert("Se ha eliminado el producto");
    window.location.replace("Dashboard.html");
}
/*-------------------------------------------------------------------------*/
/*
    Activa un mensaje cuando no existen usuarios en el sistema al iniciar desde 0. 
*/
function auxiliar_catch() {
    alert("Ningun usuario se encuentra registrado!");
    clear_login();
}
/*-------------------------------------------------------------------------*/
/*
    Limpia los textfields si ingresan datos inválidos en el LogIn
*/
function clear_login() {
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
}
/*-------------------------------------------------------------------------*/
/*
    Asignada a los botones "Cancelar", redirige al Dashboard.
*/
function cancel() {
    window.location.href = "Dashboard.html";
}
/*-------------------------------------------------------------------------*/
/*
    Limpia los textfield en la página para crear usuarios
*/
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
// El código consecutivo para los usuarios se ejecuta de primero.
consecutive();