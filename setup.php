<?php

$values =  $_GET;
$height = $values["height"];
$width = $values["width"];
$on = array();

if ($height == "" or $width == "") {
    echo json_encode("fail");
}
else {
$lights = $height * $width;
if ($lights <= 5) {
    for($h=1; $h < $height+1; $h++) {
        for($w=1; $w < $width+1; $w++) {    
            array_push($on, [$w, $h]);
        }
    }
}
else {
    while (count($on) < 5) {
        $h = rand(1, $height);
        $w = rand(1, $width);
        if (!in_array([$w, $h], $on)) {
            array_push($on, [$w, $h]);
        }
    }
}

array_push($on, [intval($width), intval($height)]);
echo json_encode($on);
}
