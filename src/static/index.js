import "./socket-front-index.js";
import { createNewDocumentListing } from "./socket-front-index.js";

const listedDocuments = document.getElementById("lista-documentos");
const newListingForm = document.getElementById("form-adiciona-documento");
const newListingInput = document.getElementById("input-documento");

newListingForm.addEventListener("submit", (e) => {
  e.preventDefault();
  createNewDocumentListing(newListingInput.value);
  newListingInput.value = ""
});

function addDocumentListing(documentName) {
  listedDocuments.innerHTML += `
        <a
          href="document?name=${documentName}"
          class="list-group-item list-group-item-action"
        >
          ${documentName}
        </a>
    `
}

export { addDocumentListing }