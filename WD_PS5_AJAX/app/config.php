<?php
define('SEP', DIRECTORY_SEPARATOR);
define('ROOT_PATH', dirname(__DIR__).SEP);
return [
    'createJson' => __DIR__.SEP.'createJson.php',
    'selectFile' => __DIR__.SEP.'selectFile.php',
    'auth' => __DIR__.SEP.'auth.php',
    'sendMsg' => __DIR__.SEP.'sendMsg.php',
    'getMsg' => __DIR__.SEP.'getMsg.php',
    'msgFunctions' => __DIR__.SEP.'msgFunctions.php',
    'users' => ROOT_PATH.'json'.SEP.'users.json',
    'messages' => ROOT_PATH.'json'.SEP.'messages.json',
    'main' => ROOT_PATH.'patterns'.SEP.'main.php',
    'chat' => ROOT_PATH.'patterns'.SEP.'chat.php',
    'smileStr' => ROOT_PATH.'patterns'.SEP.'smileStr.php'
];
