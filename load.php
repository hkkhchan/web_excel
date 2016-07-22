<?php
/**
 * This is an example code that shows how you can load Handsontable data from server using PHP with PDO (SQLite).
 * This code is not intended to be maximally efficient nor safe. It is for demonstrational purposes only.
 * Changes and more examples in different languages are welcome.
 *
 * Copyright 2012, Marcin Warpechowski
 * Licensed under the MIT license.
 * http://github.com/handsontable/handsontable/
 */
require_once('functions.php');
try {
  //open the database
  $db = getConnection();
  if(!excelTableExists($db)){
      resetExcelTable($db);
  }
  //select all data from the table
  $result = loadExcel($db);
  $out = array(
    'cells' => $result->fetchAll(PDO::FETCH_ASSOC)
  );
  echo json_encode($out);
  // close the database connection
  closeConnection($db);
}
catch (PDOException $e) {
  print 'Exception : ' . $e->getMessage();
}
?>