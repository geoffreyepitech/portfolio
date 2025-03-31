<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Activer l'affichage des erreurs pour déboguer
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require 'vendor/autoload.php'; // Charge PHPMailer

// Récupérer les données du formulaire
$name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_SPECIAL_CHARS);
$email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
$subject = filter_input(INPUT_POST, 'subject', FILTER_SANITIZE_SPECIAL_CHARS);
$message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_SPECIAL_CHARS);

// Vérifier que les champs ne sont pas vides
if (!$name || !$email || !$subject || !$message) {
    $response = "Tous les champs sont requis.";
} else {
    // Créer une instance de PHPMailer
    $mail = new PHPMailer(true);

    try {
        // Activer le débogage SMTP
        $mail->SMTPDebug = 2; // Niveau de débogage (2 pour des messages détaillés)
        $mail->Debugoutput = 'html'; // Affiche les messages de débogage en HTML

        // Configuration du serveur SMTP (Gmail)
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com'; // Serveur SMTP de Gmail
        $mail->SMTPAuth = true;
        $mail->Username = 'geoffreym.59660@gmail.com'; // Mon adresse Gmail
        $mail->Password = 'dlgt cpzs iann zlcz'; // Mdp app Gmail
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Expéditeur et destinataire
        $mail->setFrom($email, $name);
        $mail->addAddress('geoffreym.59660@gmail.com'); // Mon adresse Gmail pour recevoir les messages

        // Contenu de l'email
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body    = "<h2>Nouveau message de $name</h2><p><strong>Email:</strong> $email</p><p><strong>Message:</strong><br>$message</p>";
        $mail->AltBody = "Nouveau message de $name\nEmail: $email\nMessage:\n$message";

        // Envoyer l'email
        $mail->send();
        $response = 'Message envoyé avec succès !';
    } catch (Exception $e) {
        $response = "Erreur lors de l'envoi du message : {$mail->ErrorInfo}";
    }
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Résultat de l'envoi</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #f7f8f2;
        }
        .message {
            padding: 20px;
            border-radius: 5px;
            background-color: #fff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        .message.success {
            color: green;
        }
        .message.error {
            color: red;
        }
    </style>
</head>
<body>
    <div class="message <?php echo strpos($response, 'succès') !== false ? 'success' : 'error'; ?>">
        <p><?php echo $response; ?></p>
        <a href="index.html">Retour au portfolio</a>
    </div>
</body>
</html>