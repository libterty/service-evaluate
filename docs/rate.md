# **Profile API Document**

- Rate Route is used to searching or creating rate record.

## **Pre-Requirements**

## **Search All Rate Records:**

- Record all user transactions allow you to search Rate data. And it's default with pagination design which start with first pages. With slow query methods we will log your action to database for security references at next step.

### **Parameter in Search All Rate Records:**

| Parameter             | Description                                                                                | Type         | In         |
| --------              | --------                                                                                   | --------     | --------   |
| takes(Optional)       | Offset (paginated) - where from entities should be taken.                                  | number       | Query      |
| skip(Optional)        | Limit (paginated) - max number of entities should be taken.                                | number       | Query      |

### **Method**

`GET /v1.0/api/rates?takes=<takes>&skip=<skip>`

### **Interfaces**

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
    furniture: IFurniture;
    transport: ITransport;
    price: IPrice;
  }
  ```

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
  **Content** `{ status: "error", error: "Get Rates Error", }`

#### Example Request

```bash
curl --request GET '/v1.0/api/rates?takes=<takes>&skip=<skip>'
```

## **Create Rate Record:**

- Record all user transactions allow you to search Rate data. And it's default with pagination design which start with first pages. With slow query methods we will log your action to database for security references at next step.

### **Parameter in Create Rate Record**

| Parameter             | Description                                                                                | Type         | In         |
| --------              | --------                                                                                   | --------     | --------   |
| averageRate(Required) | Average rate of the house.                                                                 | number       | body       |
| noiseRate(Required)   | Noise rate around the house.                                                               | number       | body       |
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

### **Interfaces**

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
    noiseRate: number;
    locationRate: number;
    houseConiditionRate: number;
    houseOwnerRate: number;
    furniture: IFurniture;
    transport: ITransport;
    price: IPrice;
  }
  ```

#### **Success Response**

- **Code:** 200 <br />
  **Content**
  ```typescript
  IRate
  ```

#### **Error Response**

- **Code:** 400 <br />
  **Content** `{ statusCode: 400, error: "Bad Request"; message: "Bad Request" | "Error Message"[], }`

- **Code:** 409 <br />
  **Content** `{ status: "error", error: "Rate Creat Fail", }`

- **Code:** 500 <br />
  **Content** `{ status: "error", error: "Create Rate Error", }`

#### Example Request

```bash
curl --request POST '/v1.0/api/rates' \
--header 'Content-Type: application/json' \
--data-raw '{
    "vender": "591 租屋網",
    "owner": "lib-test1",
    "averageRate": 7,
    "noiseRate": 3,
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
