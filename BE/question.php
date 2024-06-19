<?php
include "./db_config.php";

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"); // Izinkan metode HTTP yang diizinkan
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"); // Izinkan header yang diizinkan

if ($_SERVER["REQUEST_METHOD"] == 'GET') {
    $filename = "question.json";
    $json_data = file_get_contents($filename);
    $questions = json_decode($json_data, true);
    echo json_encode($questions);
} else if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nisn = $_POST["nisn"];
    $hasil = $_POST["hasil"];
    $status_pendaftaran = $_POST["status_pendaftaran"];

    $query_soal_tes = mysqli_query($con, "INSERT INTO soal_tes(siswa_nisn, hasil) VALUES ('$nisn', '$hasil')");
    $query_siswa = mysqli_query($con, "UPDATE siswa SET status_pendaftaran='$status_pendaftaran'");

    if ($query_soal_tes && $query_siswa) {
        echo json_encode(array("message" => "Data berhasil dimasukkan"));
    } else {
        echo json_encode(array("message" => "kesalahan berfikir"));
    }
}
