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

    // Preencher os campos
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

formEndereco.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Fazer um objeto com todas as informações
  const body = {
    cep: cepInput.value.trim(),
    logradouro: document.getElementById("logradouro").value,
    bairro: document.getElementById("bairro").value,
    cidade: document.getElementById("cidade").value,
    estado: document.getElementById("estado").value,
    pais: "Brasil"
  };

  const response = await fetch("backend/api.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  const result = await response.json();

  if (result.status === "error") {
    showAlert("danger", result.message);
  } else {
    showAlert("success", "Endereço salvo com sucesso!");
    formEndereco.classList.add("d-none");
    cepInput.value = "";
  }
});
