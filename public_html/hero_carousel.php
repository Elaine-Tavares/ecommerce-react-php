<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
// CONFIGURAÇÃO DE CABEÇALHO
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// CONEXÃO COM O BANCO
require_once './dimitri_conexao.php';

try {
    if (!isset($pdo)) {
        throw new Exception("Variável de conexão com o banco de dados não está definida.");
    }
    // CONSULTA A TABELA BANNERS
    $sql = "SELECT * FROM banners";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $banners = $stmt->fetchAll(PDO::FETCH_ASSOC);

     // Retorno de sucesso em JSON
    echo json_encode([
        "status" => "sucesso",
        "dados" => $banners
    ]);
} catch (PDOException $err) {
    // Erro específico do banco de dados
    http_response_code(500); // Código de erro interno
    echo json_encode([
        "status" => "erro",
        "mensagem" => "Erro no banco de dados.",
        "detalhes" => $err->getMessage()
    ]);
};
?>

