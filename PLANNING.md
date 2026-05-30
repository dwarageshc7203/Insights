# Planning

## Iteration 1

## Modules

1. User
2. WorkSpace
3. Canvas
4. Component (Types: Node, Image, Text)
5. Edge

---

## Functions:

1. User: for authentication, user data handling, sign up, log in
2. WorkSpace: contains Canvas
3. Canvas: contains Components and Edges
4. Edge: connects source Components with final Components with arrow heads

---

## Relations:

- One User can have multiple WorkSpaces. The WorkSpace can be accessed only by the Owner [Further idea - Invite other Users as Collaborators]
- One WorkSpace can have multiple Canvas
- One Canvas can hold multiple Components and multiple Edges

---

## Entity Design:

### User

```
- int userId
- String userName
- String email
- String password
- List<WorkSpace> workspaces
- Instant createdAt
```

### WorkSpace

```
- int workSpaceId
- String workSpaceName
- User owner
- List<Canvas> canvas
- Instant createdAt
```

### Canvas

```
- int canvasId
- String canvasName
- WorkSpace workSpace
- List<Component> components
- List<Edge> edges
```


### Component

```
- int componentId
- String componentName
- Canvas canvas
- String type (using ENUM - Shape, Text, Image)
- String textContent
- String imageUrl
- String color
- double positionX
- double positionY
```

### Edge

```
- int edgeId
- String edgeName
- Canvas canvas
- String color (default: black)
- Component source
- Component target
```

---

## DTO Planning

**User**

*Request*
- userName
- email
- password

*Response*
- userId
- userName
- email
- workSpaces
- createdAt

(Password removed)


**WorkSpace**

*Request*
- workSpaceName
- userId

*Response*
- workSpaceId
- workSpaceName
- userId

[**WorkSpaceLoadDetailsResponse**
- workSpaceId
- workSpaceName
- userId
- canvas]


**Canvas**

*Request*
- canvasName
- workSpaceId

**Response**
- canvasId
- canvasName
- workSpaceId

[**CanvasLoadDetailsResponse**
- canvasId
- canvasName
- workSpaceId
- components
- edges]


**Component**

*Request*
- componentName
- componentType
- textContent
- imageUrl
- color
- position

**Response**
- componentId
- componentType
- textContent
- imageUrl
- color
- position


**Edge**

*Request*
- edgeName
- color
- source
- target

*Response*
- edgeId
- edgeName
- color
- source
- target

---

## Method Implementation

**User**

- registerUser (UserRequest)
- loginUser (UserRequest)

**WorkSpace**

- createWorkSpace (userId, WorkSpaceRequest)
- getWorkSpace (workSpaceId)
- getAllWorkSpaces (userId)
- deleteWorkSpace (workSpaceId)

**Canvas**

- createCanvas (workSpaceId, CanvasRequest)
- getCanvas (canvasId)
- getAllCanvas (workSpaceId)
- loadCanvas (canvasId)
- deleteCanvas (canvasId)

**Component**

- createComponent (canvasId, ComponentRequest)
- getComponent (componentId)
- updateComponent(componentId, ComponentRequest)
- deleteComponent (componentId)

**Edge**

- createEdge (canvasId, EdgeRequest)
- deleteEdge (edgeId)

---

## API routing

```
POST   /auth/register
POST   /auth/login

POST   /workspaces/{userId}
GET    /workspaces/{workSpaceId}
GET    /workspaces/user/{userId}
DELETE /workspaces/{workSpaceId}

POST   /canvases/{workSpaceId}
GET    /canvases/{canvasId}
GET    /canvases/workspace/{workSpaceId}
GET    /canvases/{canvasId}/load
DELETE /canvases/{canvasId}

POST   /components/{canvasId}
GET    /components/{componentId}
PUT    /components/{componentId}
DELETE /components/{componentId}

POST   /edges/{canvasId}
DELETE /edges/{edgeId}
```
