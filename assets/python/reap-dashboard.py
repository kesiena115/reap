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
'''

# The following names should correspond to the file names. Also, the json objects will have these names
regions = ['london', 'morocco', 'moscow', 'puertorico', 'qatar', 'seoul', 'singapore', 'valencia']

regionData = {
    'london': {
        'imgFileName':'uk.png',
        'flagCssClass':'country-img'
    },
    'morocco': {
        'imgFileName':'morocco.png',
        'flagCssClass':'country-img-wide'
    },
    'moscow': {
        'imgFileName':'russia.png',
        'flagCssClass':'country-img-wide'
    },
    'puertorico': {
        'imgFileName':'puertorico.png',
        'flagCssClass':'country-img-pr'
    },
    'qatar': {
        'imgFileName':'qatar.png',
        'flagCssClass':'country-img-qatar'
    },
    'seoul': {
        'imgFileName':'korea.png',
        'flagCssClass':'country-img-seoul'
    },
    'singapore': {
        'imgFileName':'singapore.png',
        'flagCssClass':'country-img-wide'
    },
    'valencia': {
        'imgFileName':'spain.png',
        'flagCssClass':'country-img-spain'
    }
}
inputFolder = '/Users/kesiena/Dropbox (MIT)/MIT/MartinTrustCenterRA/REAP Dashboard/csv/'
outputFile = '/Users/kesiena/Dropbox (MIT)/Sites/reap/assets/js/dashboard-data.js'
outputData = OrderedDict({})
regionName = ''

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
    for i in range(rowStart, rowEnd):
        label = all_rows[i][0]
        if label.startswith('Team member -') or 'Team member' == label:
            role = stakeholdermap[label]
            team_list.append({'name': all_rows[i][3], 'sh': role, 'desc': all_rows[i][4]})
    outputData[regionName]['team'] = team_list

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

def addChartData(dates, cols, name, src_name='', src_url=''):
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
    outputData[regionName][name] = data

def addRegionData(region):
    global regionName
    regionName = region
    rows = []
    dates = []
    input_file = inputFolder + regionName + '.csv'
    with open(input_file, 'rb') as f:
        reader = csv.reader(f)
        try:
            for row in reader:
                rows.append(row)
                # print row
        except csv.Error as e:
            sys.exit('file %s, line %d: %s' % (input_file, reader.line_num, e))
    colStart = 3;
    colEnd = 18;
    dates = rows[1][colStart:colEnd]
    createRegionDataSection()
    addKeyValuePair('name', rows[29][3])
    addRegionDescription(rows[30][3])
    if regionData.has_key(regionName):
        additionalKeyValuePairs = regionData[regionName]
        for key in additionalKeyValuePairs:
            addKeyValuePair(key, additionalKeyValuePairs[key])
    section2_row_start = 30
    section2_row_end = 95
    addTeam(rows, section2_row_start, section2_row_end)
    addTopClusters(rows, section2_row_start, section2_row_end)
    add_top_research_institutions(rows, section2_row_start, section2_row_end)
    add_regional_innovations(rows, section2_row_start, section2_row_end)
    add_business_parks(rows, section2_row_start, section2_row_end)
    add_regional_entrepreneurs(rows, section2_row_start, section2_row_end)
    add_icap_ppi(rows, section2_row_start, section2_row_end)
    add_ecap_ppi(rows, section2_row_start, section2_row_end)

    addChartData(dates, rows[2][colStart:colEnd], 'countryPopulation', rows[2][19], rows[2][20])
    addChartData(dates, rows[3][colStart:colEnd], 'regionPopulation', rows[3][19], rows[3][20])
    addChartData(dates, rows[5][colStart:colEnd], 'giniCoeff', rows[5][19], rows[5][20])
    addChartData(dates, rows[4][colStart:colEnd], 'humanDevIndex', rows[4][19], rows[4][20])
    addChartData(dates, rows[7][colStart:colEnd], 'domesticPatent', rows[7][19], rows[7][20])
    addChartData(dates, rows[8][colStart:colEnd], 'usPatent', rows[8][19], rows[8][20])
    addChartData(dates, rows[9][colStart:colEnd], 'publications', rows[9][19], rows[9][20])
    addChartData(dates, rows[10][colStart:colEnd], 'stemGrads', rows[10][19], rows[10][20])
    addChartData(dates, rows[11][colStart:colEnd], 'researchAndDev', rows[11][19], rows[11][20])
    addChartData(dates, rows[12][colStart:colEnd], 'ipRanking', rows[12][19], rows[12][20])
    addChartData(dates, rows[13][colStart:colEnd], 'gdpPerCap', rows[13][19], rows[13][20])
    addChartData(dates, rows[14][colStart:colEnd], 'corporations', rows[14][19], rows[14][20])
    addChartData(dates, rows[15][colStart:colEnd], 'entrepreneurship', rows[15][19], rows[15][20])
    addChartData(dates, rows[16][colStart:colEnd], 'vc', rows[16][19], rows[16][20])
    addChartData(dates, rows[17][colStart:colEnd], 'daysToStartBiz', rows[17][19], rows[17][20])
    addChartData(dates, rows[24][colStart:colEnd], 'employment', rows[24][19], rows[24][20])

if __name__ == "__main__":
    for r in regions:
        addRegionData(r)
    print json.dumps(outputData, indent=2, ensure_ascii=False)
    with open(outputFile, "w") as text_file:
        text_file.write("var regionData = ")
        text_file.write(json.dumps(outputData, indent=2, ensure_ascii=False))
    print "Done"
