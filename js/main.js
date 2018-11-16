Highcharts.setOptions({
    lang: {
        months: ['janvier', 'fevrier', 'mars', 'avril', 'mai', 'juin', 'juillet',
            'aout', 'septembre', 'octobre', 'novembre', 'desembre'],
        weekdays: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi']
    },
    colors: ['#DF5353', '#aaeeee', '#ff0066', '#eeaaee', '#DDDF0D', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee', '#ff0066', '#eeaaee', '#DDDF0D', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee']
});

Highcharts.chart('container', {

		title: {
				text: ''
		},

		subtitle: {
				text: ''
		},


    chart: {
        scrollablePlotArea: {
            minWidth: 700
        },
        type: 'spline',
				style: {
						fontSize: "8px",
						color: (Highcharts.theme && Highcharts.theme.textColor) || "black"
				}
        // zoomType: 'x',
        // panning: true,
        // panKey: 'shift',
				// inverted: true  --> Invert X and Y axis
    },

  	// https://www.highcharts.com/docs/working-with-data/data-module
		// CSV Documentation for Highcharts

		data: {
        csvURL: window.location + 'data/data.csv',
				itemDelimiter: ',',
        lineDelimiter: '\n',
				firstRowAsNames: true,


				 switchRowsAndColumns:true, // INVERTED CSV -> To trasnpose datas if the first row is the X axis
		//		startRow: 0,
		//		endRow: 11,
		//		startColumn: 0,
		//		endColumn: 10,
        enablePolling: false,
				beforeParse: function (csv) {
						return csv.replace(/\n\n/g, '\n');
				},
				parsed: function (row) {
						for (var i = 0; i < row.length ; i++){
							 console.log(row[i][0]);
						 }
				},
				complete: function (options) {
					// We only want to see the first value
					for (var i = 1; i < options.series.length ; i++){
						 options.series[i].visible = false;
					 }

						/* Some Options
								options.chart.renderTo = 'container';
								options.chart.type = 'bar';
								options.series = new Array();
								options.series[0] = new Object();
								options.series[0].name = 'Jane';
								options.series[0].data = new Array(1, 0, 4);
						*/
				}
    },

		// https://www.highcharts.com/docs/chart-concepts/series
		series: [{
					lineWidth: 1,
					marker: {
							radius: 1
					}
			}],

		xAxis: {
			title: {
				 text: ''
		 	},
		 	tickInterval: 1,
      tickWidth: 0,
      gridLineWidth: 1,
      labels: {
          align: 'center',
          x:0,
          y: 20
      }
	 },

	 yAxis: [
			 { // left y axis
	        title: {
	            text: "Perfs"
	        },
	        labels: {
	            align: 'center',
	            x: 3,
	            y: 16,
	            format: '{value:.,0f}'
	        },
	        showFirstLabel: false
		    },
				{ // right y axis
		        linkedTo: 0,
		        gridLineWidth: 0,
		        opposite: true,
		        title: {
		            text: null
		        },
		        labels: {
		            align: 'center',
		            x: -3,
		            y: 16,
		            format: '{value:.,0f}'
		        },
		        showFirstLabel: false
		    }
		],

    legend: {
				enabled: true,
        borderWidth: 0,
				layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
				y: 0,
				itemStyle: {
                color: '#777',
                fontWeight: 'normal',
                fontSize: '12px'
        }
    },

    tooltip: {
        shared: true,
        crosshairs: true,

    },

		responsive: {
			 rules: [{
					 condition: {
							 maxWidth: 500
					 },
					 chartOptions: {
							 legend: {
									 layout: 'horizontal',
									 align: 'center',
									 verticalAlign: 'bottom'
							 }
					 }
			 }]
	 },

    plotOptions: { //		General options
        series: { //		General options for all series
						label:'',
						visible:true,		//		 visible: boolean, // hide a data at first
            cursor: 'pointer',
						pointStart: 2016,
            point: {
                events: {
                    click: function (e) {
                        hs.htmlExpand(null, {
                            pageOrigin: {
                                x: e.pageX || e.clientX,
                                y: e.pageY || e.clientY
                            },
                            headingText: this.series.name,
                            maincontentText: Highcharts.dateFormat('%A, %b %e, %Y', this.x) + ':<br/> ' +
                                this.y + ' sessions',
                            width: 200
                        });
                    }
                }
            },
            marker: {
                lineWidth: 1
            }
        }
    }
});
