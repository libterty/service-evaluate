# **Profile API Document**

- Rate Route is used to searching or creating rate record.

## **General Interface**

```typescript
  interface IFurniture {
    refrigerator?: boolean;
    conditioner?: boolean;
    gas?: boolean;
    bed?: boolean;
    desk?: boolean;
    chair?: boolean;
    sofa?: boolean;
    laundry?: boolean;
    heater?: boolean;
    cable?: boolean;
    internet?: boolean;
    wardrobe?: boolean;
    tv?: boolean;
  }

  interface IPrice {
    deposit: number;
    monthlyPrice: number;
    managementFee: number;
    parkingFee: number;
  }

  interface ITransport {
    bus?: boolean;
    hsr?: boolean;
    publicBike?: boolean;
    subway?: boolean;
    train?: boolean;
  }

  interface IRate {
    vender: string;
    owner: string;
    averageRate: number;
    quiteRate: number;
    locationRate: number;
    houseConiditionRate: number;
    houseOwnerRate: number;
    rateCount: number;
    furniture: IFurniture;
    transport: ITransport;
    price: IPrice;
  }
```

## **Search All Rate Records:**

- Record all rate transactions allow you to search Rate data. And it's default with pagination design which start with first pages. With slow query methods we will log your action to database for security references at next step.

### **Parameter in Search All Rate Records:**

| Parameter             | Description                                                                                | Type         | In         |
| --------              | --------                                                                                   | --------     | --------   |
| takes(Required)       | Offset (paginated) - where from entities should be taken.                                  | number       | Query      |
| skip(Required)        | Limit (paginated) - max number of entities should be taken.                                | number       | Query      |

### **Method**

`GET /v1.0/api/rates?takes=<takes>&skip=<skip>`

#### **Success Response**

- **Code:** 200 <br />
  **Content**
  ```typescript
  {
    "rates": IRate[],
    "count": number,
  }
  ```

#### **Error Response**

- **Code:** 400 <br />
  **Content** `{ status: "error", error: "Skip Must be a Integer" | "Take Must be a Integer", }`

- **Code:** 404 <br />
  **Content** `{ status: "error", error: "Rate Not Found", }`

- **Code:** 500 <br />
  **Content** `{ status: "error", error: string, }`

#### Example Request

```bash
curl --request GET '/v1.0/api/rates?takes=<takes>&skip=<skip>'
```

-----------

## **Get Rate Record By Id:**

- Record rate transaction data by Primary Key.

| Parameter             | Description                                                                                | Type         | In         |
| --------              | --------                                                                                   | --------     | --------   |
| id(Required)          | Primary Key of the Rate Table                                                              | number       | Param      |

### **Method**

`GET /v1.0/api/rates/<rateId>`

#### **Success Response**

- **Code:** 200 <br />
  **Content**
  ```typescript
  {
    IRate
  }
  ```

#### **Error Response**

- **Code:** 400 <br />
  **Content** `{ status: "error", error: "Id Must be a Integer", }`

- **Code:** 404 <br />
  **Content** `{ status: "error", error: "Rate <RateId> Not Found", }`

- **Code:** 500 <br />
  **Content** `{ status: "error", error: string, }`

#### Example Request

```bash
curl --request GET '/v1.0/api/rates/<rateId>'
```

#### Example Request

```bash
{
    "id": 7,
    "vender": "591 租屋網",
    "owner": "lib-test3",
    "averageRate": 5,
    "quiteRate": 1,
    "locationRate": 8,
    "houseConiditionRate": 9,
    "houseOwnerRate": 3,
    "rateCount": 1,
    "furniture": {
        "id": 3,
        "refrigerator": false,
        "conditioner": false,
        "gas": false,
        "bed": false,
        "desk": false,
        "chair": false,
        "sofa": false,
        "laundry": false,
        "heater": false,
        "cable": false,
        "internet": false,
        "wardrobe": false,
        "tv": false
    },
    "transport": {
        "id": 3,
        "bus": false,
        "hsr": false,
        "publicBike": false,
        "subway": false,
        "train": false
    },
    "price": {
        "id": 3,
        "deposit": 30000,
        "monthlyPrice": 15000,
        "managementFee": 0,
        "parkingFee": 200
    }
}
```

-----------

## **Create Rate Record:**

- Record all user transactions allow you to search Rate data. And it's default with pagination design which start with first pages. With slow query methods we will log your action to database for security references at next step.

### **Parameter in Create Rate Record**

| Parameter             | Description                                                                                | Type         | In         |
| --------              | --------                                                                                   | --------     | --------   |
| quiteRate(Required)   | Noise rate around the house.                                                               | number       | body       |
| locationRate(Required)| Location rate around house.                                                                | number       | body       |
| houseOwnerRate(Required)| House Owner rate.                                                                        | number       | body       |
| monthlyPrice(Required)| monthlyPrice Amount.                                                                       | number       | body       |
| vender(Required)      | vender name.                                                                               | string       | body       |
| owner(Required)       | owner name.                                                                                | string       | body       |
| deposit(Required)     | deposit Amount.                                                                            | number       | body       |
| monthlyPrice(Required)| monthlyPrice Amount.                                                                       | number       | body       |
| managementFee(Required)| managementFee Amount.                                                                     | number       | body       |
| parkingFee(Required)  | parkingFee Amount.                                                                         | number       | body       |
| bus(Optional)         | Bus Transportation.                                                                        | boolean      | body       |
| hsr(Optional)         | Hsr Transportation.                                                                        | boolean      | body       |
| publicBike(Optional)  | publicBike Transportation.                                                                 | boolean      | body       |
| subway(Optional)      | subway Transportation.                                                                     | boolean      | body       |
| train(Optional)       | train Transportation.                                                                      | boolean      | body       |
| refrigerator(Optional)| refrigerator furniture.                                                                    | boolean      | body       |
| conditioner(Optional) | conditioner furniture.                                                                     | boolean      | body       |
| gas(Optional)         | gas furniture.                                                                             | boolean      | body       |
| bed(Optional)         | bed furniture.                                                                             | boolean      | body       |
| desk(Optional)        | desk furniture.                                                                            | boolean      | body       |
| chair(Optional)       | chair furniture.                                                                           | boolean      | body       |
| sofa(Optional)        | sofa furniture.                                                                            | boolean      | body       |
| laundry(Optional)     | laundry furniture.                                                                         | boolean      | body       |
| heater(Optional)      | heater furniture.                                                                          | boolean      | body       |
| cable(Optional)       | cable furniture.                                                                           | boolean      | body       |
| internet(Optional)    | internet furniture.                                                                        | boolean      | body       |
| wardrobe(Optional)    | wardrobe furniture.                                                                        | boolean      | body       |
| tv(Optional)          | tv furniture.                                                                              | boolean      | body       |


### **Method**

`POST /v1.0/api/rates`

- **Code:** 200 <br />
  **Content**
  ```typescript
  {
    IRate
  }
  ```

#### **Error Response**

- **Code:** 400 <br />
  **Content** `{ statusCode: 400, error: "Bad Request"; message: "Bad Request" | "Error Message"[], }`

- **Code:** 409 <br />
  **Content** `{ status: "error", error: "Rate Create Fail", }`

- **Code:** 500 <br />
  **Content** `{ status: "error", error: string, }`

#### Example Request

```bash
curl --request POST '/v1.0/api/rates' \
--header 'Content-Type: application/json' \
--data-raw '{
    "vender": "591 租屋網",
    "owner": "lib-test1",
    "quiteRate": 3,
    "locationRate": 8,
    "houseConiditionRate": 9,
    "houseOwnerRate": 3,
    "furniture": {},
    "transport": {},
    "price": {
        "deposit": 30000,
        "monthlyPrice": 15000,
        "managementFee": 0,
        "parkingFee": 200
    }
}'
```

## **Update Rate Record By Id:**

- Update rate transaction data by Primary Key.

### **Parameter in Create Rate Record**

| Parameter             | Description                                                                                | Type         | In         |
| --------              | --------                                                                                   | --------     | --------   |
| id(Required)          | Primary Key of the Rate Table.                                                             | number       | param       |
| quiteRate(Optional)   | Noise rate around the house.                                                               | number       | body       |
| locationRate(Optional)| Location rate around house.                                                                | number       | body       |
| houseOwnerRate(Optional)| House Owner rate.                                                                        | number       | body       |
| monthlyPrice(Optional)| monthlyPrice Amount.                                                                       | number       | body       |
| vender(Optional)      | vender name.                                                                               | string       | body       |
| owner(Optional)       | owner name.                                                                                | string       | body       |
| deposit(Optional)     | deposit Amount.                                                                            | number       | body       |
| monthlyPrice(Optional)| monthlyPrice Amount.                                                                       | number       | body       |
| managementFee(Optional)| managementFee Amount.                                                                     | number       | body       |
| parkingFee(Optional)  | parkingFee Amount.                                                                         | number       | body       |
| bus(Optional)         | Bus Transportation.                                                                        | boolean      | body       |
| hsr(Optional)         | Hsr Transportation.                                                                        | boolean      | body       |
| publicBike(Optional)  | publicBike Transportation.                                                                 | boolean      | body       |
| subway(Optional)      | subway Transportation.                                                                     | boolean      | body       |
| train(Optional)       | train Transportation.                                                                      | boolean      | body       |
| refrigerator(Optional)| refrigerator furniture.                                                                    | boolean      | body       |
| conditioner(Optional) | conditioner furniture.                                                                     | boolean      | body       |
| gas(Optional)         | gas furniture.                                                                             | boolean      | body       |
| bed(Optional)         | bed furniture.                                                                             | boolean      | body       |
| desk(Optional)        | desk furniture.                                                                            | boolean      | body       |
| chair(Optional)       | chair furniture.                                                                           | boolean      | body       |
| sofa(Optional)        | sofa furniture.                                                                            | boolean      | body       |
| laundry(Optional)     | laundry furniture.                                                                         | boolean      | body       |
| heater(Optional)      | heater furniture.                                                                          | boolean      | body       |
| cable(Optional)       | cable furniture.                                                                           | boolean      | body       |
| internet(Optional)    | internet furniture.                                                                        | boolean      | body       |
| wardrobe(Optional)    | wardrobe furniture.                                                                        | boolean      | body       |
| tv(Optional)          | tv furniture.                                                                              | boolean      | body       |

### **Method**

`PUT /v1.0/api/rates/<rateId>`

- **Code:** 200 <br />
  **Content**
  ```typescript
  {
    status: "success",
    message: "Update Rate: <rateId> success"
  }
  ```

#### **Error Response**

- **Code:** 400 <br />
  **Content** `{ statusCode: 400, error: "Bad Request"; message: "Bad Request" | "Error Message"[], }`

- **Code:** 409 <br />
  **Content** `{ status: "error", error: "Rate Update Fail", }`

- **Code:** 500 <br />
  **Content** `{ status: "error", error: string, }`

#### Example Request

```bash
curl --request PUT '/v1.0/api/rates/<rateId>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "vender": "591 租屋網",
    "owner": "lib-test1",
    "quiteRate": 3,
    "locationRate": 8,
    "houseConiditionRate": 9,
    "houseOwnerRate": 3,
    "furniture": {},
    "transport": {},
    "price": {
        "deposit": 30000,
        "monthlyPrice": 15000,
        "managementFee": 0,
        "parkingFee": 200
    }
}'
```