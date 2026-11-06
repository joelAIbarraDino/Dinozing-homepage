<?php
// Recibe el formulario y lo reenvía a n8n, para que la URL y el token no lleguen al navegador.
// La configuración se lee de dinozign.env, un nivel arriba de public_html (ver README).
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

function responder(int $codigo): void {
    http_response_code($codigo);
    echo json_encode(['ok' => $codigo === 200]);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') responder(405);

// Solo se aceptan envíos desde el propio sitio
$origen = parse_url($_SERVER['HTTP_ORIGIN'] ?? '', PHP_URL_HOST);
if (!$origen || $origen !== parse_url('//' . ($_SERVER['HTTP_HOST'] ?? ''), PHP_URL_HOST)) responder(403);

$crudo = file_get_contents('php://input', false, null, 0, 20001);
$datos = json_decode($crudo === false || strlen($crudo) > 20000 ? '' : $crudo, true);
if (!is_array($datos)) responder(400);

// El campo trampa solo lo llenan los bots: se finge éxito y no se reenvía nada
if (!empty($datos['sitio'])) responder(200);

$limites = ['name' => 200, 'email' => 254, 'whatsapp' => 40, 'description' => 5000, 'details' => 5000];
$envio = [];
foreach ($limites as $campo => $maximo) {
    $valor = is_string($datos[$campo] ?? null) ? trim($datos[$campo]) : '';
    if (mb_strlen($valor) > $maximo) responder(400);
    $envio[$campo] = $valor;
}
if ($envio['name'] === '' || $envio['whatsapp'] === '' || $envio['description'] === ''
    || !filter_var($envio['email'], FILTER_VALIDATE_EMAIL)) {
    responder(400);
}

$config = @parse_ini_file(dirname(__DIR__, 2) . '/dinozign.env', false, INI_SCANNER_RAW);
if (empty($config['N8N_WEBHOOK_URL']) || empty($config['N8N_WEBHOOK_TOKEN'])) {
    error_log('contacto.php: falta dinozign.env o alguna de sus variables');
    responder(500);
}

$curl = curl_init($config['N8N_WEBHOOK_URL']);
curl_setopt_array($curl, [
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => json_encode($envio, JSON_UNESCAPED_UNICODE),
    CURLOPT_HTTPHEADER => ['Content-Type: application/json', 'X-Webhook-Token: ' . $config['N8N_WEBHOOK_TOKEN']],
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CONNECTTIMEOUT => 5,
    CURLOPT_TIMEOUT => 15,
]);
curl_exec($curl);
$estado = curl_getinfo($curl, CURLINFO_RESPONSE_CODE);
if ($estado < 200 || $estado >= 300) error_log('contacto.php: n8n respondió ' . $estado . ' ' . curl_error($curl));
responder($estado >= 200 && $estado < 300 ? 200 : 502);
