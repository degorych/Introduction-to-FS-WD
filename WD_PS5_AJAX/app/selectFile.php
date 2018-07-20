<?php
function selectFile($post, $config)
{
    if (isset($post['auth'])) {
        return $config['users'];
    }
    if (isset($post['chat']) || isset($post['getMsg'])) {
        return $config['messages'];
    }
    throw new Exception('File is not selected');
}
