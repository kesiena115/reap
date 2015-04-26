<?php

$from = "apps@reap.mit.edu";
$subject = "New REAP application";

$message = "1. Region Name: " . $_POST["app_region_name"];
$message .= "\n\n";

$message .= "2a. Region population size: " . $_POST["app_region_population_size"];
$message .= "\n\n";

$message .= "2b. Clarify the borders: " . $_POST["app_region_borders"];
$message .= "\n\n";

$message .= "2c. Top 3 industries: " . $_POST["app_top_industry_1"] . "\n" . $_POST["app_top_industry_2"] . "\n" . $_POST["app_top_industry_3"];
$message .= "\n\n";

$message .= "3. Your Ecosystem: " . $_POST["app_region_challenges_ide"];
$message .= "\n\n";

$message .= "4. Champion info\n";
$message .= "Name: " . $_POST["app_champion_name"] . "\n";
$message .= "Org and Title: " . $_POST["app_champion_organization"] . "\n";
$message .= "Email: " . $_POST["app_champion_email"] . "\n";
$message .= "Phone: " . $_POST["app_champion_phone"] . "\n";
$message .= "Address: " . $_POST["app_champion_address"];
$message .= "\n\n";

$message .= "5. Champion's Role: " . $_POST["app_champion_current_role"];
$message .= "\n\n";

$message .= "6. Vision: " . $_POST["app_why_reap"];
$message .= "\n\n";

$message .= "7. Funding: " . $_POST["app_sponsor_entity"];
$message .= "\n\n";

$message .= "8. Team Plan: " . $_POST["app_team_in_place"];
$message .= "\n\n";

$message .= "9. Team Roster:\n";

$message .= "a. Gov/ec devel\n";
$message .= "Name: " . $_POST["app_govt_name"] . "\n";
$message .= "Org and Title: " . $_POST["app_govt_organization"] . "\n";
$message .= "Role: " . $_POST["app_govt_role"] . "\n";
$message .= "Email: " . $_POST["app_govt_email"] . "\n";
$message .= "Other: " . $_POST["app_govt_other"] . "\n";
$message .= "\n\n";

$message .= "b. Entrepreneur\n";
$message .= "Name: " . $_POST["app_entrepreneur_name"] . "\n";
$message .= "Org and Title: " . $_POST["app_entrepreneur_organization"] . "\n";
$message .= "Role: " . $_POST["app_entrepreneur_role"] . "\n";
$message .= "Email: " . $_POST["app_entrepreneur_email"] . "\n";
$message .= "Other: " . $_POST["app_entrepreneur_other"] . "\n";
$message .= "\n\n";

$message .= "c. Risk Capital Expert\n";
$message .= "Name: " . $_POST["app_risk_name"] . "\n";
$message .= "Org and Title: " . $_POST["app_risk_organization"] . "\n";
$message .= "Role: " . $_POST["app_risk_role"] . "\n";
$message .= "Email: " . $_POST["app_risk_email"] . "\n";
$message .= "Other: " . $_POST["app_risk_other"] . "\n";
$message .= "\n\n";

$message .= "d. Corporate\n";
$message .= "Name: " . $_POST["app_corp_name"] . "\n";
$message .= "Org and Title: " . $_POST["app_corp_organization"] . "\n";
$message .= "Role: " . $_POST["app_corp_role"] . "\n";
$message .= "Email: " . $_POST["app_corp_email"] . "\n";
$message .= "Other: " . $_POST["app_corp_other"] . "\n";
$message .= "\n\n";

$message .= "e. University Rep\n";
$message .= "Name: " . $_POST["app_university_name"] . "\n";
$message .= "Org and Title: " . $_POST["app_university_organization"] . "\n";
$message .= "Role: " . $_POST["app_university_role"] . "\n";
$message .= "Email: " . $_POST["app_university_email"] . "\n";
$message .= "Other: " . $_POST["app_university_other"] . "\n";
$message .= "\n\n";

// message lines should not exceed 70 characters (PHP rule), so wrap it
    $message = wordwrap($message, 70);
    // send mail
    mail("reap@mit.edu",$subject,$message,"From: $from\n");
    echo "Thank you for submitting your application. We will be in touch shortly about its status.";
    echo "\n";
    echo "<a href="/">Back to MIT REAP homepage</a>";

?>
