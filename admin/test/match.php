<?php

$info = 'year_9_2';

//cond_1 => year_ at first
//cond_2 => number format **
//cond_3 => _ (underscore charachter )
//cond_4 => number format **

if (preg_match("/year_/i", $info)) {
    echo "A match was found year_.";
} else {
    echo "A match was not found.";
}

echo '<br >';



if (preg_match("/year_\d_\d/i", $info)) {
    echo "A match was found one one.";
} elseif(preg_match("/year_\d\d_\d\d/i", $info)) {
    echo "A match was  found two two.";
} elseif(preg_match("/year_\d_\d\d/i", $info)){
    echo "A match was  found one two.";

} elseif(preg_match("/year_\d\d_\d/i", $info)){
    echo "A match was  found two one.";

}else{
    echo 'does not found';
}