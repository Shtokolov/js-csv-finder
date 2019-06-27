# JS CSV Finder

##### Getting started
######Install required dependencies
Install Node.js v12.4.0 from [nodejs.org](https://nodejs.org) and in the project root directory enter the following command at a Bash or Windows command prompt

``npm i``  or  ``npm install``

###### Place csv files in "CSV-files" directory
Structure example:

    [Project root directory]
    ├──CSV-files
    │   ├──ASA-24v1-0_A1.csv
    │   └──snps-of-interest.csv
    ├──index.js
    ├──package.json
    └──...


##### 🚀 Run app

For running app without additional configuration

``npm run js-csv-finder`` 


---
##### Extended mode

For "extended mode"- (write in output file additional information as line index in a target file, row in a target file) run:

``extendedMode=true node index.js``

##### Change files paths [optional]

To change files paths run app whit additional environment variables:

outputFilePath="Type String" example:

``outputFilePath='./output.csv' node index.js``

snpsFilePath="Type String"

``snpsFilePath='./CSV-files/snps-of-interest.csv' node index.js``

targetFilePath="Type String"

``targetFilePath='./CSV-files/ASA-24v1-0_A1.csv' node index.js``


