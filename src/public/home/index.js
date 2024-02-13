import "./indexSocket.js";
import { createNewDocumentListing } from "./indexSocket.js";
import { retrieveCookie, removeCookie } from "../utils/cookies.js";

const tokenJWT = retrieveCookie("jwtToken");

const listedDocuments = document.getElementById("lista-documentos");
const newListingForm = document.getElementById("form-adiciona-documento");
const newListingInput = document.getElementById("input-documento");
const logoutButton = document.getElementById("botao-logout");

logoutButton.addEventListener("click", () => {
  removeCookie("jwtToken");
  alert("User Logged out");
  window.location.href = "/login";
})

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
          id="document-${documentName}"
        >
          ${documentName}
        </a>
    `
};

function removeDocumentListing(documentName) {
  const targetDocument = document.getElementById(`document-${documentName}`);
  listedDocuments.removeChild(targetDocument);
};

export { addDocumentListing, removeDocumentListing }