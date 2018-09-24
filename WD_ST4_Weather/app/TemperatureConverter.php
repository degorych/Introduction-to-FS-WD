<?php

class TemperatureConverter
{
    public static function kelvinToCelsius($kelvinDegree)
    {
    	return round($kelvinDegree - 273);
    }

    public static function fahrenheitToCelsius($kelvinDegree)
    {
    	return round(($kelvinDegree - 32) * 5 / 9);
    }
}
