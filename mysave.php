<?php

require_once('functions.php');
try{	
	switch ($_POST['action']){
		case 'load_format':
			load_format();
			break;
		case 'save':
			save();
			break;
		case 'rev_row':
			rev_row();
			break;
		case 'set_color':
			set_color();
			break;
	}
	return true;
}
catch (PDOException $e) {
  print 'Exception : ' . $e->getMessage();
}

function save(){
	$db = getConnection();	
	foreach ($_POST['data'] as $change) {
		$colName= $change[1];
		$oldVal = $change[3];
		$newVal = $change[4];
		$first_column = $change[1]==$_POST['fc']? $oldVal: $change[2];
		$select = $db->prepare('SELECT * FROM ' . DB_TABLE . ' WHERE '. $_POST['fc']. '= :first_column');
		$select->execute(array(':first_column'=>$first_column));
		if ($select->rowCount()==1 && $row = $select->fetch()) {		
			$sql='UPDATE '. DB_TABLE. ' SET '. $colName .' = :value WHERE '. $_POST['fc'] . ' = :key';
			$update=$db->prepare($sql);
			$update->execute(array(':value'=>$newVal ,':key'=>$first_column));
		} 
		else{
			$sql='INSERT INTO '. DB_TABLE . '('. $_POST['fc'] . ') VALUES (:key)';
			$update=$db->prepare($sql);
			$update->execute(array(':key'=>$newVal));
		}
    }
	closeConnection($db);
	return true;
}

function rev_row(){
	$db = getConnection();
	$sql='';
	foreach ($_POST['data'] as $change) {
		$sql.="DELETE FROM ". DB_TABLE . " WHERE " . $_POST['fc'] . " = :key ;";
		$update=$db->prepare($sql);
		$update->execute(array(':key'=>$change));
	}
	closeConnection($db);
	return true;
}

function set_color(){
	$db = getConnection();
	foreach($_POST['data'] as $change){
		if (!isset($change[1])){
			continue;
		}
		$type=$_POST['type']=='background-color'?'background_color':'color';
		$select = $db->prepare('SELECT * FROM ' . DB_FMT_TABLE . ' WHERE row_id = :row_id AND col_name = :col_name AND tbl_name = :tbl_name');
		$select->execute(array(':row_id' => $change[0], ':col_name' => $change[1], ':tbl_name' => DB_TABLE));
		if ($select->rowCount()==1 && $row = $select->fetch()) {
			$sql='UPDATE '. DB_FMT_TABLE . ' SET ' . $type . ' = :color WHERE id= :id';
			$update=$db->prepare($sql);
			$update->execute(array(':color'=>$_POST['color'],':id'=>$row['id']));
		}
		else{
			$sql='INSERT INTO '. DB_FMT_TABLE. ' (tbl_name, row_id, col_name, '. $type . ')';
			$sql.=' VALUES (:tbl_name, :row_id, :col_name, :value)';
			$insert=$db->prepare($sql);
			echo $sql;
			$insert->execute(array(
				':tbl_name'=>DB_TABLE,
				':row_id'=>$change[0],
				':col_name'=>$change[1],
				':value'=>$_POST['color']
			));
		}
	}
	closeConnection($db);
	return true;
}

function load_format(){
	$db = getConnection();
	$select=$db->prepare('SELECT * FROM ' . DB_FMT_TABLE . ' WHERE tbl_name = :tbl_name');
	$select->execute(array(':tbl_name'=>DB_TABLE));
	$row=array('fmts' => $select->fetchAll(PDO::FETCH_ASSOC));
	echo json_encode($row);
}
?>