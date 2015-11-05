<?php
	include '../include/oracle.php';
	$dbOra = new database();
	if($_GET['sel']=="avgcargo"){
		$sql = "SELECT round((avg(DATE_CVY - TGL_ANTRI)*24*60),2) average, tipe_truk from ZREPORT_RPT_REAL where (SELECT TO_CHAR (SYSDATE-1, 'DD-MM-YYYY') \"NOW\" FROM DUAL) = TO_CHAR(TGL_SPJ, 'DD-MM-YYYY') and com=7000 and plant=7403 GROUP BY TIPE_TRUK";
		$dbOra->query($sql);
		$aarSql = $dbOra->build_results($sql);
		echo json_encode($aarSql);
	}else if($_GET['sel']=="cntcargo"){
		$sql = "SELECT COUNT(NO_TRANSAKSI) COUNTER,TIPE_TRUK FROM ZREPORT_RPT_REAL_NON70 WHERE STATUS<=40 and STATUS>=10 and com=7000 and plant=7403 GROUP BY TIPE_TRUK";
		$dbOra->query($sql);
		$aarSql = $dbOra->build_results($sql);
		echo json_encode($aarSql);
	}else if($_GET['sel']=="avgtmbm"){
		$sql = "SELECT round((avg(TGL_MASUK - DATE_CVY)*24*60),2) average,tipe_truk from ZREPORT_RPT_REAL where (SELECT TO_CHAR (SYSDATE, 'DD-MM-YYYY') \"NOW\" FROM DUAL) = TO_CHAR(TGL_SPJ, 'DD-MM-YYYY') and com=7000 and plant=7403 GROUP BY TIPE_TRUK union SELECT round((avg(TGL_MASUK - DATE_CVY)*24*60),2) average,tipe_truk from ZREPORT_RPT_REAL_NON70 where (SELECT TO_CHAR (SYSDATE, 'DD-MM-YYYY') \"NOW\" FROM DUAL) = TO_CHAR(TGL_SPJ, 'DD-MM-YYYY') and com=7000 and plant=7403 GROUP BY TIPE_TRUK";
		$dbOra->query($sql);
		$aarSql = $dbOra->build_results($sql);
		echo json_encode($aarSql);
	}else if($_GET['sel']=="cnttmbm"){
		$sql = "SELECT COUNT(NO_TRANSAKSI),TIPE_TRUK FROM ZREPORT_RPT_REAL_NON70 WHERE STATUS=50 GROUP BY TIPE_TRUK";
		$dbOra->query($sql);
		$aarSql = $dbOra->build_results($sql);
		echo json_encode($aarSql);
	}else if($_GET['sel']=="avgpbrk"){
		$sql = "SELECT round((avg(TGL_ISI - TGL_M)*24*60),2) average,tipe_truk from ZREPORT_RPT_REAL where (SELECT TO_CHAR (SYSDATE, 'DD-MM-YYYY') \"NOW\" FROM DUAL) = TO_CHAR(TGL_SPJ, 'DD-MM-YYYY') and com=7000 and plant=7403 GROUP BY TIPE_TRUK";
		$dbOra->query($sql);
		$aarSql = $dbOra->build_results($sql);
		echo json_encode($aarSql);
	}else if($_GET['sel']=="cntpbrk"){
		$sql = "";
		$dbOra->query($sql);
		$aarSql = $dbOra->build_results($sql);
		echo json_encode($aarSql);
	}
	else
		header("Location: /dev/sd/stmj/scm/");
?>