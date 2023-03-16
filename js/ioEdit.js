// Make all the inputs required or not required
export function edit_required_inputs(add_required) {
  let id_input = document.getElementById("id");
  let article_name_input = document.getElementById("article_name");
  let article_body_input = document.getElementById("article_body");

  // Using this with forms allows missing inputs to be notified to user
  if(add_required) {
    id_input.setAttribute("required", "");
    article_name_input.setAttribute("required", "");
    article_body_input.setAttribute("required", "");
  }
  else {
    id_input.removeAttribute("required");
    article_name_input.removeAttribute("required");
    article_body_input.removeAttribute("required");
  }
}

// Print out the object with 4 spaces as tabs
export function write_output(response) {
  let response_output = document.getElementById("response");
  let output_html = "Response:\n\n";
  
  // Pretty prints with 4 spaces as tabs
  output_html += JSON.stringify(response, null, 4);
  
  response_output.innerHTML = output_html;
}