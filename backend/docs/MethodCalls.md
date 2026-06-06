# TESTING RESULTS

## User

1) POST http://localhost:8080/auth/sync
    
    Body: 

    ```
   {
        "userId": "550e8400-e29b-41d4-a716-446655440000",
        "userName": "testuser",
        "email": "test@gmail.com"
    }
   ```
    Response: 200 OK
    
    ```
   {
        "userId": "550e8400-e29b-41d4-a716-446655440000",
        "userName": "testuser",
        "email": "test@gmail.com",
        "createdAt": "2026-05-31T12:17:35.026586Z"
    }
   ```

---

---

## WorkSpace

1) POST http://localhost:8080/workspace/user/550e8400-e29b-41d4-a716-446655440000

   Body:

    ```
   {
        "workSpaceName" : "TestSpace"
    }
   ```
   Response: 201 CREATED

    ```
   {
        "workSpaceId": 2,
        "workSpaceName": "TestSpace",
        "userId": "550e8400-e29b-41d4-a716-446655440000",
        "createdAt": "2026-05-31T12:28:20.172512Z"
    }
   ```

---

2) GET http://localhost:8080/workspace/1

   Response: 200 OK

    ```
   {
        "workSpaceId": 1,
        "workSpaceName": "TestSpace",
        "userId": "550e8400-e29b-41d4-a716-446655440000",
        "createdAt": "2026-05-31T12:28:19.539360Z"
    }
   ```

---

3) GET http://localhost:8080/workspace/user/550e8400-e29b-41d4-a716-446655440000

   Response: 200 OK

    ```
   [
        {
            "workSpaceId": 1,
            "workSpaceName": "TestSpace",
            "userId": "550e8400-e29b-41d4-a716-446655440000",
            "createdAt": "2026-05-31T12:28:19.539360Z"
        },
        {
            "workSpaceId": 2,
            "workSpaceName": "TestSpace",
            "userId": "550e8400-e29b-41d4-a716-446655440000",
            "createdAt": "2026-05-31T12:28:20.172512Z"
        }
    ]
   ```

---

3) DELETE http://localhost:8080/workspace/1

   Response: 204 NO CONTENT

---

---

## Canvas

1) POST http://localhost:8080/canvas/workspace/2

   Body:

    ```
   {
        "canvasName" : "TestCanvas"
    }
   ```
   Response: 201 CREATED

    ```
   {
        "canvasId": 1,
        "canvasName": "TestCanvas",
        "workSpaceId": 2
    }
   ```

---

2) GET http://localhost:8080/canvas/1

   Response: 200 OK

    ```
   {
        "canvasId": 1,
        "canvasName": "TestCanvas",
        "workSpaceId": 2
    }
   ```

---

3) GET http://localhost:8080/canvas/workspace/2

   Response: 200 OK

    ```
   [
        {
            "canvasId": 1,
            "canvasName": "TestCanvas",
            "workSpaceId": 2
        }
    ]
   ```

---

4) DELETE http://localhost:8080/canvas/1

   Response: 204 NO CONTENT

---

---

## Component

1) POST http://localhost:8080/component/canvas/1

   Body:

    ```
   {
        "componentName": "First Node",
        "componentType": "NODE",
        "textContent": "Hello",
        "color": "#ffffff",
        "positionX": 100.0,
        "positionY": 200.0
    }
   ```
   Response: 201 CREATED

    ```
   {
        "componentId": 1,
        "componentName": "First Node",
        "componentType": "NODE",
        "textContent": "Hello",
        "imgUrl": null,
        "color": "#ffffff",
        "positionX": 100.0,
        "positionY": 200.0
    }
   ```

---

2) GET http://localhost:8080/component/1

   Response: 200 OK

    ```
   {
        "componentId": 1,
        "componentName": "First Node",
        "componentType": "NODE",
        "textContent": "Hello",
        "imgUrl": null,
        "color": "#ffffff",
        "positionX": 100.0,
        "positionY": 200.0
    }
   ```

---

3) DELETE http://localhost:8080/component/1

   Response: 204 NO CONTENT

---

---

## Edge

1) POST http://localhost:8080/edge/canvas/1

   Body:

    ```
   {
       "edgeName": "connection",
        "color": "#000000",
        "sourceId": 1,
        "targetId": 2
    }
   ```
   Response: 201 CREATED

    ```
   {
        "edgeId": 1,
        "edgeName": "connection",
        "color": "#000000",
        "sourceId": 1,
        "targetId": 2
    }
   ```

---


2) DELETE http://localhost:8080/edge/1

   Response: 204 NO CONTENT

---