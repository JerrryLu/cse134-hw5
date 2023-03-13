import {edit_required_inputs, write_output} from './ioEdit.js';

document.addEventListener('DOMContentLoaded', main);

function main() {
  let post_button = document.getElementById("postBtn");
  let get_button = document.getElementById("getBtn");
  let put_button = document.getElementById("putBtn");
  let delete_button = document.getElementById("deleteBtn");

  let post_button_click = () => {
    post_or_put_button_click(true);
  };

  let get_button_click = () => {
    get_or_delete_button_click(true);
  };

  let put_button_click = () => {
    post_or_put_button_click(false);
  };

  let delete_button_click = () => {
    get_or_delete_button_click(false);
  };

  post_button.addEventListener('click', post_button_click);
  get_button.addEventListener('click', get_button_click);
  put_button.addEventListener('click', put_button_click);
  delete_button.addEventListener('click', delete_button_click);
}

async function post_or_put_button_click(post) {
  // Clear the output
  let response_output = document.getElementById("response");
  response_output.innerHTML = "";

  // Gather all the inputs
  edit_required_inputs(true);
  let id_input = document.getElementById("id");
  let article_name_input = document.getElementById("article_name");
  let article_body_input = document.getElementById("article_body");

  // If any of the inputs are empty, browser will ask for missing inputs
  if(id_input.value == "" || article_name_input.value == "" || article_body_input.value == "") {
    return;
  }

  // Set the date
  let date_input = document.getElementById("date");
  date_input.value = new Date();

  // Create POST body
  let input_object = {
    id: id_input.value,
    article_name: article_name_input.value,
    article_body: article_body_input.value,
    date: date_input.value,
  };

  // Clear input values
  edit_required_inputs(false);
  id_input.value = "";
  article_name_input.value = "";
  article_body_input.value = "";
  date_input.value = "";

  let response;
  
  // Set the ipnut object as the body and fetch
  if(post) {
    response = await fetch("https://httpbin.org/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input_object),
    });
  }
  else {
    response = await fetch("https://httpbin.org/put", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input_object),
    });
  }
  response = await response.json();

  write_output(response);
}

async function get_or_delete_button_click(get) {
  // Clear the output
  let response_output = document.getElementById("response");
  response_output.innerHTML = "";

  // Gather all the inputs
  let id_input = document.getElementById("id");
  let article_name_input = document.getElementById("article_name");
  let article_body_input = document.getElementById("article_body");

  
  // If the id is empty, the browser will ask for an id input
  edit_required_inputs(false);
  id_input.setAttribute("required", "");
  if(id_input.value == "") {
    return;
  }

  // Set the date
  let date_input = document.getElementById("date");
  date_input.value = new Date();

  // Set up input object that will be put on the URL
  let input_object = {
    id: id_input.value,
    date: date_input.value,
  };

  // Clear input values
  id_input.removeAttribute("required");
  id_input.value = "";
  article_name_input.value = "";
  article_body_input.value = "";
  date_input.value = "";

  let response;

  // Set up the URL with the parameters in the URL and fetch
  if(get) {
    let get_url = new URL("https://httpbin.org/get");
    get_url.search = new URLSearchParams(input_object);
    response = await fetch(get_url, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  }
  else {
    let delete_url = new URL("https://httpbin.org/delete");
    delete_url.search = new URLSearchParams(input_object);
    response = await fetch(delete_url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  }
  response = await response.json();
  
  write_output(response);
}