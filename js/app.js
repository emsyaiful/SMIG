var app = angular.module('inplant', []);

app.controller('dashboard', function($scope,$location) {
	$scope.pabrikSemen=[];
	$scope.pabrikSilo=[];
	initPabrikSemen();
	initPabrikSilo();
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

	var g = new JustGage({
		id: "gaugeKargo",
		value: 40,
		min: 0,
		max: 100,
		title: "Average Cargo",
		label: "Minute"
	}) 

	var g = new JustGage({
		id: "gaugeCycle",
		value: 40,
		min: 0,
		max: 100,
		title: "Average Cylce Time",
		label: "Minute"
	})

	angular.element(document).ready(function () {
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