<?php
	include '../include/oracle.php';
	$dbOra = new database();
	$defaultParam = array("7000","7403");
	if($_GET['sel']=="avgcargo"){
		$sql = "SELECT ROUND((avg(DATE_CVY - TGL_ANTRI)*24*60),2) AVERAGE, tipe_truk from ZREPORT_RPT_REAL where (SELECT TO_CHAR (SYSDATE-1, 'DD-MM-YYYY') \"NOW\" FROM DUAL) = TO_CHAR(TGL_SPJ, 'DD-MM-YYYY') AND COM=$defaultParam[0] AND PLANT=$defaultParam[1] GROUP BY TIPE_TRUK";
		$dbOra->query($sql);
		$aarSql = $dbOra->build_results($sql);
		echo json_encode($aarSql);
	}else if($_GET['sel']=="cntcargo"){
		$sql = "SELECT COUNT(NO_TRANSAKSI) COUNTER,TIPE_TRUK FROM ZREPORT_RPT_REAL_NON70 WHERE STATUS<=40 AND STATUS>=10 AND COM=$defaultParam[0] AND PLANT=$defaultParam[1] GROUP BY TIPE_TRUK";
		$dbOra->query($sql);
		$aarSql = $dbOra->build_results($sql);
		echo json_encode($aarSql);
	}else if($_GET['sel']=="avgtmbm"){
		$sql = "SELECT ROUND((avg(TGL_MASUK - DATE_CVY)*24*60),2) AVERAGE,tipe_truk from ZREPORT_RPT_REAL where (SELECT TO_CHAR (SYSDATE, 'DD-MM-YYYY') \"NOW\" FROM DUAL) = TO_CHAR(TGL_SPJ, 'DD-MM-YYYY') AND COM=$defaultParam[0] AND PLANT=$defaultParam[1] GROUP BY TIPE_TRUK union SELECT ROUND((avg(TGL_MASUK - DATE_CVY)*24*60),2) AVERAGE,tipe_truk from ZREPORT_RPT_REAL_NON70 where (SELECT TO_CHAR (SYSDATE, 'DD-MM-YYYY') \"NOW\" FROM DUAL) = TO_CHAR(TGL_SPJ, 'DD-MM-YYYY') AND COM=$defaultParam[0] AND PLANT=$defaultParam[1] GROUP BY TIPE_TRUK";
		$dbOra->query($sql);
		$aarSql = $dbOra->build_results($sql);
		echo json_encode($aarSql);
	}else if($_GET['sel']=="cnttmbm"){
		$sql = "SELECT COUNT(NO_TRANSAKSI) COUNTER,TIPE_TRUK FROM ZREPORT_RPT_REAL_NON70 WHERE STATUS=50 AND COM=$defaultParam[0] AND PLANT=$defaultParam[1] GROUP BY TIPE_TRUK";
		$dbOra->query($sql);
		$aarSql = $dbOra->build_results($sql);
		echo json_encode($aarSql);
	}else if($_GET['sel']=="avgpbrk"){
		$sql = "SELECT PABRIK, MATNR, ROUND((avg(TGL_ISI - TGL_MASUK)*24*60),2) AVERAGE FROM(SELECT PABRIK, SUBSTR(MATNR,1,7) MATNR,TGL_ISI,TGL_MASUK, NO_TRANSAKSI FROM zreport_rpt_real REL JOIN ZREPORT_M_CVY_MAT CVY ON REL.LSTEL = CVY.LINE_BOOMER WHERE COM=$defaultParam[0] AND PLANT=$defaultParam[1] AND PABRIK is not null and (SELECT TO_CHAR (SYSDATE, 'DD-MM-YYYY') \"NOW\" FROM DUAL) = TO_CHAR(TGL_SPJ, 'DD-MM-YYYY')) GROUP BY PABRIK, MATNR";
		$dbOra->query($sql);
		$aarSql = $dbOra->build_results($sql);
		echo json_encode($aarSql);
	}else if($_GET['sel']=="cntpbrk"){
		$sql = "SELECT PABRIK, LSTEL, MATNR, COUNT(NO_TRANSAKSI) COUNTER FROM(SELECT LSTEL, PABRIK, SUBSTR(MATNR,1,7) MATNR, NO_TRANSAKSI FROM ZREPORT_RPT_REAL REL JOIN ZREPORT_M_CVY_MAT CVY ON REL.LSTEL = CVY.LINE_BOOMER WHERE COM=$defaultParam[0] AND PLANT=$defaultParam[1] AND PABRIK IS NOT NULL AND (SELECT TO_CHAR (SYSDATE, 'DD-MM-YYYY') \"NOW\" FROM DUAL) = TO_CHAR(TGL_SPJ, 'DD-MM-YYYY')) GROUP BY PABRIK, LSTEL, MATNR UNION SELECT PABRIK, LSTEL, MATNR, COUNT(NO_TRANSAKSI) COUNTER FROM(SELECT LSTEL, PABRIK, SUBSTR(MATNR,1,7) MATNR, NO_TRANSAKSI FROM ZREPORT_RPT_REAL_NON70 REL JOIN ZREPORT_M_CVY_MAT CVY ON REL.LSTEL = CVY.LINE_BOOMER WHERE COM=$defaultParam[0] AND PLANT=$defaultParam[1] AND PABRIK IS NOT NULL AND STATUS=50) GROUP BY PABRIK, LSTEL, MATNR";
		$dbOra->query($sql);
		$aarSql = $dbOra->build_results($sql);
		echo json_encode($aarSql);
	}else if($_GET['sel']=="avgtmbk"){
		$sql = "SELECT ROUND((avg(TGL_ISI - TGL_ANTRI)*24*60),2) AVERAGE, tipe_truk from ZREPORT_RPT_REAL where (SELECT TO_CHAR (SYSDATE, 'DD-MM-YYYY') \"NOW\" FROM DUAL) = TO_CHAR(TGL_SPJ, 'DD-MM-YYYY') AND COM=$defaultParam[0] AND PLANT=$defaultParam[1] GROUP BY TIPE_TRUK";
		$dbOra->query($sql);
		$aarSql = $dbOra->build_results($sql);
		echo json_encode($aarSql);
	}else if($_GET['sel']=="cnttmbk"){
		$sql = "SELECT COUNT(NO_TRANSAKSI) COUNTER,TIPE_TRUK FROM ZREPORT_RPT_REAL WHERE (SELECT TO_CHAR (SYSDATE, 'DD-MM-YYYY') \"NOW\" FROM DUAL) = TO_CHAR(TGL_SPJ, 'DD-MM-YYYY') AND COM=$defaultParam[0] AND PLANT=$defaultParam[1] GROUP BY TIPE_TRUK";
		$dbOra->query($sql);
		$aarSql = $dbOra->build_results($sql);
		echo json_encode($aarSql);
	}else if($_GET['sel']=="test"){
		$sql = "SELECT LSTEL, PABRIK FROM ZREPORT_RPT_REAL JOIN ZREPORT_M_CVY_MAT ON LSTEL=PABRIK WHERE STATUS=50 AND COM=$defaultParam[0] AND PLANT=$defaultParam[1] AND(ROWNUM <= 10)";
		$dbOra->query($sql);
		$aarSql = $dbOra->build_results($sql);
		echo json_encode($aarSql);
	}
	else
		header("Location: /dev/sd/stmj/scm/");

?>