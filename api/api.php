<?php

session_start();

error_reporting(0);

$servername = "localhost";
$username = "root";
$password = "";

$pdo = new PDO("mysql:host=$servername;dbname=assassins", $username, $password);

$data = json_decode(file_get_contents('php://input'), true);

$action = $data['action'];

if ($action == NULL) {
	$action = $_POST['action'];
}

switch($action) {
	case 'signup': signup($pdo); break;
	case 'signin': signin($data, $pdo); break;
	case 'signout': signout(); break;
	case 'getTargetData': getTargetData($pdo); break;
	case 'saveMessage': saveMessage($data, $pdo); break;
}

function signup($pdo) {
	$targetDir = $_SERVER['DOCUMENT_ROOT'] . "/images/";
	$targetFile = $targetDir . basename($_FILES["image"]["name"]);
	$uploadOk = 1;
	$imageFileType = pathinfo($targetFile,PATHINFO_EXTENSION);
	
	// Check if image file is a actual image or fake image
	if(isset($_POST["submit"])) {
		$check = getimagesize($_FILES["image"]["tmp_name"]);
		if($check !== false) {
			$uploadOk = 1;
		} else {
			$uploadOk = 0;
		}
	}
	
	if ($uploadOk == 0) {
	} else {
		move_uploaded_file($_FILES["image"]["tmp_name"], $targetFile);
	}
	
	$query = "
		INSERT INTO users
		(
		  email,
		  password,
		  name,
		  nickname,
		  imageURL,
		  routines,
		  inGame
		)
		VALUES
		(
		  ?,?,?,?,?,?,?
		);";	
				
	$params = [];
	$params[] = $_POST['email'];
	$params[] = password_hash($_POST['password'], PASSWORD_DEFAULT);
	$params[] = $_POST['name'];
	$params[] = $_POST['nickname'];
	$params[] = "images/" . $_FILES["image"]["name"];
	$params[] = $_POST['routines'];
	$params[] = 0;
				
	$stm = $pdo->prepare($query);
	$stm->execute($params);
	
	
	if ($uploadOk == 1 && isset($_FILES["image"])) {
		echo json_encode(['msg' => 'signup success']);
	} else {
		echo json_encode(['msg' => 'signup fail']);
	}
}

function signin($data, $pdo) {
	$stm = $pdo->prepare('SELECT * FROM users WHERE email = ?');
	$stm->execute(array($data['email']));
	
	$user = $stm->fetch(\PDO::FETCH_ASSOC);
	
	if (password_verify($data['password'], $user['password'])) {
		$_SESSION['user'] = $user;
		echo json_encode(['msg' => 'logged in']);
	} else {
		echo json_encode(['msg' => 'invalid email or password']);
	}
}

function signout() {
	session_destroy();
	echo json_encode(['msg' => 'logged out']);
}

function getTargetData($pdo) {
	if (!isset($_SESSION['user'])) {
		echo json_encode(['msg' => 'idiot']);
	}
	
	$stm = $pdo->prepare('SELECT * FROM users WHERE id = ?');
	$stm->execute(array($_SESSION['user']['target_id']));
	
	$user = $stm->fetch(\PDO::FETCH_ASSOC);
	
	if(!$user) {
		echo json_encode(['msg' => 'no target']);
	} else {
		echo json_encode($user);
	}
}

function saveMessage($data, $pdo) {
	if (!isset($_SESSION['user'])) {
		echo json_encode(['msg' => 'idiot']);
	}
	
	$query = "
		INSERT INTO messages
		(
		  user_id,
		  header,
		  msg_body
		)
		VALUES
		(
		  ?,?,?
		);";	
				
	$params = [];
	$params[] = $_SESSION['user']['id'];
	$params[] = $data['msg']['header'];
	$params[] = $data['msg']['body'];
	
	$stm = $pdo->prepare($query);
	$stm->execute($params);
	
	echo json_encode(['msg' => 'message saved']);
}