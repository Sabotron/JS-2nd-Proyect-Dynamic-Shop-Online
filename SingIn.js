let counter = 0;

function consecutive() {
    let new_counter = JSON.parse(localStorage.getItem("consecutive"));
    if (!new_counter) {
        new_counter = 0;
    } else {
        counter = new_counter;
    }
    console.log("valor en counter: ", counter, "valor guardado: ", new_counter);
}

/*-------------------------------------------------------------------------*/
function check_info() {
    const js_nombre = document.getElementById("nombre").value;
    const js_apellido = document.getElementById("apellido").value;
    const js_address1 = document.getElementById("address1").value;
    const js_address2 = document.getElementById("address2").value;
    const js_lista_pais = document.getElementById("lista_pais");
    //const js_pais = js_lista_pais.options[js_lista_pais.selectedIndex].text;
    const js_ciudad = document.getElementById("ciudad").value;
    const js_email = document.getElementById("email").value;
    const js_password = document.getElementById("password").value;
    if (js_nombre.length >= 3 &&
        js_apellido.length >= 3 &&
        js_address1.length >= 3 &&
        js_ciudad.length >= 3 &&
        js_email.length >= 3 &&
        js_password.length >= 3) {

        document.getElementById("btn_registrar").disabled = false;


    } else {
        document.getElementById("btn_registrar").disabled = true;
    }
}

/*-------------------------------------------------------------------------*/

function get_user() {
    const js_nombre = document.getElementById("nombre").value;
    const js_apellido = document.getElementById("apellido").value;
    const js_address1 = document.getElementById("address1").value;
    const js_address2 = document.getElementById("address2").value;
    const js_lista_pais = document.getElementById("lista_pais");
    //const js_pais = js_lista_pais.options[js_lista_pais.selectedIndex].text;
    const js_ciudad = document.getElementById("ciudad").value;
    const js_email = document.getElementById("email").value;
    const js_password = document.getElementById("password").value;

    counter = counter + 1;

    let registry_db = JSON.parse(localStorage.getItem("registry"));
    if (!registry_db) {
        registry_db = [];
    }
    const new_user = {
        id: counter,
        name: js_nombre,
        last_name: js_apellido,
        adr1: js_address1,
        adr2: js_address2,
        country: "pending", 
        city: js_ciudad,
        email: js_email, 
        passw: js_password
    }
    registry_db.push(new_user);
   
    console.log(
        counter + "  " +
        js_nombre + "  " +
        js_apellido + "  " +
        js_address1 + "  " +
        js_address2 + "  " +
        //js_pais + "  " +
        js_ciudad + "  " +
        js_email + "  " +
        js_password + "  "
    );


    localStorage.setItem("registry", JSON.stringify(registry_db));
    localStorage.setItem("consecutive", counter);
    //set_book();
}

/*-------------------------------------------------------------------------*/

function set_user() {
    const id_list = document.getElementById("dynamic_ids");
    const book_list = document.getElementById("dynamic_books");
    const author_list = document.getElementById("dynamic_authors");
    const action_list = document.getElementById("dynamic_actions");
    id_list.innerHTML = "";
    book_list.innerHTML = "";
    author_list.innerHTML = "";
    action_list.innerHTML = "";
    const books = JSON.parse(localStorage.getItem("library"));
    console.log(books);
    if (books) {
        for (var i = 0; i < books.length; i++) {
            var id_li = document.createElement("li");
            var book_li = document.createElement("li");
            var author_li = document.createElement("li");
            var action_li = document.createElement("li");
            id_li.textContent = books[i].Id;
            book_li.textContent = books[i].Name;
            author_li.textContent = books[i].Writer;
            let id = books[i].Id;
            action_li.innerHTML = '<a onclick="edit(' + id + ')" >Edit</a>' + '  |  ' +
                '<a onclick="erase(' + id + ')" >Delete</a>';
            id_list.appendChild(id_li);
            book_list.appendChild(book_li);
            author_list.appendChild(author_li);
            action_list.appendChild(action_li);
        }
    }
    consecutive();
    get_authors();
}
/*-------------------------------------------------------------------------*/

function get_authors() {
    const select = document.getElementById("author_list");
    select.innerHTML = "";
    const books = JSON.parse(localStorage.getItem("library"));
    if (books) {
        for (var i = 0; i < books.length; i++) {
            var option = document.createElement("option");
            option.textContent = books[i].Writer;
            select.appendChild(option);
        }
    }
}
/*-------------------------------------------------------------------------*/
function set_author() {


}
/*-------------------------------------------------------------------------*/

function edit(id) {
    let library_db = JSON.parse(localStorage.getItem("library"));
    var book_id = document.getElementById("book_id");
    var name = document.getElementById("book_mod");
    var author = document.getElementById("author_mod");
    var btn = document.getElementById("btn_edit");
    name.value = "";
    author.value = "";
    for (i = 0; i < library_db.length; i++) {
        if (library_db[i].Id == id) {
            book_id.value = id;
            name.value = library_db[i].Name;
            author.value = library_db[i].Writer;
            btn.disabled = false;
            break;
        } else {
            btn.disabled = true;
        }
    }
}
/*-------------------------------------------------------------------------*/

function edit_book() {
    let library_db = JSON.parse(localStorage.getItem("library"));
    var book_id = document.getElementById("book_id").value;
    var name = document.getElementById("book_mod").value;
    var author = document.getElementById("author_mod").value;
    var btn = document.getElementById("btn_edit");
    for (i = 0; i < library_db.length; i++) {
        if (library_db[i].Id == book_id) {
            library_db[i].Name = name;
            library_db[i].Writer = author;
            btn.disabled = true;
            break;
        }
    }
    localStorage.setItem("library", JSON.stringify(library_db));
    set_book();
}

/*-------------------------------------------------------------------------*/
function erase(id) {
    let library_db = JSON.parse(localStorage.getItem("library"));
    const library_mod = [];
    for (i = 0; i < library_db.length; i++) {
        if (library_db[i].Id != id) {
            library_mod.push(library_db[i]);
        }
    }
    localStorage.setItem("library", JSON.stringify(library_mod));
    set_book();
}
/*-------------------------------------------------------------------------*/
