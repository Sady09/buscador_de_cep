const buscarBtn = document.getElementById("buscar");
const cepInput = document.getElementById("cep");
const formEndereco = document.getElementById("form-endereco");
const loading = document.getElementById("loading");
const alertArea = document.getElementById("alert-area");

function showAlert(type, message) {
  alertArea.innerHTML = `
        <div class="alert alert-${type}">${message}</div>
    `;
}

buscarBtn.addEventListener("click", async () => {
  const cep = cepInput.value.trim();


  // Validação do CEP
  if (cep.length !== 8) {
    showAlert("danger", "O CEP deve conter 8 dígitos.");
    return;
  }

  // Mostrar o loading e ocultar o formulário
  loading.classList.remove("d-none");
  formEndereco.classList.add("d-none");

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();

    loading.classList.add("d-none");

    if (data.erro) {
      showAlert("danger", "CEP não encontrado.");
      return;
    }

    // Preencher campos
    document.getElementById("logradouro").value = data.logradouro || "";
    document.getElementById("bairro").value = data.bairro || "";
    document.getElementById("cidade").value = data.localidade || "";
    document.getElementById("estado").value = data.uf || "";

    formEndereco.classList.remove("d-none");

  } catch (error) {
    showAlert("danger", "Erro ao consultar o CEP.");
    loading.classList.add("d-none");
  }
});
