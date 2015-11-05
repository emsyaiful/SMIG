var app = angular.module('inplant', []);



app.controller('dashboard', function($scope,$location,$http) {
	$scope.kargo=[];
	$scope.pabrikSemen=[];
	$scope.pabrikSilo=[];
	initPabrikSemen();
	initPabrikSilo();
	initData();

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
		var bag = {}
		bag.nama="bag"
		bag.avg=0
		bag.cnt=0;
		var bulk = {}
		bulk.nama = "bulk"
		bulk.avg=0;
		bulk.cnt=0;
		var gaugeBag = new JustGage({
			id: "gaugeKargoBag",
			value: 0,
			min: 0,
			max: 500,
			title: "Time in cargo",
			label: "minute"
		})
		var gaugeBulk = new JustGage({
			id: "gaugeKargoBulk",
			value: 0,
			min: 0,
			max: 500,
			title: "Time in cargo",
			label: "minute"
		})
		bag.gauge=gaugeBag
		bulk.gauge=gaugeBulk
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
			$scope.kargo.push(bag)
			$scope.kargo.push(bulk)
			
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
				var countcargobulk= document.getElementById("countcargobulk");
				countcargobulk.innerHTML=bulk.cnt;
				var countcargobag= document.getElementById("countcargobag");
				countcargobag.innerHTML=bag.cnt;

			}
			
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
	var shown = true;
        $('#gaugeKargoBag').on("click",function(){
		shown ? $(this).hideBalloon() : $(this).showBalloon();
    		shown = !shown;
	}).showBalloon({
  		minLifetime: 0, showDuration: 0, hideDuration: 0,contents: '<a href="#">Any HTML!</a><br />'
    		+'<input type="text" size="40" />'
    		+'<input type="submit" value="Search" />'
	});

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
		
	}
	function updateCounterPabrik(id,value) {
	  setTimeout(function() { id.innerHTML =value; }, 100);
	}


	
});