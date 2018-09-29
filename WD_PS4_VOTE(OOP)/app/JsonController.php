<?php

include_once 'Json.php';

class JsonController
{
    private $config;
    private $existFile;
    private $permissionError;
    private $json;

    public function __construct($config)
    {
        $this->config = $config;
        $this->existFile = $this->existFile();
        $this->permissionError = $this->permissionError();
        $this->json = new Json($this->config);
    }

    private function existFile()
    {
        return file_exists($this->config['jsonPath']);
    }

    private function permissionError()
    {
        if (!is_writable($this->config['jsonPath'])) {
            return 'File is not writable';
        }

        if (!is_readable($this->config['jsonPath'])) {
            return 'File is not readable';
        }

        return false;
    }

    public function run($data)
    {
        if (!$this->existFile){
            if (!$this->json->createFile()) {
                return 'Can not create file';
            } else {
                return true;
            }
        }

        if ($this->permissionError) {
            return $this->permissionError;
        }

        if ($data && !$this->json->updateContent($data)) {
            return 'Can not update file';
        }

        return true;
    }

    public function sendJsonContent()
    {
        return $this->json->getJsonContent();
    }

    public function view($requestMethod, $hasError)
    {
        $redirectTo = ($requestMethod === 'POST' && !$hasError) ? $this->config['result'] : $this->config['main'];
        header('Location: ' . $redirectTo);
    }
}
