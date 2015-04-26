<?php

if (isset($_POST["body"]))

{

$from = "contact@reap.mit.edu";
$subject = "REAP web inquiry";

$message = "Name: " . $_POST["first_name"] . $_POST["last_name"] . "\n";
$message .= "Email: " . $_POST["email"] . "\n";
$message .= "Comment: " . $_POST["body"] . "\n";

// message lines should not exceed 70 characters (PHP rule), so wrap it
    $message = wordwrap($message, 70);
    // send mail
    mail("reap@mit.edu",$subject,$message,"From: $from\n");
    echo "Thank you for your message. We will be in touch shortly.";
    echo "\n";
    echo "<a href="/">Back to MIT REAP homepage</a>";

}

?>
