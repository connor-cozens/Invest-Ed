import sys

import mysql.connector as mysql
from mysql.connector import Error

import pandas as pd

from openpyxl import load_workbook  # For .xlsx conversion
import pyreadstat  # For .sav and .xpt conversion
from docx import Document  # For .docx conversion

def exportToCsv(name, df, attributes):
    # Open the csv file to write to
    file_name = name + '.csv'
    csv_file = open(file_name, 'w')

    # Write data frame to .CSV file
    df.to_csv(csv_file, header=True, columns=attributes)

    # Close file write stream
    csv_file.close()


def exportToSav(name, df, attributes):
    # Write data frame to sav (.SPSS) file
    file_name = name + '.sav'
    pyreadstat.write_sav(df, file_name, column_labels=attributes)


def exportToExcel(name, df):
    try:
        # Append data frame to excel (.XLSX) file
        with pd.ExcelWriter('output.xlsx', mode = 'a') as writer:
            if name == 'funder':
                df.to_excel(writer, sheet_name = 'Funder')
            elif name == 'initiative':
                df.to_excel(writer, sheet_name = 'Initiative')
            elif name == 'implementor':
                df.to_excel(writer, sheet_name = 'Implementor')

    # If excel file not created yet, make initial write to it
    except FileNotFoundError as e:
        # Write data frame to excel (.XLSX) file
        with pd.ExcelWriter('output.xlsx') as writer:
            if name == 'funder':
                df.to_excel(writer, sheet_name='Funder')
            elif name == 'initiative':
                df.to_excel(writer, sheet_name='Initiative')
            elif name == 'implementor':
                df.to_excel(writer, sheet_name='Implementor')


def exportToDocument(name, df):
    # Create document file object
    doc = Document()

    # Write data frame to word (.DOCX) file
    table = doc.add_table(df.shape[0] + 1, df.shape[1])
    table.style = 'Table Grid'

    # Add the header rows to the table
    for column in range(df.shape[1]):
        table.cell(0, column).text = df.columns[column]

    # Add the data rows to the table
    cells = table._cells
    for row in range(df.shape[0]):
        table.row_cells = cells[(row + 1) * df.shape[1]: (row + 2) * df.shape[1]]
        for column in range(df.shape[1]):
            table.row_cells[column].text = str(df.values[row, column])

    # Save the document file
    file_name = name + '.docx'
    doc.save(file_name)


def exportToXpt(name, df, attributes):
    # Write data frame to sas file transport format (.XPT)
    file_name = name + '.xpt'
    pyreadstat.write_xport(df, file_name, column_labels=attributes)


# Main method
def main():
    # Open connection with database
    connection = None
    try:
        # Set up database connection - change username, password and db name as needed
        connection = mysql.connect(user='root', passwd='password', db='inves431_girlsEd')
        print("Connection to MySQL DB successful")
    except Error as e:
        print("The error '{e}' occurred")

    # If connection to database can be made,
    # Get attributes and data rows, set into a tabular data collection frame, and write to appropriate files
    if connection is not None:
        entity_dict = {
            'funder': 'funder',
            'initiative': 'initiative',
            'implementor': 'implementor'
        }

        # Set up cursor and perform query for all rows of table
        cur = connection.cursor()

        try:
            if sys.argv[1] in entity_dict:
                cur.execute("select * from {0}" .format(entity_dict[sys.argv[1]]))

                # Get columns corresponding to attributes
                attributes = [col for col in cur.column_names]
                if len(attributes) > 0:
                    # Set data frame with rows
                    df = pd.DataFrame(cur.fetchall(), columns=attributes)
                    if len(df) > 0:
                        if sys.argv[2] == 'all':
                            exportToCsv(sys.argv[1], df, attributes)
                            exportToSav(sys.argv[1], df, attributes)
                            exportToExcel(sys.argv[1], df)
                            exportToDocument(sys.argv[1], df)
                            exportToXpt(sys.argv[1], df, attributes)
                        elif sys.argv[2] == 'csv':
                            exportToCsv(sys.argv[1], df, attributes)
                        elif sys.argv[2] == 'sav':
                            exportToSav(sys.argv[1], df, attributes)
                        elif sys.argv[2] == 'excel':
                            exportToExcel(sys.argv[1], df)
                        elif sys.argv[2] == 'word':
                            exportToDocument(sys.argv[1], df)
                        elif sys.argv[2] == 'sas':
                            exportToXpt(sys.argv[1], df, attributes)
                        else:
                            print('Invalid file format')
                    else:
                        print('No data is available to be retrieved')
                else:
                    print('No table attributes found')
        except IndexError as e:
            print("Missing argument(s)")

    # Close database connection
    cur.close()
    connection.close()

if __name__ == "__main__":
    main()