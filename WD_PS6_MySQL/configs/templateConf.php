<?php
define('TEMPLATE_PATH', dirname(__DIR__) . DIRECTORY_SEPARATOR . 'templates' . DIRECTORY_SEPARATOR);
return [
    'auth' => [
        'title' => 'Auth chat',
        'body' => TEMPLATE_PATH . 'authTemplate.php',
        'script' => 'js/auth.js'
    ],
    'chat' => [
        'title' => 'Chat',
        'body' => TEMPLATE_PATH . 'chatTemplate.php',
        'script' => 'js/messages.js'
    ]
];
