<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

$data = json_decode(file_get_contents("php://input"), true);

// Verificar se o data ou o cep vieram
if (!$data || !isset($data["cep"])) {
    echo json_encode(["status" => "error", "message" => "Dados inválidos."]);
    exit; 
}

$cep = $data["cep"];
$file = "../data/ceps.json";

$json = json_decode(file_get_contents($file), true);

// Verificar duplicidade
foreach ($json as $item) {
    if ($item["cep"] === $cep) {
        echo json_encode([
            "status" => "error",
            "message" => "Este CEP já está cadastrado."
        ]);
        exit;
    }
}

// Adiciona o data para json
$json[] = $data;

// Salva sem sobrescrever
file_put_contents($file, json_encode($json, JSON_PRETTY_PRINT));

echo json_encode(["status" => "success"]);
