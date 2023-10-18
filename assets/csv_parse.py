
import csv
import json
 
 
# Function to convert a CSV to JSON
# Takes the file paths as arguments
def make_json(csvFilePath, jsonFilePath):
     
    # create a dictionary
    data = {}
     
    # Open a csv reader called DictReader
    with open(csvFilePath, encoding='utf-8', errors="ignore") as csvf:
        csvReader = csv.reader(csvf)
         
        # Convert each row into a dictionary 
        # and add it to data
        count = 0
        for rows in csvReader:
            if (count == 0):
                count+=1
            else:
                key = str(count)
                data[key] = rows
                count+= 1
 
    # Open a json writer, and use the json.dumps() 
    # function to dump data
    with open(jsonFilePath, 'w', encoding='utf-8') as jsonf:
        jsonf.write(json.dumps(data, indent=4))
         
# Driver Code
 
# Decide the two file paths according to your 
# computer system
csvFilePath = "assets\\user-made-question-bank.csv"
jsonFilePath = "assets\\questionBank.json"
 
# Call the make_json function
make_json(csvFilePath, jsonFilePath)


#This is NOT original core. It was taken from https://www.geeksforgeeks.org/convert-csv-to-json-using-python/
#This is a tool to make creating questions easier to make and then save them into a JSOn file for use. 
#It has been modified to work on my local machine and to function at all