---
title: How To Read Excel Files With Python (xlrd)
excerpt: If you need the power of Python to read files from Microsoft Excel, so as you can analyse, and crunch a large set of data, one of the Python packages you can use to do this is xlrd
date: 2020-07-14
permalink: /how-to-read-excel-files-with-python-xlrd/
author: Martin Dawson
tags:
  - post
  - python
  - excel
---

## Introduction

I LOVE Excel. For many years, in many jobs, I've used it to do all kinds of things. I've always said that it is because I am inherently lazy that I spend a lot of time using the power of Excel to do all my work for me. If my boss wanted me to take a load of data and produce a report, then I would just employ Excel to consume the data and have another worksheet working hard to turn it in to something presentable, while I pretend that I'm working really hard.

But there are some occasions where it's too hard to hack around limitations of Excel (and VBA) and you need to do a bit more heavy lifting. That's where Python can help, and in particular, a Python package called `xlrd`

There are other ways to read Excel files using Python, e.g. with Pandas, but I may well cover those in separate articles.

## Objectives

In this article I'm going to show you how to open and read an Excel Workbook (with a `.xlsx` extension) and read from cells, and worksheets.

## Install and import xlrd

`xlrd` is not in Pythons Standard Library, so it needs to be installed. The full documentation can be found [here](https://xlrd.readthedocs.io/en/latest/#).

To install `xlrd` we need to go to the Command Line and type:

	pip install xlrd

And at the start of our Python program it can be imported by including the line

	import xlrd

## Opening a Workbook

When we talk about Excel files, what that means is Workbooks. Excel has a hierarchy of objects, and a file with a .xlsx extension is a Workbook. Each Workbook can contain multiple Worksheets, and each Worksheet contains cells that can be referenced by rows (indicated by a number) and columns (indicated by a letter).

With `xlrd` to open a Workbook, you use the `open_workbook` command and assign it to a variable:

	workbookData = xlrd.open_workbook("myWorkbook.xlsx")


Now, the variable `workbookData` contains everything about that Excel workbook. 

## Worksheets

We probably want to find out about the Worksheets that are in this Workbook. There is a `sheet_names()` object which is a list of all the worksheets.

	workbookSheets = workbookData.sheet_names()
	print(workbookSheets)

If you know you want a worksheet named "Budget" then you can get that by typing:

	budgetSheet = workbookData.sheet_by_name('Budget')

Supposing you didn't know what the worksheet was called, but you knew it was the first one in the Workbook, then you could also just reference it by its index. Worksheets are zero-indexed in `xlrd`, so to get the first worksheet, we would type:

	budgetSheet = workbookData.sheet_by_index(0)

Once you had that sheet, you could find out information about it, like the name of the sheet:

	budgetSheetName = budgetSheet.name
	print(f"Sheet Name: {budgetSheetName}")

## Rows and Columns

This is what our budget worksheet looks like. 

![Budget Worksheet](/assets/img/how-to-read-excel-files-with-python-xlrd/budget-worksheet.png)

Like worksheets, rows and columns are also zero-indexed, so the third row can be referenced by typing:

	thirdRow = budgetSheet.row(0)

And the first column can be referenced by:

	firstCol = budgetSheet.col(0)

Both these commands return a list of all the cells, with the type (e.g. text, number, etc) and value of the cell.

Let's print them out and have a look:

	print(thirdRow)
	print(firstCol)

	[text:'Food', number:500.0]
	[text:'Budget 2020', text:'Rent', text:'Food', text:'Insurance']

If you just want the values of the cells, you can simply say:

	thirdRow = budgetSheet.row_values(2)
	print(thirdRow)

and this would return:

	['Food', 500.0]

If you want to know how many rows and columns are present in the worksheet, `nrows` and `ncols` will help.

	numRows = budgetSheet.nrows
	numCols = budgetSheet.ncols

	print(f"There are {numRows} rows and {numCols} columns in this sheet")

And running this, will produce this line of text:

	print(f"There are {numRows} rows and {numCols} columns in this sheet")

## Cells

Finally, if we know what cell we are looking for, we can simplty return the value of that one cell. 

For instance, cell A1 in the sheet has the value 'Budget 2020'. Rather than reading the first row or column, and getting the first value of the list, we can simply give the row and column reference to the `cell_value` method.

	cellA1Value = budgetSheet.cell_value(0,0)

## Conclusion

This has been a whistle stop tour of `xlrd`. There is a lot more it can do for you, like information about dates, formatting and ranges. But to simply start you off, this short post has demonstrated how to open a workbook, find out how many worksheets it contains, and enable you to find the value and type of each cell that has a value in it.

I hope you find this useful. Comping up, I'll be writing another post on how to write data to Excel files from Python and this will help to use Python as a place to inject some seriously powerful possibilities to your data workflow.


