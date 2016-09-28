<?php
    session_start();

    if ($_FILES["dispic"]["error"] > 0) {
        echo "<p>Error: " . $_FILES["dispic"]["error"] . "</p>";
    } else {
        $dest_dir = "uploads/";
        $dest     = $dest_dir . basename($_FILES["dispic"]["name"]);
        $src      = $_FILES["dispic"]["tmp_name"];
        if (move_uploaded_file($src, $dest)) {
            $_SESSION["dispic_url"] = $dest;
            chmod($dest, 0644);
            echo "<p>Successfully uploaded your display picture.</p>";
        }
    }

    $url = "./images/vandycs-logo.png";

    if (isset($_SESSION["dispic_url"])) {
        $url = $_SESSION["dispic_url"];
    }

?>

<html>

    <head>
        <title>VandyCS CTF</title>
    </head>

    <body>
        <center>
            <h1>VandyCS CTF!</h1>
            <div>
                <img height="50%" width="30%" src=<?php echo $url;?> />
                <?php
                    if (!isset($_SESSION["dispic_url"])) {
                        echo "<p>Upload custom image</p>";
                    }
                    ?>
                <form action="" method="post" enctype="multipart/form-data">
                    <input type="file" name="dispic" size="40" />
                    <input type="submit" value="Image upload">
                </form>
                <p>
                    Hidden flag:
                    <a href="flag.txt">flag.txt</a>
                </p>
            </div>
        </center>

    </body>
</html>