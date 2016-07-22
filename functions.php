<?php
require_once 'config/database.ini';
function &getConnection(){
    $db = new PDO('mysql:host='.DB_HOST.';dbname='.DB_NAME, DB_USER , DB_PASS);
    return $db;
}
function closeConnection ($db){
    $db = NULL;
}

function createExcelTable($db){
    $db->exec("CREATE TABLE IF NOT EXISTS ".DB_TABLE. " (id INTEGER PRIMARY KEY, manufacturer TEXT, year INTEGER, price INTEGER)");
	$db->exec("CREATE TABLE IF NOT EXISTS ".DB_FMT_TABLE. " (id INTEGER PRIMARY KEY, tbl_name VARCHAR(45), row_id VARCHAR(45), row_id VARCHAR(45), col_name VARCHAR(45), color VARCHAR(45), background_color VARCHAR(45))");
}

function resetExcelTable($db){
    dropExcelTable($db);
    createExcelTable($db);
}

function dropExcelTable($db){
    $db->exec("DROP TABLE IF EXISTS ".DB_TABLE);
	$db->exec("DROP TABLE IF EXISTS ".DB_FMT_TABLE);
}

function &loadExcel($db){
    $select = $db->prepare('SELECT * FROM '. DB_TABLE);
    $select->execute();
    return $select;
}
function excelTableExists($db){
    $result = $db->prepare('SELECT * FROM '. DB_TABLE);
	$result->execute();
    return $result!=null;
}