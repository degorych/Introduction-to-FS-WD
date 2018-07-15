<?php
/**
 * @param string $data $_POST['voteName']
 * @param string $file Path to json file
 * @return bool|string
 * @throws Exception
 */
function countVotes($data, $file)
{
    $voteData = json_decode(file_get_contents($file), true);

    if (!isset($voteData[$data])) {
        throw new Exception("$data not found");
    }

    $voteData[$data] += 1;
    if (!file_put_contents($file, json_encode($voteData, JSON_PRETTY_PRINT))) {
        throw new Exception('Error add vote');
    };

    return true;
}
