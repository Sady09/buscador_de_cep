# 📦 Sistema de Cadastro de Endereço via CEP

Este projeto é uma aplicação web simples que permite consultar endereços usando a API pública **ViaCEP** e salvar os dados em um arquivo JSON no servidor.  
Desenvolvido com **HTML5, CSS3, Bootstrap, JavaScript e PHP puro**.

---

## 🚀 Como executar o projeto

No terminal, dentro da pasta do projeto, execute:

```
php -S localhost:8000
```

Depois acesse no navegador:

```
http://localhost:8000
```

---

## 📁 Estrutura do Projeto

```
projeto/
├── index.html      → Interface da aplicação
├── script.js       → Lógica de busca do CEP, exibição dos campos e envio via AJAX
├── backend/
│   └── api.php     → Endpoint PHP que salva os dados e verifica duplicidade
└── data/
    └── ceps.json   → Arquivo onde os endereços são armazenados
```

---

## 🧠 Funcionamento

- O usuário digita um CEP na página inicial.
- O arquivo **script.js** consulta a API ViaCEP e preenche os campos automaticamente.
- Após confirmar, os dados são enviados via AJAX para o backend.
- O arquivo **api.php** salva o registro em `data/ceps.json`.
- O sistema impede cadastros duplicados verificando se o CEP já existe.
