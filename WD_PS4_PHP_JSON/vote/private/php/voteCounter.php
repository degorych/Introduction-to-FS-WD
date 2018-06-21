<?php
$countVotes = function ($data, $file) {
    if (!file_exists($file)) return false; // If createJson don't create file, file can not be created.
    $voteData = json_decode(file_get_contents($file), true);

    if (isset($voteData[$data])) {
        $voteData[$data] += 1;
        if (!file_put_contents($file, json_encode($voteData, JSON_PRETTY_PRINT))) {
            throw new Exception('Can not add vote');
        }
        return true;
    } else {
        return "$data not found";
    }
};
return $countVotes;

