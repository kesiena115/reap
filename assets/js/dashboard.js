var stakeholderImgPosition = {};
var region = {};
var timeoutObj;

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
    if(!stakeholderName || isMobileScreen()) {
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
    var pleft = $("#pentacle").position().left;
    var ptop = $("#pentacle").position().top;
    var pwidth = $("#pentacle").width();
    var pheight = $("#pentacle").height();
    var highlightWidth = pwidth/3;
    var highlightHeight = pheight/3;
    $("#pentacle-highlight").width(highlightWidth + 8);
    $("#pentacle-highlight").height(highlightHeight + 8);

    var hTop = ptop - (0.18 * highlightHeight);
    var hLeft = pleft + (pwidth/2) - (pwidth/5);
    stakeholderImgPosition.entrepreneur = {
        top: hTop,
        bottom: hTop + highlightHeight,
        left: hLeft,
        right: hLeft + highlightWidth
    }
    
    hTop = ptop + highlightHeight - (0.12 * highlightHeight);
    hLeft = pleft - (0.2 * highlightWidth);
    stakeholderImgPosition.university = {
        top: hTop,
        bottom: hTop + highlightHeight,
        left: hLeft,
        right: hLeft + highlightWidth
    }

    hTop = ptop + highlightHeight - (0.12 * highlightHeight);
    hLeft = pleft + (2 * highlightWidth) + (0.05 * highlightWidth);
    stakeholderImgPosition.riskcapital = {
        top: hTop,
        bottom: hTop + highlightHeight,
        left: hLeft,
        right: hLeft + highlightWidth
    }

    hTop = ptop + (2 * highlightHeight) + (0.05 * highlightHeight);
    hLeft = pleft + (highlightWidth / 12) + (0.05 * highlightWidth);
    stakeholderImgPosition.government = {
        top: hTop,
        bottom: hTop + highlightHeight,
        left: hLeft,
        right: hLeft + highlightWidth
    }

    hTop = ptop + (2 * highlightHeight) + (0.05 * highlightHeight);
    hLeft = pleft + (2 * highlightWidth) - (0.3 * highlightWidth);
    stakeholderImgPosition.corporate = {
        top: hTop,
        bottom: hTop + highlightHeight,
        left: hLeft,
        right: hLeft + highlightWidth
    }


    if(!isMobileScreen()) {
        /* When the user hovers over the pentacle icons, it should be highlighted only if the dashboard 
        is viewed on a computer as opposed to a table or mobile phone */
        $("#pentacle").mousemove(function(e){
            var parentOffset = $(this).parent().offset();
            var stakeholder = getStakeholderType(e.pageX - parentOffset.left, e.pageY - parentOffset.top);
            if(stakeholder){
                highlightStakeholderInPentacle(stakeholder); 
                $(".dashboard-team-member").removeClass("active");
                $(".sh-" + stakeholder).addClass("active");
            } else {
                hideStakeholderHighlight();
                $(".dashboard-team-member").removeClass("active");
                $(".team-member-img").removeClass("active");
            }
        });
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

function isMobileScreen() {
    return $(window).width() < 992;
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
            text: '',
            style: {
                fontSize: '14px'
            }
        },
        subtitle: {
            useHTML: true,
            text: null,
            style: {
                fontSize: '10px'
            }
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
                text: ''
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
            // buttonOptions: {
            //     theme: {
            //         'stroke-width': 1,
            //         stroke: 'silver',
            //     }
            // },
            menuItemStyle: {
                fontWeight: 'normal',
                background: 'none',
                fontSize: '14px'
            },
            menuItemHoverStyle: {
                // fontWeight: 'bold',
                // background: 'none',
                // color: 'black'
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

function  showOrHideTeamMembers() {
    if($('#team-container').children().length < 1) {
        $('#team-col').remove();
        $('#pentacle-column').addClass('col-md-offset-3');
    }
}

function showOrHideOtherPrimaryMetrics() {
    if($('#other-metrics-container').children().length < 1) {
        $('#other-primary-metrics-col').remove();
    }
}

function addList(carouselID, listId, listTitle, list) {
    if(!list || list.length < 1 || "" == list[0]) {
        return;
    }
    var count = $("#" + carouselID + " .carousel-dot-control").size();

    var htmlList = '<ul>';
    for(var i = 0; i < list.length; i++) {
        htmlList += '<li>' + list[i] + '</li>'
    }
    htmlList += '</ul>';
    
    $("#" + carouselID + " > .carousel-inner").append(
        "<div id='" + listId + "' class='item'>" +
            "<p class='list-title'>" + listTitle + "</p>" +
            htmlList +
        "</div>"
    );

    $("#" + carouselID + " > .carousel-indicators").append(
        "<li data-target='#" + carouselID + "' data-slide-to='" + count + "' class='carousel-dot-control'></li>"
    );

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

function addListof3or4Imgs(carouselID, listId, listTitle, list) {
    if(!list || list.length < 1 || "" == list[0]) {
        return;
    }
    var count = $("#" + carouselID + " .carousel-dot-control").size();

    var html = '<div class="item">' + 
                '<p class="list-title">' + listTitle + '</p>' +
                '<div class="row">';

    var name = '';
    var img = '';
    var offset = '';
    for(var i=0; i< list.length; i++) {
        name = list[i].name;
        img = list[i].img;
        if(i == 0 && list.length == 3) {
            offset = ' col-xs-offset-3';
        } else {
            offset = '';
        }
        var content = 
            '<div class="col-xs-6' + offset + '">' + 
                '<div class="img-div">' +
                  '<img alt="' + name + '" src="../assets/images/' + img + '" />' +
                '</div>' +
                '<p class="img-label">' + name + '</p>' +
            '</div>';
        html += content;

    }
    html += '</div></div>';
    
    $("#" + carouselID + " > .carousel-inner").append(
        html
    );

    $("#" + carouselID + " > .carousel-indicators").append(
        "<li data-target='#" + carouselID + "' data-slide-to='" + count + "' class='carousel-dot-control'></li>"
    );

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

function addTopClusters() {
    addList("other-metrics-carousel", "topClusters", "Top Industry Clusters", region.topClusters);
}

function addTopResearchInstitutions() {
    institutions = region.topResearchInstitutions;
    if(!institutions || institutions.length < 1){
        return;
    }
    if ("" == institutions[0]['img']) {
        nameList = []
        for(var i = 0; i < institutions.length; i++) {
            nameList.push(institutions[i]['name'])
        }
        addList("other-metrics-carousel", "topResearchInstitutions", "Top Research Institutions", nameList);   
    } else {
        addListof3or4Imgs("other-metrics-carousel", "topResearchInstitutions", "Top Research Institutions", institutions);    
    }    
}

function addTopBusinessParks() {
    addList("other-metrics-carousel", "topBusinessParks", "Top Business Parks, Innovation Hubs, or Accelerators", region.businessParks);      
}

function addRegionalInnovations() {
    addList("other-metrics-carousel", "regionalInnovations", "Celebrated Regional Innovations", region.regionalInnovations);      
}

function addICapPPI() {
    addList("other-metrics-carousel", "icap-ppi", "Innovation Capacity Programmatic and Policy Interventions", region.icapPPI);      
}

function addECapPPI() {
    addList("other-metrics-carousel", "ecap-ppi", "Entrepreneurship Capacity Programmatic and Policy Interventions", region.ecapPPI);      
}

function plotDomesticPatent() {
    if(region.domesticPatent.value.length < 1){
        return;
    }
    var domPatentOptions = getLineChartDefaultOptions();
    domPatentOptions.title.text = 'Domestic Patents/Year';
    // domPatentOptions.subtitle.text = region.domesticPatent.range;
    var sourceUrl = region.domesticPatent.srcUrl;
    var sourceName = region.domesticPatent.srcName;
    if(sourceUrl && sourceName){
        domPatentOptions.subtitle.text = 'Source: <a href="' + sourceUrl + '">' + sourceName + '</a>';    
    }
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
    // usPatentOptions.subtitle.text = region.usPatent.range;
    var sourceUrl = region.usPatent.srcUrl;
    var sourceName = region.usPatent.srcName;
    if(sourceUrl && sourceName){
        usPatentOptions.subtitle.text = 'Source: <a href="' + sourceUrl + '">' + sourceName + '</a>';    
    }
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
    // publicationsOptions.subtitle.text = region.publications.range;
    var sourceUrl = region.publications.srcUrl;
    var sourceName = region.publications.srcName;
    if(sourceUrl && sourceName){
        publicationsOptions.subtitle.text = 'Source: <a href="' + sourceUrl + '">' + sourceName + '</a>';    
    }
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
    // stemGradsOptions.subtitle.text = region.stemGrads.range;
    var sourceUrl = region.stemGrads.srcUrl;
    var sourceName = region.stemGrads.srcName;
    if(sourceUrl && sourceName){
        stemGradsOptions.subtitle.text = 'Source: <a href="' + sourceUrl + '">' + sourceName + '</a>';    
    }
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
    // rAndDOptions.subtitle.text = region.researchAndDev.range;
    var sourceUrl = region.researchAndDev.srcUrl;
    var sourceName = region.researchAndDev.srcName;
    if(sourceUrl && sourceName){
        rAndDOptions.subtitle.text = 'Source: <a href="' + sourceUrl + '">' + sourceName + '</a>';    
    }
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
    // ipRankingOptions.subtitle.text = region.ipRanking.range;
    var sourceUrl = region.ipRanking.srcUrl;
    var sourceName = region.ipRanking.srcName;
    if(sourceUrl && sourceName){
        ipRankingOptions.subtitle.text = 'Source: <a href="' + sourceUrl + '">' + sourceName + '</a>';    
    }
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
    // gdpPerCapOptions.subtitle.text = region.gdpPerCap.range;
    var sourceUrl = region.gdpPerCap.srcUrl;
    var sourceName = region.gdpPerCap.srcName;
    if(sourceUrl && sourceName){
        gdpPerCapOptions.subtitle.text = 'Source: <a href="' + sourceUrl + '">' + sourceName + '</a>';    
    }
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
    // entOptions.subtitle.text = region.entrepreneurship.range;
    var sourceUrl = region.entrepreneurship.srcUrl;
    var sourceName = region.entrepreneurship.srcName;
    if(sourceUrl && sourceName){
        entOptions.subtitle.text = 'Source: <a href="' + sourceUrl + '">' + sourceName + '</a>';    
    }
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
    // vcOptions.subtitle.text = region.vc.range;
    var sourceUrl = region.vc.srcUrl;
    var sourceName = region.vc.srcName;
    if(sourceUrl && sourceName){
        vcOptions.subtitle.text = 'Source: <a href="' + sourceUrl + '">' + sourceName + '</a>';    
    }
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
    // bizStartOptions.subtitle.text = region.daysToStartBiz.range;
    var sourceUrl = region.daysToStartBiz.srcUrl;
    var sourceName = region.daysToStartBiz.srcName;
    if(sourceUrl && sourceName){
        bizStartOptions.subtitle.text = 'Source: <a href="' + sourceUrl + '">' + sourceName + '</a>';    
    }
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
    // gdpPerCapOptions.subtitle.text = region.gdpPerCap.range;
    var sourceUrl = region.gdpPerCap.srcUrl;
    var sourceName = region.gdpPerCap.srcName;
    if(sourceUrl && sourceName){
        gdpPerCapOptions.subtitle.text = 'Source: <a href="' + sourceUrl + '">' + sourceName + '</a>';    
    }
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
    // employmentOptions.subtitle.text = region.employment.range;
    var sourceUrl = region.employment.srcUrl;
    var sourceName = region.employment.srcName;
    if(sourceUrl && sourceName){
        employmentOptions.subtitle.text = 'Source: <a href="' + sourceUrl + '">' + sourceName + '</a>';    
    }
    employmentOptions.yAxis.title.text = 'Total Employment (millions)';
    employmentOptions.tooltip.formatter = function() {
        return 'Total employment in <b>'+ this.point.name + '</b> = <b>' + this.point.y + 'million(s)</b>';
    }
    employmentOptions.series[0].data = convertToChartArrayFormat(region.employment.year, region.employment.value, "GDP Per Capita");
    addGraph("ecap-carousel", "employment-chart", employmentOptions);
}

function displayPrompt() {
    $("#dashboard-main-panel").hide();
    $("#dashboard-home").show();
    $('#dashboard-loading-div').hide();
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
        "<img alt='" + regionName + "' class='" + region.mapCssClass + "' src='../assets/images/" + region.imgFileName + "' />" +
        "<img alt='Bottomcircle label' class='bottom-circle-label-0' src='../assets/images/bottomcircle_label.png'/>" +
        "<p class='country-label-spec'>" + regionName + "</p>"
        );
}

function setDescription() {
    $("#description-snippet").html(region.description1);
    $("#more-region-description").html(" " + region.description2);
    if(region.description2){
        $("#more-region-description-btn").show();
    }
}

function addTeamMembers() {
    for(var i=0; i< region.team.length; i++) {
        var teamObj = region.team[i];
        if(!teamObj.name) {
            continue;
        }
        var content = '';
        var popoverTitle = teamObj.name
        var bottomLabel = '<p class="team-member-name">' + teamObj.name +  '</p>'; 
        if(teamObj.img) {
            content = '<img alt="' + teamObj.name + '" class="team-member-img sh-' + teamObj.sh + '" src="../assets/images/' + teamObj.img + '" />';
        } else {
            content = '<img alt="' + teamObj.name + '" class="team-member-img sh-' + teamObj.sh + '" src="../assets/images/default-profile-pic.jpg" />';
        }
        $("#team-container").append(
            '<div class="col-sm-3 col-xs-4">' +
                '<div class="dashboard-team-member sh-' + teamObj.sh + '" rel="popover"' + 
                    'data-toggle="popover" data-trigger="hover" data-placement="bottom" data-html="true" data-content="' + teamObj.desc + '" title="' + teamObj.name + '">' +
                    content +
                '</div>' +
                bottomLabel +
            '</div>'
        );
    }
    
    // Ensure that the popover stays open while you mouse over.
    // http://stackoverflow.com/a/12274958/978369
    $(".dashboard-team-member").popover({
        placement: 'bottom',
        // trigger: 'hover',
        offset: 10,
        trigger: 'manual',
        html: true,
        template: '<div class="popover" onmouseover="clearTimeout(timeoutObj);$(this).mouseleave(function() {$(this).hide();});"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'
    }).mouseenter(function(e) {
        $(this).popover('show');
    }).mouseleave(function(e) {
        var ref = $(this);
        timeoutObj = setTimeout(function(){
            ref.popover('hide');
        }, 50);
    });
}

function addRegionalEntrepreneurs() {
    if(!region.regionalEntrepreneurs || "" == region.regionalEntrepreneurs[0].name) {
        $('#regional-entrepreneurs-col').remove();
        return;
    }
    var entrepreneursCount = region.regionalEntrepreneurs.length;
    if(entrepreneursCount != 3) {
        console.log('expected 3 regional entrepreneurs but found ' + entrepreneursCount + '. region = ' + region.name);
        return;
    }
    for(var i=0; i< entrepreneursCount; i++) {
        var entrepreneur = region.regionalEntrepreneurs[i];
        var offset = '';
        switch(i) {
            case 0:
                offset = ' col-xs-offset-4';
                break;
            case 1:
                offset = ' col-xs-offset-2';
                break;
            default:
                offset = '';
        }

        var content = '<img alt="' + entrepreneur.name + '" class="entrepreneur-img" src="../assets/images/' + entrepreneur.img + '" />';
        var bottomLabel = '<p>' + entrepreneur.name +  '</p>'; 
        if(""  == entrepreneur.img) {
            content = '<p>' + entrepreneur.name +  '</p>';
            bottomLabel = "";
        }

        $("#regional-entrepreneurs").append(
            // TODO: start here. convert to string and add dynamic objects. Also set offset based on count
            '<div class="col-xs-4' + offset + '">' +
              '<div class="entrepreneur-div">' +
                content +
              '</div>' +
              bottomLabel +
            '</div>'
        );
    }
}

function downloadURI(uri) {
    // source: http://stackoverflow.com/a/27284736/978369
  // Construct the <a> element
  var link = document.createElement("a");
  // Construct the uri
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  // Cleanup the DOM
  document.body.removeChild(link);
  delete link;
}

$(document).ready(function() {
    var urlParams = parseURLParams(document.URL);
    if(!urlParams || !urlParams["region"]) {
        displayPrompt();
        return;
    }
    $("#dashboard-main-panel").show();
    region = regionData[urlParams["region"][0]];
    if(!region) {
        displayPrompt();
        return;   
    }

    setSelectedRegion(region.name);
    setupStakeholderImgPosition();

	$('[data-toggle="popover"]').popover(); // Initialize popover (bootstrap requirement) for team members' bio.

	$(".dashboard-team-row").on('mouseenter', '.dashboard-team-member', function(){
		var stakeholder = getStakeholderFromClassnames($(this).attr('class'));
        highlightStakeholderInPentacle(stakeholder);
	});

	$(".dashboard-team-row").on('mouseleave', '.dashboard-team-member', function(){
		hideStakeholderHighlight();
	});

    $(window).resize(function() {
      setupStakeholderImgPosition();
    });

    $("#pentacle-highlight").mouseleave(function(){
        hideStakeholderHighlight();
        $(".dashboard-team-member").removeClass("active");
        $(".team-member-img").removeClass("active");
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
    showOrHideTeamMembers();
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
    addRegionalEntrepreneurs();
    addTopResearchInstitutions();
    addRegionalInnovations();
    addTopClusters();
    addTopBusinessParks();
    addICapPPI();
    addECapPPI();
    showOrHideOtherPrimaryMetrics();
    addReapIndexCharts();
   

// Configure the carousel in the dashboard to slide automatically: http://getbootstrap.com/javascript/#carousel
  $('.carousel').carousel({
      interval: 3000
  })

    Highcharts.getOptions().exporting.buttons.contextButton.menuItems.push({
        text: 'Download data',
        onclick: function () {
            downloadURI(region.dataURL);
        }
    });

    $('#dashboard-loading-div').hide();
    
}); // end of document.ready()

function addReapIndexCharts() {
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
} // end of addReapIndexCharts()