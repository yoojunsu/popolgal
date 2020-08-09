<!DOCTYPE html>
<html>	
<head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,minimum-scale=1.0" />
	<title>YJS</title>
	<?php @include "./_include/head-resources.php" ?>
	<!-- Global css -->
	<link href="./src/common.css?<?=time()?>" type="text/css" rel="stylesheet" />
	<link href="./src/default.css?<?=time()?>" type="text/css" rel="stylesheet" />
	<link href="./src/layout-narrow.css?<?=time()?>" media="screen and (max-width: 800px)" type="text/css" rel="stylesheet" />
	<!-- /Global css -->
	<script type="text/javascript" src="/src/common.js?<?=time()?>"></script>
</head>
<body>
<!-- 상단 영역 -->
<div class="header">
<?php @include "./_include/header.php" ?>
</div>
<!-- /상단 영역 -->
<!-- 콘텐츠 영역 -->
<div class="main-wrapper">
	<div class="main">
		<?php
		if (isset($_GET['sub'])) {
			@include "./sub/{$_GET['sub']}.php";
		} else {
			@include "./main.php";
		}
		?>
	</div>
</div>
<!-- /콘텐츠 영역 -->
</body>
</html>