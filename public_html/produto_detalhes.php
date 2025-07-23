<?php
ini_set('display_errors', 0); // Desativa a exibição de erros
error_reporting(E_ALL);       // Mantém o log de todos os erros
// CONFIGURAÇÃO DE CABEÇALHO
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// CONEXÃO COM O BANCO
require_once './dimitri_conexao.php';

// Captura o ID da URL, se existir
$id = $_GET['id_do_produto'] ?? 0;

try {
    if (!isset($pdo)) {
        throw new Exception("Variável de conexão com o banco de dados não está definida.");
    }
    // CONSULTA A TABELA PRODUTOS
    $stmt = $pdo->prepare("SELECT * FROM produtos WHERE id_do_produto = ?");
    $stmt->execute([$id]);

    // Retorna apenas um produto
    $produto_detalhes = $stmt->fetch(PDO::FETCH_ASSOC);

     // Retorno de sucesso em JSON
    echo json_encode([
        "status" => "sucesso",
        "dados" => $produto_detalhes
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