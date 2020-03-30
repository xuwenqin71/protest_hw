
<?php
    include 'conn.php';
    if(isset($_GET['sid'])){
        $sid = $_GET['sid'];
        $resluct=$conn->query("select * from produce1 where sid=$sid");
        echo json_encode($resluct->fetch_assoc());
    }
?>