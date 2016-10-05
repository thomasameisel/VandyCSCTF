<?php
session_start();

if (isset($_FILES["image"]["name"])) {
    if (exif_imagetype($_FILES["image"]["tmp_name"])) {
        move_uploaded_file($_FILES["image"]["tmp_name"], "images/" . $_FILES["image"]["name"]);
        $_SESSION["image"] = "images/" . $_FILES["image"]["name"];
        $message = "Image uploaded";
    } else {
        $message = "Not image file";
    }
}

$image = "images/vandycs-logo.png";
if (isset($_SESSION["image"])) {
    $image = $_SESSION["image"];
}

?>

<html>

<head>
    <title>VandyCS Image Uploader</title>
</head>

<body>
    <center>
        <h1>VandyCS Image Uploader</h1>
        <img src=<?php echo $image;?> />
        <form action="" method="post" enctype="multipart/form-data">
            <input type="file" name="image"  />
            <input type="submit" value="Upload file" />
        </form>
        <p> <?php echo $message ?> </p>
    </center>
</body>

</html>
