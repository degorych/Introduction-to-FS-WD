<?php
function showMsg($msgArray)
{
    if (!empty($msgArray)) :
        foreach ($msgArray as $value) :
            ?>
            <div class='msg'><?= $value ?></div>
        <?php
        endforeach;
    endif;
}
?>
