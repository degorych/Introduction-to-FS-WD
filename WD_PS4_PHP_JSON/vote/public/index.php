<?php
session_start();
unset($_SESSION['isVote']);
?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<link rel="stylesheet" href="css/style.css">
		<title>Vote</title>
	</head>
	<body>
		<div class="container">
			<form action="result.php" method="post">
				<fieldset>
					<legend>Vote variant</legend>
					<label><input type="radio" name="vote-variants" value="first variant" checked/> first variant</label>
					<label><input type="radio" name="vote-variants" value="second variant"/> second variant</label>
					<label><input type="radio" name="vote-variants" value="third variant"/> third variant</label>
					<label><input type="radio" name="vote-variants" value="fourth variant"/> fourth variant</label>
					<input type="submit" value="Vote"/>
				</fieldset>
			</form>
		</div>
	</body>
</html>