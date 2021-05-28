---
title: The Notion API and Python - Create, Read, and Update
excerpt: Notion have released their API to public beta, so here is a quick guide to using it with Python.
date: 2021-05-28
permalink: /notion-api-python/
author: Martin Dawson
tags:
  - post
  - static
  - api
  - python
---

I recently made a video about using the Notion API with Python. It is a quick introduction to the Notion API and how to perform some basic functions like Creating, Reading and Updating records. Here are some code snippets from the video.

## Video

Here is the video I made about it:

<iframe width="560" height="315" src="https://www.youtube.com/embed/sdn1HgxLwEg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

And here is some of the code I used:

## Initialisation

    import requests, json

    token = 'YOUR-SECRET-NOTION-INTEGRATION-TOKEN'

    databaseId = 'YOUR-DATABASE-ID-HERE

    headers = {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
        "Notion-Version": "2021-05-13"
    }


## Read a Database

    def readDatabase(databaseId, headers):
        readUrl = f"https://api.notion.com/v1/databases/{databaseId}/query"

        res = requests.request("POST", readUrl, headers=headers)
        data = res.json()
        print(res.status_code)
        # print(res.text)

        with open('./db.json', 'w', encoding='utf8') as f:
            json.dump(data, f, ensure_ascii=False)

## Create a Page

    def createPage(databaseId, headers):

        createUrl = 'https://api.notion.com/v1/pages'

        newPageData = {
            "parent": { "database_id": databaseId },
            "properties": {
                "Description": {
                    "title": [
                        {
                            "text": {
                                "content": "Review"
                            }
                        }
                    ]
                },
                "Value": {
                    "rich_text": [
                        {
                            "text": {
                                "content": "Amazing"
                            }
                        }
                    ]
                },
                "Status": {
                    "rich_text": [
                        {
                            "text": {
                                "content": "Active"
                            }
                        }
                    ]
                }
            }
        }
        
        data = json.dumps(newPageData)
        # print(str(uploadData))

        res = requests.request("POST", createUrl, headers=headers, data=data)

        print(res.status_code)
        print(res.text)
    


## Update a Page

    def updatePage(padeId, headers):
        updateUrl = f"https://api.notion.com/v1/pages/{pageId}"

        updateData = {
            "properties": {
                "Value": {
                    "rich_text": [
                        {
                            "text": {
                                "content": "Pretty Good"
                            }
                        }
                    ]
                }        
            }
        }

        data = json.dumps(updateData)

        response = requests.request("PATCH", updateUrl, headers=headers, data=data)

        print(response.status_code)
        print(response.text)

## Conclusion

I hope that helps to get you started on the Notion API. I'll be making some more Notion API videos so keep an eye on the channel.

