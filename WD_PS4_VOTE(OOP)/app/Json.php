<?php

class Json
{
    private $config;
    private $content;
    const VOTE_VARIANTS = [
        'first variant',
        'second variant',
        'third variant',
        'fourth variant'
    ];

    public function __construct($config)
    {
        $this->config = $config;
        $this->content = $this->getContent();
    }

    private function getContent()
    {
        return json_decode(@file_get_contents($this->config['jsonPath']), true);
    }

    public function getJsonContent()
    {
        return $this->content;
    }

    public function updateContent($data)
    {
        if ($data && array_key_exists($data, $this->content)) {
            $this->content[$data] += 1;
            return file_put_contents($this->config['jsonPath'], json_encode($this->content, JSON_PRETTY_PRINT));
        }

        return false;
    }

    public function createFile()
    {
        $this->content = [];
        foreach (self::VOTE_VARIANTS as $variant) {
            $this->content[$variant] = 0;
        }

        return file_put_contents($this->config['jsonPath'], json_encode($this->content, JSON_PRETTY_PRINT));
    }
}
