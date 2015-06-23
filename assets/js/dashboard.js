var stakeholderImgPosition = {};
var region = {};

function parseURLParams(url) {
    var queryStart = url.indexOf("?") + 1;
    var queryEnd   = url.indexOf("#") + 1 || url.length + 1;
    var query = url.slice(queryStart, queryEnd - 1);
    var pairs = query.replace(/\+/g, " ").split("&");
    var parms = {};
    var n, v, nv;

    if (query === url || query === "") {
        return parms;
    }

    for (var i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=");
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);

        if (!parms.hasOwnProperty(n)) {
            parms[n] = [];
        }

        parms[n].push(nv.length === 2 ? v : null);
    }
    return parms;
}

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
    var highlightPoint = stakeholderImgPosition[stakeholderName];
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
    var imgOffset = $("#pentacle").offset();
    stakeholderImgPosition.offset = {
        left: imgOffset.left,
        top: imgOffset.top
    }

    var pentacleImgPostion = $("#pentacle").position();
    var pleft = pentacleImgPostion.left;
    var ptop = pentacleImgPostion.top;
    var pwidth = $("#pentacle").width();
    var pheight = $("#pentacle").height();
    var horizontalSpan = pwidth/3;
    var verticalSpan = pheight/3;
    $("#pentacle-highlight").width(horizontalSpan + 8);
    $("#pentacle-highlight").height(verticalSpan + 8);

    var hTop = ptop - (0.18 * verticalSpan);
    var hLeft = pleft + (pwidth/2) - (pwidth/5);
    stakeholderImgPosition.entrepreneur = {
        top: hTop,
        bottom: hTop + verticalSpan,
        left: hLeft,
        right: hLeft + horizontalSpan
    }
    
    hTop = ptop + verticalSpan - (0.12 * verticalSpan);
    hLeft = pleft - (0.2 * horizontalSpan);
    stakeholderImgPosition.university = {
        top: hTop,
        bottom: hTop + verticalSpan,
        left: hLeft,
        right: hLeft + horizontalSpan
    }

    hTop = ptop + verticalSpan - (0.12 * verticalSpan);
    hLeft = pleft + (2 * horizontalSpan) + (0.05 * horizontalSpan);
    stakeholderImgPosition.riskcapital = {
        top: hTop,
        bottom: hTop + verticalSpan,
        left: hLeft,
        right: hLeft + horizontalSpan
    }

    hTop = ptop + (2 * verticalSpan) + (0.05 * verticalSpan);
    hLeft = pleft + (horizontalSpan / 12) + (0.05 * horizontalSpan);
    stakeholderImgPosition.government = {
        top: hTop,
        bottom: hTop + verticalSpan,
        left: hLeft,
        right: hLeft + horizontalSpan
    }

    hTop = ptop + (2 * verticalSpan) + (0.05 * verticalSpan);
    hLeft = pleft + (2 * horizontalSpan) - (0.3 * horizontalSpan);
    stakeholderImgPosition.corporate = {
        top: hTop,
        bottom: hTop + verticalSpan,
        left: hLeft,
        right: hLeft + horizontalSpan
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

function convertToChartArrayFormat(yearArray, valueArray, seriesName) {
    var result = [];
    if(yearArray.length != valueArray.length) {
        console.log("Error: There are " + yearArray.length + " " + seriesName + " years but " + 
            valueArray.length + " values");
        return result;
    }
    for(var i = 0; i < yearArray.length; i++) {
        result.push([yearArray[i], valueArray[i]]);
    }
    return result;
}

function getLineChartDefaultOptions() {
    return {
        chart: {
            type: 'area',
            height: 300,
            width: 400,
            spacingLeft: 30,
            spacingRight: 30
        },
        title: {
            text: '*** Default title',
            style: {
                fontSize: '14px'
            }
        },
        subtitle: {
            text: '*** Default subtitle'
        },
        credits: {
            enabled: false
        },
        xAxis: {
            title: {
                text: 'Year'
            },
            type: 'category',
            labels: {
                rotation: -45,
                style: {
                    fontSize: '10px',
                    fontFamily: 'Verdana, sans-serif'
                },
                allowDecimals: false
            }
        },
        yAxis: {
            title: {
                text: '*** Default yAxis title'
            },
        },
        legend: {
            enabled: false
        },
        tooltip: {
            formatter: function(){
                return '*** Default tooltip formatter';
            }
        },
        series: [{
            data: [],
            connectNulls: true,
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
                    marker: {
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
    };
}

function addGraph(carouselID, chartId, chartOptions) {

    var count = $("#" + carouselID + " .carousel-dot-control").size();
    
    $("#" + carouselID + " > .carousel-inner").append(
        "<div id='" + chartId + "' class='item'>" +
        "</div>"
    );

    $("#" + carouselID + " > .carousel-indicators").append(
        "<li data-target='#" + carouselID + "' data-slide-to='" + count + "' class='carousel-dot-control'></li>"
    );

    $("#" + chartId).highcharts(chartOptions);

    $("#" + carouselID + " > .carousel-inner .item").each(function(index) {
        if(index == 0) {
            $(this).addClass('active');
        } else{
            $(this).removeClass('active');
        }
    });

    $("#" + carouselID + " > .carousel-indicators .carousel-dot-control").each(function(index) {
        if(index == 0) {
            $(this).addClass('active');
        } else{
            $(this).removeClass('active');
        }
    });
}

function plotDomesticPatent() {
    if(region.domesticPatent.value.length < 1){
        return;
    }
    var domPatentOptions = getLineChartDefaultOptions();
    domPatentOptions.title.text = 'Domestic Patents/Year';
    domPatentOptions.subtitle.text = region.domesticPatent.range;
    domPatentOptions.yAxis.title.text = 'No. of filings';
    domPatentOptions.tooltip.formatter = function() {
        return 'No. of domestic patents filed in <b>'+ this.point.name + '</b> = <b>' + this.point.y + '</b>';
    }
    domPatentOptions.series[0].data = convertToChartArrayFormat(region.domesticPatent.year, region.domesticPatent.value, "Domestic Patents");
    addGraph("icap-carousel", "domestic-patents-chart", domPatentOptions);
}

function plotUSPatent() {
    if(region.usPatent.value.length < 1){
        return;
    }
    var usPatentOptions = getLineChartDefaultOptions();
    usPatentOptions.title.text = 'US Patents/Year';
    usPatentOptions.subtitle.text = region.usPatent.range;
    usPatentOptions.yAxis.title.text = 'No. of filings';
    usPatentOptions.tooltip.formatter = function() {
        return 'No. of US patents filed in <b>'+ this.point.name + '</b> = <b>' + this.point.y + '</b>';
    }
    usPatentOptions.series[0].data = convertToChartArrayFormat(region.usPatent.year, region.usPatent.value, "US Patents");
    addGraph("icap-carousel", "us-patents-chart", usPatentOptions); 
}

function plotPublications() {
    if(region.publications.value.length < 1){
        return;
    }
    var publicationsOptions = getLineChartDefaultOptions();
    publicationsOptions.title.text = 'Published Papers/Year';
    publicationsOptions.subtitle.text = region.publications.range;
    publicationsOptions.yAxis.title.text = 'Published Papers';
    publicationsOptions.tooltip.formatter = function() {
        return 'No. of published papers in <b>'+ this.point.name + '</b> = <b>' + this.point.y + '</b>';
    }
    publicationsOptions.series[0].data = convertToChartArrayFormat(region.publications.year, region.publications.value, "Publications");
    addGraph("icap-carousel", "publications-chart", publicationsOptions);
}

function plotStemGrads() {
    if(region.stemGrads.value.length < 1){
        return;
    }    
    var stemGradsOptions = getLineChartDefaultOptions();
    stemGradsOptions.title.text = 'STEM Graduates/Year';
    stemGradsOptions.subtitle.text = region.stemGrads.range;
    stemGradsOptions.yAxis.title.text = 'No. of Stem Graduates';
    stemGradsOptions.tooltip.formatter = function() {
        return 'No. of STEM graduates in <b>'+ this.point.name + '</b> = <b>' + this.point.y + '</b>';
    }
    stemGradsOptions.series[0].data = convertToChartArrayFormat(region.stemGrads.year, region.stemGrads.value, "STEM Graduates");
    addGraph("icap-carousel", "stem-grads-chart", stemGradsOptions);
}

function plotResearchAndDev() {
    if(region.researchAndDev.value.length < 1){
        return;
    }
    var rAndDOptions = getLineChartDefaultOptions();
    rAndDOptions.title.text = 'Gross R&D Expenditure';
    rAndDOptions.subtitle.text = region.researchAndDev.range;
    rAndDOptions.yAxis.title.text = 'R&D as % of GDP';
    rAndDOptions.tooltip.formatter = function() {
        return 'R&D expenditure as % of GDP in <b>'+ this.point.name + '</b> = <b>' + this.point.y + '</b>';
    }
    rAndDOptions.series[0].data = convertToChartArrayFormat(region.researchAndDev.year, region.researchAndDev.value, "R&D");
    addGraph("icap-carousel", "r-and-d-chart", rAndDOptions);
}

function plotIpRanking() {
    if(region.ipRanking.value.length < 1){
        return;
    }
    var ipRankingOptions = getLineChartDefaultOptions();
    ipRankingOptions.title.text = 'Intellectual Property Protection Ranking';
    ipRankingOptions.subtitle.text = region.ipRanking.range;
    ipRankingOptions.yAxis.title.text = 'Rank';
    ipRankingOptions.tooltip.formatter = function() {
        return 'IP protection ranking in <b>'+ this.point.name + '</b> = <b>' + this.point.y + '</b>';
    }
    ipRankingOptions.series[0].data = convertToChartArrayFormat(region.ipRanking.year, region.ipRanking.value, "IP Ranking");
    addGraph("icap-carousel", "ip-ranking-chart", ipRankingOptions);
}

function plotGdpPerCapitaForICap() {
    if(region.gdpPerCap.value.length < 1){
        return;
    }
    var gdpPerCapOptions = getLineChartDefaultOptions();
    gdpPerCapOptions.title.text = 'GDP Per Capita';
    gdpPerCapOptions.subtitle.text = region.gdpPerCap.range;
    gdpPerCapOptions.yAxis.title.text = 'GDP Per Capita (USD)';
    gdpPerCapOptions.tooltip.formatter = function() {
        return 'GDP Per Capita in <b>'+ this.point.name + '</b> = <b>' + this.point.y + '</b>';
    }
    gdpPerCapOptions.series[0].data = convertToChartArrayFormat(region.gdpPerCap.year, region.gdpPerCap.value, "GDP Per Capita");
    addGraph("icap-carousel", "gdp-icap-chart", gdpPerCapOptions);
}

function plotTotalEarlyEntrepreneurship() {
    if(region.entrepreneurship.value.length < 1){
        return;
    }
    var entOptions = getLineChartDefaultOptions();
    entOptions.title.text = 'Total Early Stage Entrepreneurship';
    entOptions.subtitle.text = region.entrepreneurship.range;
    entOptions.yAxis.title.text = 'Early Stage Entrepreneurship';
    entOptions.tooltip.formatter = function() {
        return 'Total early stage entrepreneurship in <b>'+ this.point.name + '</b> = <b>' + this.point.y + '</b>';
    }
    entOptions.series[0].data = convertToChartArrayFormat(region.entrepreneurship.year, region.entrepreneurship.value, "Early Stage Entrepreneurship");
    addGraph("ecap-carousel", "total-early-stage-entrepreneurship-chart", entOptions);
}

function plotVcInvestments() {
    if(region.vc.value.length < 1){
        return;
    }
    var vcOptions = getLineChartDefaultOptions();
    vcOptions.title.text = 'Venture Capital Investments/year';
    vcOptions.subtitle.text = region.vc.range;
    vcOptions.yAxis.title.text = 'VC investments (USD)';
    vcOptions.tooltip.formatter = function() {
        return 'VC investments in <b>'+ this.point.name + '</b> = <b>' + this.point.y + '</b>';
    }
    vcOptions.series[0].data = convertToChartArrayFormat(region.vc.year, region.vc.value, "VC investment");
    addGraph("ecap-carousel", "vc-chart", vcOptions);
}

function plotDaysToStartBusiness() {
    if(region.daysToStartBiz.value.length < 1){
        return;
    }
    var bizStartOptions = getLineChartDefaultOptions();
    bizStartOptions.title.text = 'No. of days to start a business';
    bizStartOptions.subtitle.text = region.daysToStartBiz.range;
    bizStartOptions.yAxis.title.text = 'Days';
    bizStartOptions.tooltip.formatter = function() {
        return 'No. of days to start a business in <b>'+ this.point.name + '</b> = <b>' + this.point.y + '</b>';
    }
    bizStartOptions.series[0].data = convertToChartArrayFormat(region.daysToStartBiz.year, region.daysToStartBiz.value, "Days to start a business");
    addGraph("ecap-carousel", "biz-start-chart", bizStartOptions);
}

function plotGdpPerCapitaForECap() {
    if(region.gdpPerCap.value.length < 1){
        return;
    }
    var gdpPerCapOptions = getLineChartDefaultOptions();
    gdpPerCapOptions.title.text = 'GDP Per Capita';
    gdpPerCapOptions.subtitle.text = region.gdpPerCap.range;
    gdpPerCapOptions.yAxis.title.text = 'GDP Per Capita (USD)';
    gdpPerCapOptions.tooltip.formatter = function() {
        return 'GDP Per Capita in <b>'+ this.point.name + '</b> = <b>' + this.point.y + '</b>';
    }
    gdpPerCapOptions.series[0].data = convertToChartArrayFormat(region.gdpPerCap.year, region.gdpPerCap.value, "GDP Per Capita");
    addGraph("ecap-carousel", "gdp-ecap-chart", gdpPerCapOptions);
}

function plotTotalEmployment() {
    if(region.employment.value.length < 1){
        return;
    }
    var employmentOptions = getLineChartDefaultOptions();
    employmentOptions.title.text = 'Total Employment/year';
    employmentOptions.subtitle.text = region.employment.range;
    employmentOptions.yAxis.title.text = 'Total Employment (millions)';
    employmentOptions.tooltip.formatter = function() {
        return 'Total employment in <b>'+ this.point.name + '</b> = <b>' + this.point.y + 'million(s)</b>';
    }
    employmentOptions.series[0].data = convertToChartArrayFormat(region.employment.year, region.employment.value, "GDP Per Capita");
    addGraph("ecap-carousel", "employment-chart", employmentOptions);
}

function displayPrompt() {
    $("#dashboard-main-panel").hide();
    $("#dashboard-prompt").show();
}

function setSelectedRegion(name) {
    $("#selected-region").html(name);
    $(".dropdown-menu > li  > a").each(function(){
        if($(this).text() == name) {
            $(this).parent().addClass("active");
        } else {
            $(this).parent().removeClass("active");
        }
    });
}

function setFlag() {
    var regionName = region.name;
    $("#country-flag-container").append(
        "<img alt='" + regionName + "' class='" + region.flagCssClass + "' src='../assets/images/" + region.imgFileName + "' />" +
        "<img alt='Bottomcircle label' class='bottom-circle-label-0' src='../assets/images/bottomcircle_label.png'/>" +
        "<p class='country-label-spec'>" + regionName + "</p>"
        );
}

function setDescription() {
    $("#description-snippet").html(region.description1);
    $("#more-region-description").html(" " + region.description2);
    if(region.description1){
        $("#more-region-description-btn").show();
    }
}
var popOverSettings = {
        placement: 'bottom',
        trigger: 'hover',
    };

function addTeamMembers() {
    for(var i=0; i< region.team.length; i++) {
        var teamObj = region.team[i];
        $("#team-container").append(
            '<div class="col-sm-3 col-xs-4">' +
                '<div id="abc" class="dashboard-team-member sh-' + teamObj.sh + ' chart-blue-reap" rel="popover"' + 
                    'data-toggle="popover" data-trigger="hover" data-placement="bottom" data-content="' + teamObj.desc + '">' +
                  '<p>' + teamObj.name + '</p>' +
                '</div>' +
            '</div>'
        );
    }
    $(".dashboard-team-member").popover(popOverSettings);
}

$(document).ready(function() {
    var urlParams = parseURLParams(document.URL);
    if(!urlParams || !urlParams["region"]) {
        displayPrompt();
        return;
    }
    region = regionData[urlParams["region"][0]];
    if(!region) {
        displayPrompt();
        return;   
    }

    setSelectedRegion(region.name);


	$('[data-toggle="popover"]').popover(); // Initialize popover (bootstrap requirement) for team members' bio.
    setupStakeholderImgPosition();

	$(".dashboard-team-row").on('mouseenter', '.dashboard-team-member', function(){
		var stakeholder = getStakeholderFromClassnames($(this).attr('class'));
        highlightStakeholderInPentacle(stakeholder);
	});

	$(".dashboard-team-row").on('mouseleave', '.dashboard-team-member', function(){
		hideStakeholderHighlight();
	});

    $("#pentacle").mousemove(function(e){
        var stakeholder = getStakeholderType(e.pageX - stakeholderImgPosition.offset.left, 
            e.pageY - stakeholderImgPosition.offset.top);
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
        $("#less-region-description-btn").show();
	});

	$("#less-region-description-btn").click(function(){
        $("#less-region-description-btn").hide();
		$("#more-region-description-btn").show();
		$("#more-region-description").hide();
	});

    setFlag();
    setDescription();
    addTeamMembers();

    plotDomesticPatent();
    plotUSPatent();
    plotPublications();
    plotStemGrads();
    plotResearchAndDev(); 
    plotIpRanking(); 
    plotGdpPerCapitaForICap();
    plotTotalEarlyEntrepreneurship(); 
    plotVcInvestments(); 
    plotDaysToStartBusiness(); 
    plotGdpPerCapitaForECap(); 
    plotTotalEmployment();

    if($("#custom-metrics-charts").children().length < 1) {
        $("#custom-metrics-col").remove();
    }


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
                ['1991', 1400],
                ['1992', 1000],
                ['1993', 250],
                ['1994', 700],
                ['1995', 850],
                ['1996', 600],
                ['1997', 800],
                ['1998', 1000],
                ['1999', 650],
                ['2000', 400],
                ['2001', 300],
                ['2002', 450],
                ['2003', 450],
                ['2004', 750],
                ['2005', 1100],
                ['2006', 1200],
                ['2007', 1320],
                ['2008', 1450],
                ['2009', 1650],
                ['2010', 1480],
                ['2011', 1600],
                ['2012', 1900],
                ['2013', 1500],
                ['2014', 1300],
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
                ['1991', 0.28],
                ['1992', 0.29],
                ['1993', 0.295],
                ['1994', 0.32],
                ['1995', 0.27],
                ['1996', 0.3],
                ['1997', 0.29],
                ['1998', 0.27],
                ['1999', 0.26],
                ['2000', 0.295],
                ['2001', 0.3],
                ['2002', 0.31],
                ['2003', 0.28],
                ['2004', 0.31],
                ['2005', 0.33],
                ['2006', 0.32],
                ['2007', 0.30],
                ['2008', 0.28],
                ['2009', 0.29],
                ['2010', 0.295],
                ['2011', 0.31],
                ['2012', 0.29],
                ['2013', 0.35],
                ['2014', 0.30],
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
                ['1991', 0.4],
                ['1992', 0.05],
                ['1993', 0.1],
                ['1994', 0.25],
                ['1995', 0.2],
                ['1996', 0.15],
                ['1997', 0.2],
                ['1998', 0.28],
                ['1999', 0.25],
                ['2000', 0.22],
                ['2001', 0.15],
                ['2002', 0.1],
                ['2003', 0.21],
                ['2004', 0.33],
                ['2005', 0.35],
                ['2006', 0.35],
                ['2007', 0.38],
                ['2008', 0.41],
                ['2009', 0.44],
                ['2010', 0.42],
                ['2011', 0.62],
                ['2012', 0.5],
                ['2013', 0.55],
                ['2014', 0.4],
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
            height: 300,
            width: 350,
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
            // offset: 5,
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true,
            max: 10,
            // min: -2,
            tickInterval: 2,
            reversed: true
        },
        yAxis: {
            title: {
                text: 'Rank by # of Firms'
            },
            // offset: 5,
            gridLineWidth: 0,
            minorGridLineWidth: 0,
            lineColor: 'rgb(192, 208, 224)',
            lineWidth: 1,
            max: 10,
            // min: -2,
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
                x:25,
                y:5,
                allowOverlap: true,
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

   

// Configure the carousel in the dashboard to slide automatically: http://getbootstrap.com/javascript/#carousel
  $('.carousel').carousel({
      interval: 3000
  })
    
});