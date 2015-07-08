__author__ = 'kesiena'
import csv, sys
from decimal import *
import json
from collections import OrderedDict

'''
Steps
* Highlight the numbers in the spreasheet and convert them to excel "General" type. This will remove all commas from
    large numbers
* Save the spreadsheets with the right names (see regions array below) and the right csv format (Windows Comma
    Separated)
* Save all the csv files in the same folder and then update the 'inputFolder' variable. Also update the 'outputFolder'
* update the regions array by removing the name of any missing file
* run this script
'''

# The following names should correspond to the file names. Also, the json objects will have these names
regions = ['london', 'morocco', 'moscow', 'puertorico', 'qatar', 'seoul', 'singapore', 'valencia']
# regions = ['morocco']

regionData = {
    'london': {
        'imgFileName':'uk.png',
        'flagCssClass':'country-img',
        'description1':'London has a large number of start-up businesses and fantastic entrepreneurial ecosystem supporting theses businesses including incubators and accelerators, investors and talented graduates.',
        'description2':'Where the support for businesses could be strengthened is when businesses are looking to rapidly scale.'
    },
    'morocco': {
        'imgFileName':'morocco.png',
        'flagCssClass':'country-img-wide',
        'description1':'Introductory snippet about Morocco',
        'description2':'Additional details about Morocco.'
    },
    'moscow': {
        'imgFileName':'russia.png',
        'flagCssClass':'country-img-wide',
        'description1':'Introductory snippet about Moscow',
        'description2':'Additional details about Moscow.'
    },
    'puertorico': {
        'imgFileName':'puertorico.png',
        'flagCssClass':'country-img-pr',
        'description1':'',
        'description2':''
    },
    'qatar': {
        'imgFileName':'qatar.png',
        'flagCssClass':'country-img-qatar',
        'description1':'',
        'description2':''
    },
    'seoul': {
        'imgFileName':'korea.png',
        'flagCssClass':'country-img-seoul',
        'description1':'',
        'description2':''
    },
    'singapore': {
        'imgFileName':'singapore.png',
        'flagCssClass':'country-img-wide',
        'description1':'',
        'description2':''
    },
    'valencia': {
        'imgFileName':'spain.png',
        'flagCssClass':'country-img-spain',
        'description1':'',
        'description2':''
    }
}
inputFolder = '/Users/kesiena/Dropbox (MIT)/MIT/MartinTrustCenterRA/REAP Dashboard/csv/'
output = ''
outputData = OrderedDict({})
regionName = ''

def createRegionDataSection():
    outputData[regionName] = OrderedDict({})

def addKeyValuePair(key, value):
    outputData[regionName][key] = value

stakeholdermap = {
    'Team member - entrepreneur': 'entrepreneur',
    'Team member - university': 'university',
    'Team member - corporate': 'corporate',
    'Team member - government': 'government',
    'Team member - risk capital': 'riskcapital',
    'Team member - champion': 'champion',
}

def addTeam(all_rows):
    label = ''
    team_count = 0
    team_list = []
    for i in range(57,77):
        label = all_rows[i][0]
        if label.startswith('Team member -'):
            role = stakeholdermap[label]
            team_list.append({'name': all_rows[i][3], 'sh': role, 'desc': all_rows[i][4]})
    outputData[regionName]['team'] = team_list

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
    if regionData.has_key(regionName):
        additionalKeyValuePairs = regionData[regionName]
        for key in additionalKeyValuePairs:
            addKeyValuePair(key, additionalKeyValuePairs[key])
    addTeam(rows)

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
    print json.dumps(outputData, indent=2)
