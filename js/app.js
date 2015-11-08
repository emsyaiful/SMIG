var app = angular.module('inplant', []);



app.controller('dashboard', function($scope,$location,$http) {
	$scope.kargo={};
	$scope.tMasuk = {};
	$scope.tKeluar={};
	$scope.pabrikSemen=[];
	$scope.pabrikSilo=[];
	initPabrikSemen();
	initPabrikSilo();
	initData();
	function initPabrik()
	{
		$http.get("/dev/sd/stmj/scm/fetchdata.php?sel=cntpbrk").success(function(response){
			var pbk1bag={}
			var pbk2bag={}
			var pbk3bag={}
			var pbk4bag={}
			pbk1bag.no=1;
			pbk2bag.no=2;
			pbk3bag.no=3;
			pbk4bag.no=4; 
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
	
	angular.element(document).ready(function () {
	// var shown = false;
 //        $('#gaugeKargoBag').on("click",function(){
	// 	shown ? $(this).hideBalloon() : $(this).showBalloon();
 //    		shown = !shown;
	// }).showBalloon({
 //  		minLifetime: 0, showDuration: 0, hideDuration: 0,contents: '<a href="#">Any HTML!</a><br />'
 //    		+'<input type="text" size="40" />'
 //    		+'<input type="submit" value="Search" />'
	// });

	for(i=0;i<$scope.pabrikSemen.length;i++){
        	var g = new JustGage({
			    id: "gaugeSemen_"+i,
			    value: $scope.pabrikSemen[i].average,
			    min: 0,
			    max: 100,
			    title: "Average Semen " + i,
			    label: "Minute"
			  });
        }
        for(i=0;i<$scope.pabrikSilo.length;i++){
        	var g = new JustGage({
			    id: "gaugeSilo_"+i,
			    value: $scope.pabrikSilo[i].average,
			    min: 0,
			    max: 100,
			    title: "Average Silo " + i,
			    label: "Minute"
			  });
        }
        
    });
	
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