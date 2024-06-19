<?php
include "./db_config.php";

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"); 
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"); 

if ($_SERVER["REQUEST_METHOD"] == 'GET') {
    $sql = "SELECT siswa.nisn, siswa.nama, siswa.jenis_kelamin, siswa.jurusan_yang_didaftar, soal_tes.hasil FROM soal_tes INNER JOIN siswa ON soal_tes.siswa_nisn = siswa.nisn";
    $query = mysqli_query($con, $sql);

    $results = array(); 

    if ($query) {
        while ($dataUser = $query->fetch_array(MYSQLI_ASSOC)) {
            $results[] = $dataUser; 
        }
    }

    echo json_encode(array("data" => $results)); 
}
?>
