var stakeholderHighlightPosition = {
    entrepreneur: {
        top: 30,
        left: 160
    },
    university: {
        top: 115,
        left: 57
    },
    riskcapital: {
        top: 115,
        left: 263
    },
    government: {
        top: 205,
        left: 88
    },
    corporate: {
        top: 205,
        left: 232
    }
}

var stakeholderImgPosition = {}

function getStakeholderFromClassnames(classnames) {
    var classes = classnames.split(' ');
    for (var j=0; j<classes.length; j++) {
        if (classes[j].match('^sh\\-')){
            return classes[j].split("sh-")[1];
        }
    }
    return "";
}

function highlightStakeholderInPentacle(stakeholderName) {
    if(!stakeholderName) {
        return;
    }
    var highlightPoint = stakeholderHighlightPosition[stakeholderName];
    if(!highlightPoint) {
        return;
    }
    $("#pentacle-highlight").css('top', highlightPoint.top);
    $("#pentacle-highlight").css('left', highlightPoint.left);
    $("#pentacle-highlight").show();
}

function hideStakeholderHighlight() {
    $("#pentacle-highlight").hide();
}

function setupStakeholderImgPosition(){
    var poffset = $("#pentacle").offset();
    var pleft = poffset.left;
    var ptop = poffset.top;
    var pwidth = $("#pentacle").width();
    var pheight = $("#pentacle").height();
    var horizontalSpan = pwidth/3;
    var verticalSpan = pheight/3;

    console.log(horizontalSpan);
    console.log(verticalSpan);

    stakeholderImgPosition.entrepreneur = {
        top: ptop,
        bottom: ptop + verticalSpan,
        left: pleft + horizontalSpan,
        right: pleft + (2 * horizontalSpan)
    }
    stakeholderImgPosition.university = {
        top: ptop + verticalSpan,
        bottom: ptop + (2 * verticalSpan),
        left: pleft,
        right: pleft + horizontalSpan
    }
    stakeholderImgPosition.riskcapital = {
        top: ptop + verticalSpan,
        bottom: ptop + (2 * verticalSpan),
        left: pleft + (2 * horizontalSpan) ,
        right: pleft + (3 * horizontalSpan)
    }
    stakeholderImgPosition.government = {
        top: ptop + (2 * verticalSpan),
        bottom: ptop + (3 * verticalSpan),
        left: pleft + (horizontalSpan / 12),
        right: pleft + (horizontalSpan / 12) + horizontalSpan
    }
    stakeholderImgPosition.corporate = {
        top: ptop + (2 * verticalSpan),
        bottom: ptop + (3 * verticalSpan),
        left: pleft + (horizontalSpan * 2) - (horizontalSpan / 12),
        right: pleft + (horizontalSpan * 3) - (horizontalSpan / 12)
    }
}

function getStakeholderType(left, top){
    for(var key in stakeholderImgPosition){
        if(stakeholderImgPosition.hasOwnProperty(key)){
            if((stakeholderImgPosition[key].left <= left) && (stakeholderImgPosition[key].right >= left) && 
                (stakeholderImgPosition[key].top <= top) && (stakeholderImgPosition[key].bottom >= top)) {
                return key;
            }
        }
    }
    return "";
}


$(document).ready(function() {
	$('[data-toggle="popover"]').popover(); // Initialize popover (bootstrap requirement) for team members' bio.
    setupStakeholderImgPosition();
    console.log(stakeholderImgPosition);

	$(".dashboard-team-member").mouseenter(function(){
		var stakeholder = getStakeholderFromClassnames($(this).attr('class'));
        highlightStakeholderInPentacle(stakeholder);
	});

	$(".dashboard-team-member").mouseleave(function(){
		hideStakeholderHighlight();
	});


    // ----- Start of pentacle hover -----

    $("#pentacle").mousemove(function(e){
        var stakeholder = getStakeholderType(e.pageX, e.pageY);
        if(stakeholder){
            highlightStakeholderInPentacle(stakeholder);
            $(".dashboard-team-member").removeClass("active");
            $(".sh-" + stakeholder).addClass("active");
        } else {
            hideStakeholderHighlight();
            $(".dashboard-team-member").removeClass("active");
        }
    });


    $("#pentacle-highlight").mouseleave(function(){
        hideStakeholderHighlight();
        $(".dashboard-team-member").removeClass("active");
    });

    // ----- End of pentacle hover -----

	$("#more-reap-index-btn").click(function(){
		$("#more-reap-index-btn").hide();
		$(".more-reap-index-description").show();
	});

	$("#less-reap-index-btn").click(function(){
		$("#more-reap-index-btn").show();
		$(".more-reap-index-description").hide();
	});

	$("#more-region-description-btn").click(function(){
		$("#more-region-description-btn").hide();
		$("#more-region-description").show();
	});

	$("#less-region-description-btn").click(function(){
		$("#more-region-description-btn").show();
		$("#more-region-description").hide();
	});


	$('#chart1').highcharts({
        chart: {
            type: 'column',
            height: 300,
            width: 350
        },
        title: {
            text: 'Broad Industry Indicators',
   //          style: {
			//     fontSize: '24px',
			//     fontWeight: 'bold',
			//     fontFamily: 'whitney_htflight_condensed, sans-serif'
			// }
		},
        subtitle: {
            text: '1991-2014'
        },
        credits: {
        	enabled: false
        },
        xAxis: {
            type: 'category',
            labels: {
                // autoRotation: false,
                rotation: -45,
                formatter: function (){
					return this.value.replace(/ /g, '<br />');
				},
                style: {
                    fontSize: '10px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Percentage (%)'
            },
            gridLineWidth: 0,
        	minorGridLineWidth: 0,
        	lineColor: 'rgb(192, 208, 224)',
        	lineWidth: 1,
        	tickLength: 20
        },
        legend: {
            enabled: false
        },
        tooltip: {
            pointFormat: '<b>{point.y:.2f}%</b>'
        },
        series: [{
            name: 'Percentage',
            data: [
                ['Traded', 22.35],
                ['Local', 77.65],
                ['Traded High Technology', 6.38],
                ['Traded Resource Intensive', 8.49]
            ],
            dataLabels: {
                enabled: true,
                rotation: 0,
                color: '#FFFFFF',
                align: 'center',
                format: '{point.y:.2f}%', // one decimal
                y: 10, // 10 pixels down from the top
                style: {
                    fontSize: '10px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        }],
        navigation: {
            buttonOptions: {
                theme: {
                    'stroke-width': 1,
                    stroke: 'silver',
                    // r: 0,
                    // states: {
                    //     hover: {
                    //         fill: '#bada55',
                    //         color: '#ffffff'
                    //     },
                    //     select: {
                    //         stroke: '#039',
                    //         fill: '#bada55'
                    //     }
                    // }
                }
            }
        }
    });

$('#chart2').highcharts({
        chart: {
            type: 'column',
            height: 300,
            width: 350
        },
        title: {
            text: 'Narrow Industry Indicators'
        },
        subtitle: {
            text: '1991-2014'
        },
        credits: {
        	enabled: false
        },
        xAxis: {
            type: 'category',
            labels: {
                // autoRotation: false,
                rotation: -45,
                formatter: function (){
					return this.value.replace(/ /g, '<br />');
				},
                style: {
                    fontSize: '10px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Percentage (%)'
            },
            gridLineWidth: 0,
        	minorGridLineWidth: 0,
        	lineColor: 'rgb(192, 208, 224)',
        	lineWidth: 1,
        	tickLength: 20
        },
        legend: {
            enabled: false
        },
        tooltip: {
            pointFormat: '<b>{point.y:.2f}%</b>'
        },
        series: [{
            name: 'Percentage',
            data: [
                ['Biotech', 0.58],
                ['Ecommerce', 0.25],
                ['Medical devices', 0.69],
                ['IT', 0.52],
                ['Semiconductor', 0]
            ],
            dataLabels: {
                enabled: true,
                rotation: 0,
                color: '#FFFFFF',
                align: 'center',
                format: '{point.y:.2f}%', // one decimal
                y: 10, // 10 pixels down from the top
                style: {
                    fontSize: '10px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        }],
        navigation: {
            buttonOptions: {
                theme: {
                    'stroke-width': 1,
                    stroke: 'silver',
                    // r: 0,
                    // states: {
                    //     hover: {
                    //         fill: '#bada55',
                    //         color: '#ffffff'
                    //     },
                    //     select: {
                    //         stroke: '#039',
                    //         fill: '#bada55'
                    //     }
                    // }
                }
            }
        }
    });

$('#chart3').highcharts({
        chart: {
            type: 'area',
            height: 300,
            width: 350,
        },
        title: {
            text: 'Number of Firms Registered Per Year'
        },
        subtitle: {
            text: '1991-2014'
        },
        credits: {
        	enabled: false
        },
        xAxis: {
        	title: {
        		text: 'Cohort Year'
        	},
            type: 'category',
            labels: {
                // autoRotation: false,
                rotation: -45,
                style: {
                    fontSize: '10px',
                    fontFamily: 'Verdana, sans-serif'
                },
                allowDecimals: false
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Number of Firms'
            },
            gridLineWidth: 0,
        	minorGridLineWidth: 0,
        	lineColor: 'rgb(192, 208, 224)',
        	lineWidth: 1,
        	// tickLength: 20
        },
        legend: {
            enabled: false
        },
        tooltip: {
            pointFormat: '<b>{point.y}</b> firms registered in <b>{point.name}</b>'
        },

        series: [{
            name: 'Firms',
            data: [
                ['1991', 10],
                ['1992', 20],
                ['1993', 40],
                ['1994', 20],
                ['1995', 4],
                ['1996', 4],
                ['1997', 4],
                ['1998', 4],
                ['1999', 4],
                ['2000', 4],
                ['2001', 4],
                ['2002', 4],
                ['2003', 4],
                ['2004', 10],
                ['2005', 20],
                ['2006', 40],
                ['2007', 20],
                ['2008', 4],
                ['2009', 4],
                ['2010', 4],
                ['2011', 4],
                ['2012', 4],
                ['2013', 4],
                ['2014', 4],
            ],
            fillColor : {
              linearGradient : [0, 0, 0, 400],
              stops : [
                [0, Highcharts.getOptions().colors[0]],
                [1, 'rgba(255,255,255,0)']
              ]
            },
            lineColor: '#428bca',
            lineWidth: 1,
            marker: {
            	enabled: false,
            	fillColor: '#428bca',
            	lineColor: '#ffffff'
            },
            plotOptions: {
            	area: {
            		pointStart: 1991,
            		marker: {
            			enabled: true,
            			symbol: 'circle',
            			radius: 2,
            			lineColor: '#000000',
            			states: {
            				hover: {
            					enabled: true
            				}
            			}
            		}
            	}
            },
        }],
        navigation: {
            buttonOptions: {
                theme: {
                    'stroke-width': 1,
                    stroke: 'silver',
                }
            }
        }
    });

	$('#chart4').highcharts({
        chart: {
            type: 'area',
            height: 300,
            width: 350,
        },
        title: {
            text: 'Average Quality of Firms Registered Per Year'
        },
        subtitle: {
            text: '1991-2014'
        },
        credits: {
        	enabled: false
        },
        xAxis: {
        	title: {
        		text: 'Cohort Year'
        	},
            type: 'category',
            labels: {
                // autoRotation: false,
                rotation: -45,
                style: {
                    fontSize: '10px',
                    fontFamily: 'Verdana, sans-serif'
                },
                allowDecimals: false
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Average Quality of Firms (x1000)'
            },
            gridLineWidth: 0,
        	minorGridLineWidth: 0,
        	lineColor: 'rgb(192, 208, 224)',
        	lineWidth: 1,
        	// tickLength: 20
        },
        legend: {
            enabled: false
        },
        tooltip: {
            pointFormat: 'Average quality of firms registered in <b>{point.name}</b> = <b>{point.y}</b>'
        },

        series: [{
            name: 'Firms',
            data: [
                ['1991', 10],
                ['1992', 20],
                ['1993', 40],
                ['1994', 20],
                ['1995', 4],
                ['1996', 4],
                ['1997', 4],
                ['1998', 4],
                ['1999', 4],
                ['2000', 4],
                ['2001', 4],
                ['2002', 4],
                ['2003', 4],
                ['2004', 10],
                ['2005', 20],
                ['2006', 40],
                ['2007', 20],
                ['2008', 4],
                ['2009', 4],
                ['2010', 4],
                ['2011', 4],
                ['2012', 4],
                ['2013', 4],
                ['2014', 4],
            ],
            fillColor : {
              linearGradient : [0, 0, 0, 400],
              stops : [
                [0, Highcharts.getOptions().colors[0]],
                [1, 'rgba(255,255,255,0)']
              ]
            },
            lineColor: '#428bca',
            lineWidth: 1,
            marker: {
            	enabled: false,
            	fillColor: '#428bca',
            	lineColor: '#ffffff'
            },
            plotOptions: {
            	area: {
            		pointStart: 1991,
            		marker: {
            			enabled: true,
            			symbol: 'circle',
            			radius: 2,
            			lineColor: '#000000',
            			states: {
            				hover: {
            					enabled: true
            				}
            			}
            		}
            	}
            },
        }],
        navigation: {
            buttonOptions: {
                theme: {
                    'stroke-width': 1,
                    stroke: 'silver',
                }
            }
        }
    });

$('#chart5').highcharts({
        chart: {
            type: 'area',
            height: 300,
            width: 350,
        },
        title: {
            text: 'Potential of Firms Registered Per Year'
        },
        subtitle: {
            text: '1991-2014'
        },
        credits: {
        	enabled: false
        },
        xAxis: {
        	title: {
        		text: 'Cohort Year'
        	},
            type: 'category',
            labels: {
                // autoRotation: false,
                rotation: -45,
                style: {
                    fontSize: '10px',
                    fontFamily: 'Verdana, sans-serif'
                },
                allowDecimals: false
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Potential of Firms (x1000)'
            },
            gridLineWidth: 0,
        	minorGridLineWidth: 0,
        	lineColor: 'rgb(192, 208, 224)',
        	lineWidth: 1,
        	// tickLength: 20
        },
        legend: {
            enabled: false
        },
        tooltip: {
            pointFormat: 'Potential of firms registered in <b>{point.name}</b> = <b>{point.y}</b>'
        },

        series: [{
            name: 'Firms',
            data: [
                ['1991', 10],
                ['1992', 20],
                ['1993', 40],
                ['1994', 20],
                ['1995', 4],
                ['1996', 4],
                ['1997', 4],
                ['1998', 4],
                ['1999', 4],
                ['2000', 4],
                ['2001', 4],
                ['2002', 4],
                ['2003', 4],
                ['2004', 10],
                ['2005', 20],
                ['2006', 40],
                ['2007', 20],
                ['2008', 4],
                ['2009', 4],
                ['2010', 4],
                ['2011', 4],
                ['2012', 4],
                ['2013', 4],
                ['2014', 4],
            ],
            fillColor : {
              linearGradient : [0, 0, 0, 400],
              stops : [
                [0, Highcharts.getOptions().colors[0]],
                [1, 'rgba(255,255,255,0)']
              ]
            },
            lineColor: '#428bca',
            lineWidth: 1,
            marker: {
            	enabled: false,
            	fillColor: '#428bca',
            	lineColor: '#ffffff'
            },
            plotOptions: {
            	area: {
            		pointStart: 1991,
            		marker: {
            			enabled: true,
            			symbol: 'circle',
            			radius: 2,
            			lineColor: '#000000',
            			states: {
            				hover: {
            					enabled: true
            				}
            			}
            		}
            	}
            },
        }],
        navigation: {
            buttonOptions: {
                theme: {
                    'stroke-width': 1,
                    stroke: 'silver',
                }
            }
        }
    });

    $('#chart6').highcharts({
        chart: {
            type: 'scatter',
            // height: 300,
            // width: 350,
            zoomType: 'xy'
        },
        title: {
            text: 'Largest vs Best Cities'
        },
        subtitle: {
            text: '2009-2014'
        },
        xAxis: {
            title: {
                enabled: true,
                text: 'Rank by Entrepreneurial Quality'
            },
            offset: 10,
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true,
            max: 12,
            min: -2,
            tickInterval: 2,
            reversed: true
        },
        yAxis: {
            title: {
                text: 'Rank by # of Firms'
            },
            offset: 10,
            gridLineWidth: 0,
            minorGridLineWidth: 0,
            lineColor: 'rgb(192, 208, 224)',
            lineWidth: 1,
            max: 12,
            min: -2,
            tickInterval: 2,
            reversed: true,
        },
        credits: {
            enabled: false
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            scatter: {
                marker: {
                    radius: 10,
                    states: {
                        hover: {
                            enabled: true,
                            lineColor: 'rgb(100,100,100)'
                        }
                    }
                },
                states: {
                    hover: {
                        marker: {
                            enabled: false
                        }
                    }
                }
            }
        },
        series: [{
            // color: 'rgba(223, 83, 83, .5)',
            dataLabels: {
                enabled: true,
                x:0,
                y:0,
                formatter: function() {
                    return this.point.name;
                },
                style:{color:'#555555', fontSize: '10px'}
            },
            data: [{name: 'Al Doha', x: 1, y: 2}, {name: 'Industrial', x: 2, y: 9}, {name: 'Industrial area', x: 3, y: 8}, {name: 'Al Wakra', x: 4, y: 3}, 
            {name: 'Al Khor', x: 5, y: 6}, {name: 'Doha', x: 6, y: 1}, {name: 'Al-Rayyan', x: 7, y: 5}, {name: 'Muaither', x: 8, y: 4}, 
            {name: 'Creek', x: 9, y: 10}, {name: 'Rayyan', x: 10, y: 7}]
        }],
        tooltip: {
                    formatter: function(){
                        return '<b>' + this.point.name + '</b><br/>Quality ranking: <b>' + this.point.x + 
                        '</b><br/>Size ranking: <b>' + this.point.y + '</b>';
                    }
                    // headerFormat: '{point.name}',
                    // pointFormat: '<b>{point.name}</b><br/>Quality ranking: <b>{point.x}</b><br/>Size ranking: <b>{point.y}</b>'
                }
    });
    
});