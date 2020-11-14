# **Service Evaluate API General Document**

- Service Evaluate API (Temporary Naming) is an API which will allows you to record the real state pricing, status, owner information etc... All of those datas is coming from [591](https://www.591.com.tw/). Here we only store the datas and categorize or filtering the data to you. In the future, we are planning to add recommendation service to this API base on the datas we have.

## **Partner API Rate Limits**

- Service Evaluate API Rate Limits are tracked on an individual applicaiton, depending on type of `IP Address` used in the request.

### **Applications**

- API Requests made with an `IP Address` are counted against that app's rate limit. An app's call count is the number of calls it can make during a rolling one minutes window and is calculated as follows:

```
    Calls with one minutes = 100 * Number of Application
```
