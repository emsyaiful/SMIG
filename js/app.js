var app = angular.module('inplant', []);



app.controller('dashboard', function($scope,$location,$http) {
	$scope.kargo={};
	$scope.tMasuk = {};
	$scope.tKeluar={};
	$scope.pabrikSemen=[];
	$scope.pabrikSilo=[];
	initData();
	function initPabrik()
	{
		var pbk1bag={}
		var pbk2bag={}
		var pbk3bag={}
		var pbk4bag={}
		
		var pbk1bulk={}
		var pbk2bulk={}
		var pbk3bulk={}
		var pbk4bulk={}
		
		pbk1bag.no=0;
		pbk2bag.no=1;
		pbk3bag.no=2;
		pbk4bag.no=3;
		
		pbk1bulk.no=0;
		pbk2bulk.no=1;
		pbk3bulk.no=2;
		pbk4bulk.no=3;

		pbk1bag.average=0;
		pbk2bag.average=0;
		pbk3bag.average=0;
		pbk4bag.average=0;
		
		pbk1bag.pack=[];
		pbk2bag.pack=[];
		pbk3bag.pack=[];
		pbk4bag.pack=[];
		
		pbk1bulk.average=0;
		pbk2bulk.average=0;
		pbk3bulk.average=0;
		pbk4bulk.average=0;
		
		pbk1bulk.pack=[];
		pbk2bulk.pack=[];
		pbk3bulk.pack=[];
		pbk4bulk.pack=[];
		
		pbk1bag.jmlAverage=0;
		pbk2bag.jmlAverage=0;
		pbk3bag.jmlAverage=0;
		pbk4bag.jmlAverage=0;
		
		pbk1bulk.jmlAverage=0;
		pbk2bulk.jmlAverage=0;
		pbk3bulk.jmlAverage=0;
		pbk4bulk.jmlAverage=0;

		$scope.pabrikSemen.push(pbk1bag);
		$scope.pabrikSemen.push(pbk2bag);
		$scope.pabrikSemen.push(pbk3bag);
		$scope.pabrikSemen.push(pbk4bag);
		$scope.pabrikSilo.push(pbk1bulk);
		$scope.pabrikSilo.push(pbk2bulk)
		$scope.pabrikSilo.push(pbk3bulk)
		$scope.pabrikSilo.push(pbk4bulk)
		
		angular.element(document).ready(function () {
			for(i=0;i<4;i++)
			{
				var g = new JustGage({
			    		id: "gaugeSemen_"+i,
			    		value: 0,
			    		min: 0,
			    		max: 500,
			    		title: "Average Semen " + i,
			    		label: "Minute"
			  	});
				var gs = new JustGage({
			    		id: "gaugeSilo_"+i,
			    		value: 0,
			    		min: 0,
			    		max: 500,
			    		title: "Average Silo " + i,
			    		label: "Minute"
			  	});

				$scope.pabrikSemen[i].gauge=g;

				$scope.pabrikSilo[i].gauge=gs;
			}
		})
		$http.get("/dev/sd/stmj/scm/fetchdata.php?sel=avgpbrk").success(function(response){
			
			 
			for(i=0;i<response.length;i++)
			{
				if(response[i].PABRIK=="T1")
				{
					if(response[i].MATNR=="121-301")
					{
						pbk1bag.average+=parseFloat(response[i].AVERAGE);
						pbk1bag.jmlAverage++;
					}
					if(response[i].MATNR=="121-302")
					{
						pbk1bulk.average+=parseFloat(response[i].AVERAGE);
						pbk1bulk.jmlAverage++;
					}
				}
				else if(response[i].PABRIK=="T2")
				{
					if(response[i].MATNR=="121-301")
					{
						pbk2bag.average+=parseFloat(response[i].AVERAGE);
						pbk2bag.jmlAverage++;
					}
					if(response[i].MATNR=="121-302")
					{
						pbk2bulk.average+=parseFloat(response[i].AVERAGE);
						pbk2bulk.jmlAverage++;
					}
				}
				else if(response[i].PABRIK=="T3")
				{
					if(response[i].MATNR=="121-301")
					{
						pbk3bag.average+=parseFloat(response[i].AVERAGE);
						pbk3bag.jmlAverage++;
					}
					if(response[i].MATNR=="121-302")
					{
						pbk3bulk.average+=parseFloat(response[i].AVERAGE);
						pbk3bulk.jmlAverage++;
					}
				}
				else if(response[i].PABRIK=="T4")
				{
					if(response[i].MATNR=="121-301")
					{
						pbk4bag.average+=parseFloat(response[i].AVERAGE);
						pbk4bag.jmlAverage++;
					}
					if(response[i].MATNR=="121-302")
					{
						pbk4bulk.average+=parseFloat(response[i].AVERAGE);
						pbk4bulk.jmlAverage++;
					}
				}

			}
			$scope.pabrikSemen[0].average=pbk1bag.average;
			$scope.pabrikSemen[1].average=pbk2bag.average;
			$scope.pabrikSemen[2].average=pbk3bag.average;
			$scope.pabrikSemen[3].average=pbk4bag.average;
			$scope.pabrikSemen[0].jmlAverage=pbk1bag.jmlAverage;
			$scope.pabrikSemen[1].jmlAverage=pbk2bag.jmlAverage;
			$scope.pabrikSemen[2].jmlAverage=pbk3bag.jmlAverage;
			$scope.pabrikSemen[3].jmlAverage=pbk4bag.jmlAverage;

			$scope.pabrikSemen[0].gauge.refresh(pbk1bag.average/pbk1bag.jmlAverage)
			$scope.pabrikSemen[1].gauge.refresh(pbk2bag.average/pbk2bag.jmlAverage)
			$scope.pabrikSemen[2].gauge.refresh(pbk3bag.average/pbk3bag.jmlAverage)
			$scope.pabrikSemen[3].gauge.refresh(pbk4bag.average/pbk4bag.jmlAverage)
			
			$scope.pabrikSilo[0].average=pbk1bulk.average;
			$scope.pabrikSilo[1].average=pbk2bulk.average;
			$scope.pabrikSilo[2].average=pbk3bulk.average;
			$scope.pabrikSilo[3].average=pbk4bulk.average;
			$scope.pabrikSilo[0].jmlAverage=pbk1bulk.jmlAverage;
			$scope.pabrikSilo[1].jmlAverage=pbk2bulk.jmlAverage;
			$scope.pabrikSilo[2].jmlAverage=pbk3bulk.jmlAverage;
			$scope.pabrikSilo[3].jmlAverage=pbk4bulk.jmlAverage;

			$scope.pabrikSilo[0].gauge.refresh(pbk1bulk.average/pbk1bulk.jmlAverage)
			$scope.pabrikSilo[1].gauge.refresh(pbk2bulk.average/pbk2bulk.jmlAverage)
			$scope.pabrikSilo[2].gauge.refresh(pbk3bulk.average/pbk3bulk.jmlAverage)
			$scope.pabrikSilo[3].gauge.refresh(pbk4bulk.average/pbk4bulk.jmlAverage)

			
			
			
			
		});
		$http.get("/dev/sd/stmj/scm/fetchdata.php?sel=cntpbrk").success(function(response){
			
			var pack1bag=[];
			var pack2bag=[];
			var pack3bag=[];
			var pack4bag=[];
			
			var pack1bulk=[];
			var pack2bulk=[];
			var pack3bulk=[];
			var pack4bulk=[];
			
			var pbk1bagno=0;
			var pbk2bagno=0;
			var pbk3bagno=0;
			var pbk4bagno=0;
			var pbk1bulkno=0;
			var pbk2bulkno=0;
			var pbk3bulkno=0;
			var pbk4bulkno=0;
			for(i=0;i<response.length;i++)
			{
			
				if(response[i].PABRIK=="T1")
				{
					if(response[i].MATNR=="121-301")
					{
						var pack={}
						pack.no=pbk1bagno
						pack.type="bag";
						pack.kode=parseInt(response[i].LSTEL);
						pack.jumlah=parseInt(response[i].COUNTER);
						pack1bag.push(pack);
						pbk1bagno++;
						
					}
					if(response[i].MATNR=="121-302")
					{
						var pack={}
						pack.no=pbk1bulkno;
						pack.type="bulk";
						pack.kode=parseInt(response[i].LSTEL);
						pack.jumlah=parseInt(response[i].COUNTER);
						pack1bulk.push(pack);
						pbk1bulkno++;
					}
				}
				if(response[i].PABRIK=="T2")
				{
					if(response[i].MATNR=="121-301")
					{
						var pack={}
						pack.no=pbk2bagno
						pack.type="bag";
						pack.kode=parseInt(response[i].LSTEL);
						pack.jumlah=parseInt(response[i].COUNTER);
						pack2bag.push(pack);
						pbk2bagno++;
						
					}
					if(response[i].MATNR=="121-302")
					{
						var pack={}
						pack.no=pbk2bulkno;
						pack.type="bulk";
						pack.kode=parseInt(response[i].LSTEL);
						pack.jumlah=parseInt(response[i].COUNTER);
						pack2bulk.push(pack);
						pbk2bulkno++;
					}
				}
				if(response[i].PABRIK=="T3")
				{
					if(response[i].MATNR=="121-301")
					{
						var pack={}
						pack.no=pbk3bagno
						pack.type="bag";
						pack.kode=parseInt(response[i].LSTEL);
						pack.jumlah=parseInt(response[i].COUNTER);
						pack3bag.push(pack);
						pbk3bagno++;
						
					}
					if(response[i].MATNR=="121-302")
					{
						var pack={}
						pack.no=pbk3bulkno;
						pack.type="bulk";
						pack.kode=parseInt(response[i].LSTEL);
						pack.jumlah=parseInt(response[i].COUNTER);
						pack3bulk.push(pack);
						pbk3bulkno++;
					}
				}
				if(response[i].PABRIK=="T4")
				{
					if(response[i].MATNR=="121-301")
					{
						var pack={}
						pack.no=pbk4bagno
						pack.type="bag";
						pack.kode=parseInt(response[i].LSTEL);
						pack.jumlah=parseInt(response[i].COUNTER);
						pack4bag.push(pack);
						pbk4bagno++;
						
					}
					if(response[i].MATNR=="121-302")
					{
						var pack={}
						pack.no=pbk4bulkno;
						pack.type="bulk";
						pack.kode=parseInt(response[i].LSTEL);
						pack.jumlah=parseInt(response[i].COUNTER);
						pack4bulk.push(pack);
						pbk4bulkno++;
					}
				}
			}
			$scope.pabrikSemen[0].pack=pack1bag;
			$scope.pabrikSilo[0].pack=pack1bulk;
			$scope.pabrikSemen[1].pack=pack2bag;
			$scope.pabrikSilo[1].pack=pack2bulk;
			$scope.pabrikSemen[2].pack=pack3bag;
			$scope.pabrikSilo[2].pack=pack3bulk;
			$scope.pabrikSemen[3].pack=pack4bag;
			$scope.pabrikSilo[3].pack=pack4bulk;
			angular.element(document).ready(function () {
				for(i=0;i<$scope.pabrikSemen.length;i++)
				for(j=0;j<$scope.pabrikSemen[i].pack.length;j++)
				{
					var id= document.getElementById("pack_"+i+"_"+j);
					var od = new Odometer({
						el:id,
						value:0,
						theme:'car'
					})
					$scope.pabrikSemen[i].pack[j].odomenter=od;
					$scope.pabrikSemen[i].pack[j].odomenter.update($scope.pabrikSemen[i].pack[j].jumlah);
				}
				for(i=0;i<$scope.pabrikSilo.length;i++)
				for(j=0;j<$scope.pabrikSilo[i].pack.length;j++)
				{
					var id= document.getElementById("silo_"+i+"_"+j);
					var od = new Odometer({
						el:id,
						value:0,
						theme:'car'
					})
					$scope.pabrikSilo[i].pack[j].odomenter=od;
					$scope.pabrikSilo[i].pack[j].odomenter.update($scope.pabrikSilo[i].pack[j].jumlah);
				}
			})
			
			console.log($scope.pabrikSemen);
			
			
		});
		
		for(i=0;i<4;i++){
			var pabrik={};
			pabrik.no=i;
			pabrik.average=5+i*10;
			pabrik.pack=[];
			for(j=0;j<8;j++){
				var pack={}
				pack.no=j;
				pack.jumlah=0;
				pabrik.pack.push(pack)
				
			}
			//$scope.pabrikSemen.push(pabrik);

		}
	}
	function initPabrikSemen(){
		for(i=0;i<4;i++){
			var pabrik={};
			pabrik.no=i;
			pabrik.average=5+i*10;
			pabrik.pack=[];
			for(j=0;j<8;j++){
				var pack={}
				pack.no=j;
				pack.jumlah=0;
				pabrik.pack.push(pack)
				
			}
			$scope.pabrikSemen.push(pabrik);

		}
	}

	function initData(){
		initKargo();
		initPabrik();
		initTimbangMasuk();
		initTimbangKeluar();		
	}

	function initKargo()
	{
		var bag = {}
		bag.nama="bag"
		bag.avg=0
		bag.cnt=0;
		var bulk = {}
		bulk.nama = "bulk"
		bulk.avg=0;
		bulk.cnt=0;
		var gaugeKargoBag= new JustGage({
			id: "gaugeKargoBag",
			value: 0,
			min: 0,
			max: 500,
			title: "Time in cargo",
			label: "minute"
		})
		var gaugeKargoBulk= new JustGage({
			id: "gaugeKargoBulk",
			value: 0,
			min: 0,
			max: 500,
			title: "Time in cargo",
			label: "minute"
		})
		bag.gauge=gaugeKargoBag
		bulk.gauge=gaugeKargoBulk
		$http.get("/dev/sd/stmj/scm/fetchdata.php?sel=avgcargo").success(function(response){
			
			var jmlBag=0;
			var jmlBulk=0
			for(i=0;i<response.length;i++)
			{
				if(response[i].TIPE_TRUK>=300 && response[i].TIPE_TRUK<308)
				{
					bag.avg+=parseFloat(response[i].AVERAGE)
					jmlBag++;
					
				}
				else if(response[i].TIPE_TRUK==308)
				{
					bulk.avg+=parseFloat(response[i].AVERAGE)
					jmlBulk++;
				}
			}
			/*Rata-rata waktu tipe truk berdasarkan kode*/
			bag.avg=bag.avg/jmlBag;
			bulk.avg=bulk.avg/jmlBulk;
			
			bag.gauge.refresh(bag.avg);
			
			bulk.gauge.refresh(bulk.avg)
			$scope.kargo.bag=bag
			$scope.kargo.bulk=bulk
			
		});
		$http.get("/dev/sd/stmj/scm/fetchdata.php?sel=cntcargo").success(function(response){
			
			for(i=0;i<response.length;i++)
			{
				if(response[i].TIPE_TRUK>=300 && response[i].TIPE_TRUK<308)
				{
					bag.cnt+=parseInt(response[i].COUNTER);
				}
				else if(response[i].TIPE_TRUK==308)
				{
					bulk.cnt+=parseInt(response[i].COUNTER);
				}

			}
			var countcargobulk= document.getElementById("countcargobulk");
			countcargobulk.innerHTML=bulk.cnt;
			var countcargobag= document.getElementById("countcargobag");
			countcargobag.innerHTML=bag.cnt;
			
		});
	}
	function initTimbangMasuk()
	{
		var bag = {}
		bag.nama="bag"
		bag.avg=0
		bag.cnt=0;
		var bulk = {}
		bulk.nama = "bulk"
		bulk.avg=0;
		bulk.cnt=0;
		var gaugeTimbangBag= new JustGage({
			id: "gaugeTimbangBag",
			value: 0,
			min: 0,
			max: 500,
			title: "Time in Timbang Masuk",
			label: "minute"
		})
		var gaugeTimbangBulk= new JustGage({
			id: "gaugeTimbangBulk",
			value: 0,
			min: 0,
			max: 500,
			title: "Time in Timbang Masuk",
			label: "minute"
		})
		bag.gauge=gaugeTimbangBag
		bulk.gauge=gaugeTimbangBulk
		$http.get("/dev/sd/stmj/scm/fetchdata.php?sel=avgtmbm").success(function(response){
			
			var jmlBag=0;
			var jmlBulk=0
			for(i=0;i<response.length;i++)
			{
				if(response[i].TIPE_TRUK>=300 && response[i].TIPE_TRUK<308)
				{
					bag.avg+=parseFloat(response[i].AVERAGE)
					jmlBag++;
					
				}
				else if(response[i].TIPE_TRUK==308)
				{
					bulk.avg+=parseFloat(response[i].AVERAGE)
					jmlBulk++;
				}
			}
			/*Rata-rata waktu tipe truk berdasarkan kode*/
			bag.avg=bag.avg/jmlBag;
			bulk.avg=bulk.avg/jmlBulk;
			
			bag.gauge.refresh(bag.avg);
			
			bulk.gauge.refresh(bulk.avg)
			$scope.tMasuk.bag=bag
			$scope.tMasuk.bulk=bulk
			
		});
		$http.get("/dev/sd/stmj/scm/fetchdata.php?sel=cnttmbm").success(function(response){
			
			for(i=0;i<response.length;i++)
			{
				if(response[i].TIPE_TRUK>=300 && response[i].TIPE_TRUK<308)
				{
					bag.cnt+=parseInt(response[i].COUNTER);
				}
				else if(response[i].TIPE_TRUK==308)
				{
					bulk.cnt+=parseInt(response[i].COUNTER);
				}

			}
			var countTimbangBag= document.getElementById("countTimbangBag");
			countTimbangBag.innerHTML=bag.cnt;
			
			var countTimbangBulk= document.getElementById("countTimbangBulk");
			countTimbangBulk.innerHTML=bulk.cnt;
			
		});
	}
	
	function initTimbangKeluar()
	{
		var bag = {}
		bag.nama="bag"
		bag.avg=0
		bag.cnt=0;
		var bulk = {}
		bulk.nama = "bulk"
		bulk.avg=0;
		bulk.cnt=0;
		var gaugeCycleBag= new JustGage({
			id: "gaugeCycleBag",
			value: 0,
			min: 0,
			max: 500,
			title: "Time overall",
			label: "minute"
		})
		var gaugeCycleBulk= new JustGage({
			id: "gaugeCycleBulk",
			value: 0,
			min: 0,
			max: 500,
			title: "Time overall",
			label: "minute"
		})
		bag.gauge=gaugeCycleBag
		bulk.gauge=gaugeCycleBulk
		$http.get("/dev/sd/stmj/scm/fetchdata.php?sel=avgtmbk").success(function(response){
			
			var jmlBag=0;
			var jmlBulk=0
			for(i=0;i<response.length;i++)
			{
				if(response[i].TIPE_TRUK>=300 && response[i].TIPE_TRUK<308)
				{
					bag.avg+=parseFloat(response[i].AVERAGE)
					jmlBag++;
					
				}
				else if(response[i].TIPE_TRUK==308)
				{
					bulk.avg+=parseFloat(response[i].AVERAGE)
					jmlBulk++;
				}
			}
			/*Rata-rata waktu tipe truk berdasarkan kode*/
			bag.avg=bag.avg/jmlBag;
			bulk.avg=bulk.avg/jmlBulk;
			
			bag.gauge.refresh(bag.avg);
			
			bulk.gauge.refresh(bulk.avg)
			$scope.tKeluar.bag=bag;
			$scope.tKeluar.bulk=bulk;
			
		});
		$http.get("/dev/sd/stmj/scm/fetchdata.php?sel=cnttmbk").success(function(response){
			
			for(i=0;i<response.length;i++)
			{
				if(response[i].TIPE_TRUK>=300 && response[i].TIPE_TRUK<308)
				{
					bag.cnt+=parseInt(response[i].COUNTER);
				}
				else if(response[i].TIPE_TRUK==308)
				{
					bulk.cnt+=parseInt(response[i].COUNTER);
				}

			}
			var countCycleBulk= document.getElementById("countCycleBulk");
			countCycleBulk.innerHTML=bulk.cnt;
			
			var countCycleBag= document.getElementById("countCycleBag");
			countCycleBag.innerHTML=bag.cnt;
			
			
			
		});
	}	
	
	function updateKargo(){
		
		
		
		$http.get("/dev/sd/stmj/scm/fetchdata.php?sel=avgcargo").success(function(response){
			$scope.kargo.bag.avg=0;
			$scope.kargo.bulk.avg=0;
			var jmlBag=0;
			var jmlBulk=0
			for(i=0;i<response.length;i++)
			{
				if(response[i].TIPE_TRUK>=300 && response[i].TIPE_TRUK<308)
				{
					$scope.kargo.bag.avg+=parseFloat(response[i].AVERAGE)
					jmlBag++;
					
				}
				else if(response[i].TIPE_TRUK==308)
				{
					$scope.kargo.bulk.avg+=parseFloat(response[i].AVERAGE)
					jmlBulk++;
				}
			}
			/*Rata-rata waktu tipe truk berdasarkan kode*/
			$scope.kargo.bag.avg=$scope.kargo.bag.avg/jmlBag;
			$scope.kargo.bulk.avg=$scope.kargo.bulk.avg/jmlBulk;
			
			$scope.kargo.bag.gauge.refresh($scope.kargo.bag.avg);
			$scope.kargo.bulk.gauge.refresh($scope.kargo.bulk.avg);

			console.log($scope.kargo)
			
		});
		$http.get("/dev/sd/stmj/scm/fetchdata.php?sel=cntcargo").success(function(response){
			$scope.kargo.bag.cnt=0;
			$scope.kargo.bulk.cnt=0;
			for(i=0;i<response.length;i++)
			{
				if(response[i].TIPE_TRUK>=300 && response[i].TIPE_TRUK<308)
				{
					$scope.kargo.bag.cnt+=parseInt(response[i].COUNTER);
				}
				else if(response[i].TIPE_TRUK==308)
				{
					$scope.kargo.bulk.cnt+=parseInt(response[i].COUNTER);
				}

			}
			var countcargobulk= document.getElementById("countcargobulk");
			countcargobulk.innerHTML=$scope.kargo.bulk.cnt;
			var countcargobag= document.getElementById("countcargobag");
			countcargobag.innerHTML=$scope.kargo.bag.cnt;
			
		});
	}
	function updateTimbangMasuk(){
		
		
		
		$http.get("/dev/sd/stmj/scm/fetchdata.php?sel=avgtmbm").success(function(response){
			$scope.tMasuk.bag.avg=0;
			$scope.tMasuk.bulk.avg=0;
			var jmlBag=0;
			var jmlBulk=0
			for(i=0;i<response.length;i++)
			{
				if(response[i].TIPE_TRUK>=300 && response[i].TIPE_TRUK<308)
				{
					$scope.tMasuk.bag.avg+=parseFloat(response[i].AVERAGE)
					jmlBag++;
					
				}
				else if(response[i].TIPE_TRUK==308)
				{
					$scope.tMasuk.bulk.avg+=parseFloat(response[i].AVERAGE)
					jmlBulk++;
				}
			}
			/*Rata-rata waktu tipe truk berdasarkan kode*/
			$scope.tMasuk.bag.avg=$scope.tMasuk.bag.avg/jmlBag;
			$scope.tMasuk.bulk.avg=$scope.tMasuk.bulk.avg/jmlBulk;
			
			$scope.tMasuk.bag.gauge.refresh($scope.tMasuk.bag.avg);
			$scope.tMasuk.bulk.gauge.refresh($scope.tMasuk.bulk.avg);
			
		});
		$http.get("/dev/sd/stmj/scm/fetchdata.php?sel=cnttmbm").success(function(response){
			$scope.tMasuk.bag.cnt=0;
			$scope.tMasuk.bulk.cnt=0;
			for(i=0;i<response.length;i++)
			{
				if(response[i].TIPE_TRUK>=300 && response[i].TIPE_TRUK<308)
				{
					$scope.tMasuk.bag.cnt+=parseInt(response[i].COUNTER);
				}
				else if(response[i].TIPE_TRUK==308)
				{
					$scope.tMasuk.bulk.cnt+=parseInt(response[i].COUNTER);
				}

			}
			var countTimbangBag= document.getElementById("countTimbangBag");
			countTimbangBag.innerHTML=$scope.tMasuk.bag.cnt;
			console.log($scope.tMasuk.bag.cnt)
			console.log($scope.tMasuk.bulk.cnt)
			var countTimbangBulk= document.getElementById("countTimbangBulk");
			countTimbangBulk.innerHTML=$scope.tMasuk.bulk.cnt;
			
		});
	}
	function updateTimbangKeluar(){
		
		
		
		$http.get("/dev/sd/stmj/scm/fetchdata.php?sel=avgtmbk").success(function(response){
			$scope.tKeluar.bag.avg=0;
			$scope.tKeluar.bulk.avg=0;
			var jmlBag=0;
			var jmlBulk=0
			for(i=0;i<response.length;i++)
			{
				if(response[i].TIPE_TRUK>=300 && response[i].TIPE_TRUK<308)
				{
					$scope.tKeluar.bag.avg+=parseFloat(response[i].AVERAGE)
					jmlBag++;
					
				}
				else if(response[i].TIPE_TRUK==308)
				{
					$scope.tKeluar.bulk.avg+=parseFloat(response[i].AVERAGE)
					jmlBulk++;
				}
			}
			/*Rata-rata waktu tipe truk berdasarkan kode*/
			$scope.tKeluar.bag.avg=$scope.tKeluar.bag.avg/jmlBag;
			$scope.tKeluar.bulk.avg=$scope.tKeluar.bulk.avg/jmlBulk;
			
			$scope.tMasuk.bag.gauge.refresh($scope.tMasuk.bag.avg);
			$scope.tMasuk.bulk.gauge.refresh($scope.tMasuk.bulk.avg);
			
		});
		$http.get("/dev/sd/stmj/scm/fetchdata.php?sel=cnttmbk").success(function(response){
			$scope.tKeluar.bag.cnt=0;
			$scope.tKeluar.bulk.cnt=0;
			for(i=0;i<response.length;i++)
			{
				if(response[i].TIPE_TRUK>=300 && response[i].TIPE_TRUK<308)
				{
					$scope.tKeluar.bag.cnt+=parseInt(response[i].COUNTER);
				}
				else if(response[i].TIPE_TRUK==308)
				{
					$scope.tKeluar.bulk.cnt+=parseInt(response[i].COUNTER);
				}

			}

			var countCycleBulk= document.getElementById("countCycleBulk");
			countCycleBulk.innerHTML=$scope.tKeluar.bulk.cnt;
			
			var countCycleBag= document.getElementById("countCycleBag");
			countCycleBag.innerHTML=$scope.tKeluar.bag.cnt;
			
			
		});
	}

	function initPabrikSilo(){
		for(i=0;i<4;i++){
			var pabrik={};
			pabrik.no=i;
			pabrik.average=i+10*5;
			pabrik.pack=[];
			for(j=0;j<8;j++){
				var pack={}
				pack.no=j;
				pack.jumlah=0;
				pabrik.pack.push(pack)
				
			}
			$scope.pabrikSilo.push(pabrik);

		}
	}
		
	$scope.start = function(){
		for(i=0;i<$scope.pabrikSemen.length;i++){
			for(j=0;j<$scope.pabrikSemen[i].pack.length;j++)
			{
				var id= document.getElementById("pack_"+i+"_"+j);
				
				updateCounterPabrik(id,200)
			}
		}
		for(i=0;i<$scope.pabrikSilo.length;i++){
			for(j=0;j<$scope.pabrikSilo[i].pack.length;j++)
			{
				var id= document.getElementById("silo_"+i+"_"+j);
				
				updateCounterPabrik(id,100)
			}
		}
		updateKargo();
		updateTimbangMasuk();
		updateTimbangKeluar();
		
	}
	function updateCounterPabrik(id,value) {
	  setTimeout(function() { id.innerHTML =value; }, 100);
	}


	
});