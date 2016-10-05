<html>

<head>
    <title>Name Reflector</title>
</head>

<body>
    <center>
        <h1>Enter your name here!</h1>
        <div>
            <form action="" method="post" enctype="multipart/form-data">
                <input type="text" name="name" placeholder="Name" />
                <input type="submit" value="Show name" />
            </form>
            <?php
                if (isset($_POST["name"])) {
                    passthru("echo " . $_POST["name"]);
                }
                ?>
        </div>
    </center>
</body>

</html>
