__author__ = 'kesiena'
import csv, sys, cgi
from decimal import *
import json
from collections import OrderedDict
import re

'''
Steps
* Open the spreadsheet with Excel
* Highlight the numbers in the spreasheet and convert them to excel "General" type. This will remove all commas from
    large numbers
* Save the sheets with the right names e.g. london.csv, singapore.csv, etc. See the regions array below for
    all the names. Also ensure you save the spreadsheet as "Windows Comma Separated" csv. Some other csv formats
    won't work well with this script.
* Save all the csv files in the same folder and then update the 'inputFolder' variable. Also update the 'outputFile'
* update the regions array by removing the name of any missing file
* run this script

** NOTE: You must have at least 95 rows in the CSV file. Otherwise, this program will throw an error:
 "IndexError: list index out of range". See puertorico.csv to figure out how to add empty comma-separated lines at the
 bottom of a csv file.
'''
inputFolder = '/Users/kesiena/Dropbox (MIT)/MIT/MartinTrustCenterRA/REAP Dashboard/csv/'
outputFile = '/Users/kesiena/Dropbox (MIT)/Sites/reap/assets/js/dashboard-data.js'
outputData = OrderedDict({})
regionName = ''

# The following names should correspond to the file names. Also, the json objects will have these names
regions = ['london', 'morocco', 'moscow', 'puertorico', 'qatar', 'seoul', 'singapore', 'valencia',  # Cohort 1
           'al-madinah-saudi', 'ashdod-israel', 'bangkok-thailand', 'beijing-china', 'santiago-chile',
           'southwest-norway', 'tokyo-japan', 'wales-uk']  # Cohort 2

regionData = {
    'london': {
        'imgFileName': 'uk.png',
        'mapCssClass': 'country-img',
        'dataURL': '../assets/docs/MIT_REAP_cohort_2_dashboard_data.xlsx'
    },
    'morocco': {
        'imgFileName': 'morocco.png',
        'mapCssClass': 'country-img-wide',
        'dataURL': '../assets/docs/MIT_REAP_cohort_2_dashboard_data.xlsx'
    },
    'moscow': {
        'imgFileName': 'russia.png',
        'mapCssClass': 'country-img-wide',
        'dataURL': '../assets/docs/MIT_REAP_cohort_2_dashboard_data.xlsx'
    },
    'puertorico': {
        'imgFileName': 'puertorico.png',
        'mapCssClass': 'country-img-pr',
        'dataURL': '../assets/docs/MIT_REAP_cohort_2_dashboard_data.xlsx'
    },
    'qatar': {
        'imgFileName': 'qatar.png',
        'mapCssClass': 'country-img-qatar',
        'dataURL': '../assets/docs/MIT_REAP_cohort_2_dashboard_data.xlsx'
    },
    'seoul': {
        'imgFileName': 'korea.png',
        'mapCssClass': 'country-img-seoul',
        'dataURL': '../assets/docs/MIT_REAP_cohort_2_dashboard_data.xlsx'
    },
    'singapore': {
        'imgFileName': 'singapore.png',
        'mapCssClass': 'country-img-wide',
        'dataURL': '../assets/docs/MIT_REAP_cohort_2_dashboard_data.xlsx'
    },
    'valencia': {
        'imgFileName': 'spain.png',
        'mapCssClass': 'country-img-spain',
        'dataURL': '../assets/docs/MIT_REAP_cohort_2_dashboard_data.xlsx'
    },
    # Cohort 3
    'al-madinah-saudi': {
        'imgFileName': 'saudi.png',
        'mapCssClass': 'country-img-saudi',
        'dataURL': '../assets/docs/MIT_REAP_cohort_3_dashboard_data.xlsx'
    },
    'ashdod-israel': {
        'imgFileName': 'israel.png',
        'mapCssClass': 'country-img-israel',
        'dataURL': '../assets/docs/MIT_REAP_cohort_3_dashboard_data.xlsx'
    },
    'bangkok-thailand': {
        'imgFileName': 'thailand.png',
        'mapCssClass': 'country-img-thailand',
        'dataURL': '../assets/docs/MIT_REAP_cohort_3_dashboard_data.xlsx'
    },
    'beijing-china': {
        'imgFileName': 'china.png',
        'mapCssClass': 'country-img-china',
        'dataURL': '../assets/docs/MIT_REAP_cohort_3_dashboard_data.xlsx'
    },
    'santiago-chile': {
        'imgFileName': 'chile.png',
        'mapCssClass': 'country-img-chile',
        'dataURL': '../assets/docs/MIT_REAP_cohort_3_dashboard_data.xlsx'
    },
    'southwest-norway': {
        'imgFileName': 'norway.png',
        'mapCssClass': 'country-img-norway',
        'dataURL': '../assets/docs/MIT_REAP_cohort_3_dashboard_data.xlsx'
    },
    'tokyo-japan': {
        'imgFileName': 'japan.png',
        'mapCssClass': 'country-img-japan',
        'dataURL': '../assets/docs/MIT_REAP_cohort_3_dashboard_data.xlsx'
    },
    'wales-uk': {
        'imgFileName': 'uk.png',
        'mapCssClass': 'country-img-uk',
        'dataURL': '../assets/docs/MIT_REAP_cohort_3_dashboard_data.xlsx'
    }
}

def encodestring(str):
    return str.encode('utf-8', '')

def createRegionDataSection():
    outputData[regionName] = OrderedDict({})

def addKeyValuePair(key, value):
    outputData[regionName][key] = value

def addList(key, list):
    outputData[regionName][key] = list

def addRegionDescription(desc):
    space_count = desc.count(' ')
    if space_count > 20:
        words = desc.split(' ')
        parts = ' '.join(words[:20]), ' '.join(words[20:])
        addKeyValuePair('description1', parts[0])
        addKeyValuePair('description2', parts[1])
    else:
        addKeyValuePair('description1', desc)

stakeholdermap = {
    'Team member - entrepreneur': 'entrepreneur',
    'Team member - university': 'university',
    'Team member - corporate': 'corporate',
    'Team member - government': 'government',
    'Team member - risk capital': 'riskcapital',
    'Team member - champion': 'champion',
    'Team member': ''
}

def addTeam(all_rows, rowStart, rowEnd):
    label = ''
    team_count = 0
    team_list = []
    rowNum = 1
    for i in range(rowStart, rowEnd):
        print 'processing row:', rowNum
        rowNum += 1
        label = all_rows[i][0]
        if label.startswith('Team member -') or 'Team member' == label:
            role = stakeholdermap[label]
            team_list.append({'name': all_rows[i][3], 'sh': role, 'desc': convertToHtmlParagraphs(all_rows[i][4]),
                              'img': all_rows[i][5]})
    outputData[regionName]['team'] = team_list

def convertToHtmlParagraphs(text):
    result = ''
    tokens = text.splitlines()
    for p in tokens:
        result += '<p>' + cgi.escape(p, quote=True) + '</p>'
    return result

def addTopClusters(all_rows, rowStart, rowEnd):
    result = []
    for i in range(rowStart, rowEnd):
        label = all_rows[i][0]
        if 'Industry cluster' == label:
            result.append(all_rows[i][3])
    addList('topClusters', result)

def add_top_research_institutions(all_rows, rowStart, rowEnd):
    result = []
    for i in range(rowStart, rowEnd):
        label = all_rows[i][0]
        if 'Research institute' == label:
            result.append({'name': all_rows[i][3], 'img': all_rows[i][4]})
    addList('topResearchInstitutions', result)

def add_regional_innovations(all_rows, rowStart, rowEnd):
    result = []
    for i in range(rowStart, rowEnd):
        label = all_rows[i][0]
        if 'Regional innovation' == label:
            result.append(all_rows[i][3])
    addList('regionalInnovations', result)

def add_business_parks(all_rows, rowStart, rowEnd):
    result = []
    for i in range(rowStart, rowEnd):
        label = all_rows[i][0]
        if 'Business park, innovation hub or accelerator' == label:
            result.append(all_rows[i][3])
    addList('businessParks', result)

def add_regional_entrepreneurs(all_rows, rowStart, rowEnd):
    result = []
    for i in range(rowStart, rowEnd):
        label = all_rows[i][0]
        if 'Regional Entreprenur' == label:
            result.append({'name': all_rows[i][3], 'img': all_rows[i][4]})
    addList('regionalEntrepreneurs', result)

def add_icap_ppi(all_rows, rowStart, rowEnd):
    result = []
    for i in range(rowStart, rowEnd):
        label = all_rows[i][0]
        if 'Name of existing icap PPI in region' == label:
            result.append(all_rows[i][3])
    addList('icapPPI', result)

def add_ecap_ppi(all_rows, rowStart, rowEnd):
    result = []
    for i in range(rowStart, rowEnd):
        label = all_rows[i][0]
        if 'Name of existing ecap PPI in region' == label:
            result.append(all_rows[i][3])
    addList('ecapPPI', result)

def addChartData(dates, cols, fieldName, src_name='', src_url=''):
    year_list = []
    values_list = []
    # Add all values to array
    for i in range(len(dates)):
        value = cols[i]
        if '' == value:
            values_list.append(None)
        else:
            values_list.append(float(value)) # should append round(value, 2)
        year_list.append(dates[i])

    # Remove leading None
    while len(values_list) > 0:
        if None == values_list[0]:
            values_list.pop(0)
            year_list.pop(0)
        else:
            break

    # Remove trailing None
    while len(values_list) > 0:
        if None == values_list[-1]:
            values_list.pop(-1)
            year_list.pop(-1)
        else:
            break

    # Create json string
    data = {}
    if len(values_list) < 1:
        data['range'] = ''
        data['year'] = []
        data['value'] = []
        data['srcName'] = ''
        data['srcUrl'] = ''
    else:
        data['range'] = year_list[0] + '-' + year_list[-1]
        data['year'] = year_list
        data['value'] = values_list
        data['srcName'] = src_name
        data['srcUrl'] = src_url
    global outputData
    outputData[regionName][fieldName] = data

def addRegionData(region):
    global regionName
    regionName = region
    rows = []
    dates = []
    input_file = inputFolder + regionName + '.csv'
    with open(input_file, 'rb') as f:
        print 'Reading', input_file
        reader = csv.reader(f)
        try:
            for row in reader:
                rows.append(row)
                # print row
        except csv.Error as e:
            sys.exit('file %s, line %d: %s' % (input_file, reader.line_num, e))
    print 'Finished reading', input_file
    colStart = 3;
    colEnd = 18;
    dates = rows[1][colStart:colEnd]
    createRegionDataSection()
    addKeyValuePair('name', rows[29][3])
    print 'Added Region name'
    addRegionDescription(rows[30][3])
    print 'Added region description'
    if regionData.has_key(regionName):
        additionalKeyValuePairs = regionData[regionName]
        for key in additionalKeyValuePairs:
            addKeyValuePair(key, additionalKeyValuePairs[key])
        print 'Added key-value pairs'
    section2_row_start = 30
    section2_row_end = 95
    addTeam(rows, section2_row_start, section2_row_end)
    print 'Added team'
    addTopClusters(rows, section2_row_start, section2_row_end)
    print 'Added top clusters'
    add_top_research_institutions(rows, section2_row_start, section2_row_end)
    print 'Added top research institutions'
    add_regional_innovations(rows, section2_row_start, section2_row_end)
    print 'Added regional innovations'
    add_business_parks(rows, section2_row_start, section2_row_end)
    print 'Added business parks'
    add_regional_entrepreneurs(rows, section2_row_start, section2_row_end)
    print 'Added regional entrepreneurs'
    add_icap_ppi(rows, section2_row_start, section2_row_end)
    print 'Added i-cap PPI'
    add_ecap_ppi(rows, section2_row_start, section2_row_end)
    print 'Added e-cap PPI'
    addChartData(dates, rows[2][colStart:colEnd], 'countryPopulation', rows[2][19], rows[2][20])
    print 'Added country population'
    addChartData(dates, rows[3][colStart:colEnd], 'regionPopulation', rows[3][19], rows[3][20])
    print 'Added region population'
    addChartData(dates, rows[5][colStart:colEnd], 'giniCoeff', rows[5][19], rows[5][20])
    print 'Added Gini coefficient'
    addChartData(dates, rows[4][colStart:colEnd], 'humanDevIndex', rows[4][19], rows[4][20])
    print 'Added human dev index'
    addChartData(dates, rows[7][colStart:colEnd], 'domesticPatent', rows[7][19], rows[7][20])
    print 'Added domestic patent'
    addChartData(dates, rows[8][colStart:colEnd], 'usPatent', rows[8][19], rows[8][20])
    print 'Added US patent'
    addChartData(dates, rows[9][colStart:colEnd], 'publications', rows[9][19], rows[9][20])
    print 'Added publications'
    addChartData(dates, rows[10][colStart:colEnd], 'stemGrads', rows[10][19], rows[10][20])
    print 'Added STEM grads'
    addChartData(dates, rows[11][colStart:colEnd], 'researchAndDev', rows[11][19], rows[11][20])
    print 'Added research and dev'
    addChartData(dates, rows[12][colStart:colEnd], 'ipRanking', rows[12][19], rows[12][20])
    print 'Added IP ranking'
    addChartData(dates, rows[13][colStart:colEnd], 'gdpPerCap', rows[13][19], rows[13][20])
    print 'Added GDP per capita'
    addChartData(dates, rows[14][colStart:colEnd], 'corporations', rows[14][19], rows[14][20])
    print 'Added corporations'
    addChartData(dates, rows[15][colStart:colEnd], 'entrepreneurship', rows[15][19], rows[15][20])
    print 'Added entrepreneurship'
    addChartData(dates, rows[16][colStart:colEnd], 'vc', rows[16][19], rows[16][20])
    print 'Added VC data'
    addChartData(dates, rows[17][colStart:colEnd], 'daysToStartBiz', rows[17][19], rows[17][20])
    print 'Added days to start business'
    addChartData(dates, rows[24][colStart:colEnd], 'employment', rows[24][19], rows[24][20])
    print 'Added employment stats'

if __name__ == "__main__":
    for r in regions:
        print ('------ Start of %s ------' % r)
        addRegionData(r)
        print ('------- End of %s -------' % r)
    print json.dumps(outputData, indent=2, ensure_ascii=False)
    with open(outputFile, "w") as text_file:
        text_file.write("var regionData = ")
        text_file.write(json.dumps(outputData, indent=2, ensure_ascii=False))
    print "Done"
