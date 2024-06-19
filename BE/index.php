<?php
include "./db_config.php";

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"); 
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"); // Izinkan header yang diizinkan

if ($_SERVER["REQUEST_METHOD"] == 'GET') {
    $myData = array();
    $nisn = $_GET["nisn"];

    $siswa = mysqli_query($con, "SELECT * FROM siswa WHERE nisn='$nisn'");
    $hasil = mysqli_query($con, "SELECT hasil FROM soal_tes WHERE siswa_nisn='$nisn'");

    if ($siswa) {
        while ($dataUser = $siswa->fetch_array(MYSQLI_ASSOC)) {
            while($dataHasil = $hasil->fetch_array(MYSQLI_ASSOC)) {
                echo json_encode(array("siswa" => $dataUser, "hasil" => $dataHasil));
            }
        }
    }
} else if ($_SERVER["REQUEST_METHOD"] == "POST") {
    session_start();

    if ($_POST["status"] == "formDataSiswa") {
        $nisn = $_POST["nisn"];
        $nama = $_POST["nama"];
        $email = $_POST["email"];
        $telepon = $_POST["telepon"];
        $jenis_kelamin = $_POST["jenis_kelamin"];
        $tanggal_lahir = $_POST["tanggal_lahir"];
        $alamat = $_POST["alamat"];
        $jurusan_yang_didaftar = $_POST["jurusan_yang_didaftar"];
        $status_pendaftaran = $_POST["status_pendaftaran"];

        $query = "INSERT INTO siswa (nisn,nama,email,telepon,jenis_kelamin,tanggal_lahir,alamat,jurusan_yang_didaftar, status_pendaftaran) VALUES ('$nisn', '$nama', '$email', '$telepon', '$jenis_kelamin', '$tanggal_lahir', '$alamat', '$jurusan_yang_didaftar', '$status_pendaftaran')";

        
        if (mysqli_query($con, $query)) {
            echo json_encode(array("message" => "Data berhasil dimasukkan"));
        } else {
            echo json_encode(array("message" => "Gagal memasukkan data"));
        }
    }


    if ($_POST["status"] == "unggahDokumen") {
        $foto = $_FILES["foto"]["name"];
        $surat_lulus = $_FILES["suratLulus"]["name"];
        $ijasah = $_FILES["ijasah"]["name"];
        $kartuKeluarga = $_FILES["kartuKeluarga"]["name"];
        $akte = $_FILES["akte"]["name"];
        $nisn = $_POST["nisn"];

        $dir = "image/";
        $tmpFileFoto = $_FILES["foto"]["tmp_name"];
        $tmpFileSuratLulus = $_FILES["suratLulus"]["tmp_name"];
        $tmpFileIjasah = $_FILES["ijasah"]["tmp_name"];
        $tmpFileKartuKeluarga = $_FILES["kartuKeluarga"]["tmp_name"];
        $tmpFileAkte = $_FILES["akte"]["tmp_name"];

        move_uploaded_file($tmpFileFoto, $dir . $foto);
        move_uploaded_file($tmpFileSuratLulus, $dir . $surat_lulus);
        move_uploaded_file($tmpFileIjasah, $dir . $ijasah);
        move_uploaded_file($tmpFileKartuKeluarga, $dir . $kartuKeluarga);
        move_uploaded_file($tmpFileAkte, $dir . $akte);

        $query = "UPDATE siswa SET foto='$foto', surat_lulus='$surat_lulus', ijasah='$ijasah', kartu_keluarga='$kartuKeluarga', akte='$akte' WHERE nisn='$nisn'";

        if (mysqli_query($con, $query)) {
            echo json_encode(array("message" => "Data berhasil dimasukkan"));
        } else {
            echo json_encode(array("message" => "Gagal memasukkan data"));
        }
    }


} else if ($_SERVER["REQUEST_METHOD"] == "PUT") {
    $data = file_get_contents('php://input');
    $input = json_decode($data, true);

    if (isset($input["id"])) {
        // Dapatkan nilai 'id'
        $id = $input["id"];
        $nama = $input["nama"];
        $email = $input["email"];
        $telepon = $input["telepon"];
        $alamat = $input["alamat"];
        $jurusan_didaftar = $input["jurusan_yang_didaftar"];
        $getUserData = mysqli_query($con, "SELECT * FROM siswa WHERE id='$id'");

        if ($getUserData->num_rows > 0) {
            while ($row = mysqli_fetch_array($getUserData)) {
            }

            $query = mysqli_query($con, "UPDATE siswa SET nama='$nama', email='$email', telepon='$telepon',
            alamat='$alamat', jurusan_yang_didaftar='$jurusan_didaftar' WHERE id='$id'");

            if ($query) {
                echo json_encode($query);
            }

        } else {
            echo "Data 'id' tidak ditemukan dalam permintaan.";
        }
    }

} else if ($_SERVER["REQUEST_METHOD"] == "DELETE") {
    $data = file_get_contents('php://input');
    $input = json_decode($data, true);

    if (isset($input["id"])) {
        $id = $input["id"];

        $query = mysqli_query($con, "DELETE FROM siswa WHERE id='$id'");

        if ($query) {
            echo json_encode($query);
        } else {
            echo "gagal menghapus data";
        }

    }
} else {
    echo json_encode(array("message" => "Data yang diperlukan tidak lengkap"));
}

