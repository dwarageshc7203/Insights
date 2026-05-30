# INSIGHTS REPOSITORY - COMPREHENSIVE ANALYSIS

## 1. PROJECT OVERVIEW
**Project Name:** Insights  
**Purpose:** A planning and thinking structuring application that helps users organize raw thoughts into structured formats  
**Current Version:** 0.0.1-SNAPSHOT  
**Owner:** dwarageshc7203  
**Status:** Early-stage development (partially built)

---

## 2. TECHNOLOGY STACK

### Backend Framework:
- Spring Boot 4.0.6 (Java 17)
- Spring Data JPA (ORM)
- Spring Security (authentication/authorization)
- Spring Validation
- Spring Web MVC

### Database:
- PostgreSQL (runtime dependency)
- Jakarta Persistence API (JPA)

### Build Tool:
Maven with Java 17 compiler

### Additional Libraries:
- Lombok (code generation for boilerplate)
- Hibernate (JPA implementation via Spring Boot)

---

## 3. DIRECTORY STRUCTURE

```
Insights/
├── README.md
├── LICENSE
├── .gitattributes
└── backend/                          # Main backend application
    ├── pom.xml                       # Maven configuration
    ├── mvnw / mvnw.cmd              # Maven wrapper scripts
    ├── TODO.md                       # Development roadmap
    ├── .gitignore
    ├── .mvn/wrapper/                 # Maven wrapper configuration
    ├── .idea/                        # IntelliJ IDEA config
    ├── src/
    │   ├── main/
    │   │   ├── java/com/dwaragesh/insights/
    │   │   │   ├── BackendApplication.java          # Main Spring Boot entry point
    │   │   │   ├── controller/                      # REST API endpoints
    │   │   │   │   ├── UserController.java
    │   │   │   │   ├── WorkSpaceController.java
    │   │   │   │   ├── CanvasController.java
    │   │   │   │   └── ComponentController.java
    │   │   │   ├── service/                         # Business logic
    │   │   │   │   ├── UserService.java
    │   │   │   │   ├── WorkSpaceService.java
    │   │   │   │   ├── CanvasService.java
    │   │   │   │   └── ComponentService.java
    │   │   │   ├── repository/                      # Data access layer
    │   │   │   │   ├── UserRepository.java
    │   │   │   │   ├── WorkSpaceRepository.java
    │   │   │   │   ├── CanvasRepository.java
    │   │   │   │   └── ComponentRepository.java
    │   │   │   ├── model/                           # JPA entities
    │   │   │   │   ├── User.java
    │   │   │   │   ├── WorkSpace.java
    │   │   │   │   ├── Canvas.java
    │   │   │   │   ├── Component.java
    │   │   │   │   └── Edge.java
    │   │   │   └── dto/                             # Data Transfer Objects
    │   │   │       ├── User/
    │   │   │       │   ├── UserRequest.java
    │   │   │       │   └── UserResponse.java
    │   │   │       ├── WorkSpace/
    │   │   │       │   ├── WorkSpaceRequest.java
    │   │   │       │   └── WorkSpaceResponse.java
    │   │   │       ├── Canvas/
    │   │   │       │   ├── CanvasRequest.java
    │   │   │       │   └── CanvasResponse.java
    │   │   │       ├── Component/
    │   │   │       │   ├── ComponentRequest.java
    │   │   │       │   └── ComponentResponse.java
    │   │   │       └── Edge/
    │   │   │           ├── EdgeRequest.java
    │   │   │           └── EdgeResponse.java
    │   │   └── resources/
    │   │       └── application.properties           # Spring Boot configuration
    │   └── test/
    │       └── java/com/dwaragesh/insights/
    │           └── BackendApplicationTests.java
```

---

## 4. DATA MODEL & ENTITY RELATIONSHIPS

### Entity Hierarchy:

```
User (userid)
  ↓
  └─→ WorkSpace (workspaceid) [1-to-Many]
       ↓
       └─→ Canvas (canvasid) [1-to-Many]
            ├─→ Component (componentid) [1-to-Many]
            │    - Position array [x, y]
            │    - Content (text)
            └─→ Edge (edgeid) [1-to-Many]
                 - Connects components
                 - Has destination components
```

### Entity Details:

#### **User**
- `userId` (PK, int)
- `userName` (String)
- `email` (String)
- `createdAt` (Instant, auto-generated)
- `workSpaces` (One-to-Many with WorkSpace)

#### **WorkSpace**
- `workspaceid` (PK, int) - *Note: Field name has typo "workSpaced"*
- `workspaceName` (String)
- `owner` (Many-to-One with User, Foreign Key)
- `canvasList` (One-to-Many with Canvas)
- ⚠️ **Commented code:** Planned collaborators feature (multi-user workspaces)

#### **Canvas**
- `canvasId` (PK, int)
- `canvasName` (String)
- `userId` (int)
- `createdAt` (Instant, auto-generated)
- `nodes` (One-to-Many with Component) - *Comment suggests "need to accommodate other components"*
- `edges` (One-to-Many with Edge)
- `workspace` (Many-to-One with WorkSpace, FK: wid)

#### **Component**
- `componentId` (PK, int)
- `userId` (int)
- `contents` (String - text/data in component)
- `position` (int array - x, y coordinates)
- `createdAt` (Instant, auto-generated)
- `canvas` (Many-to-One with Canvas)

#### **Edge**
- `edgeId` (PK, int)
- `userId` (int)
- `destinations` (List<Component> - ⚠️ Not properly mapped in JPA)
- `createdAt` (Instant, auto-generated)
- `canvas` (Many-to-One with Canvas)
- ⚠️ **Incomplete:** Source nodes relationship commented out

---

## 5. REST API ENDPOINTS

### WorkSpace Endpoints (Partially Implemented)
- **POST** `createWorkSpace(uid, WorkSpaceRequest)` → Creates workspace for user
- **GET** `getWorkSpace(wid)` → Retrieves single workspace
- **GET** `getAllWorkSpaces(uid)` → Lists all workspaces for user
- ⚠️ **Not implemented:** Update, Delete operations

### Canvas Endpoints (Partially Implemented)
- **POST** `createCanvas(uid, CanvasRequest)` → Creates canvas for user
- **GET** `getCanvas(cid)` → Retrieves single canvas
- **GET** `getAllCanvas(uid)` → Lists all canvases for user

### Component Endpoints (Stub Only)
- **POST** `createComponent(ComponentRequest)` → ⚠️ Not implemented in service
- **GET** `getComponent(componentId)` → ⚠️ Not implemented in service
- **GET** `getAllComponent(userId)` → ⚠️ Not implemented in service

### User Endpoints (Not Implemented)
- Controllers defined but empty

### Edge Endpoints (Not Implemented)
- No controller created

---

## 6. SERVICE LAYER IMPLEMENTATION

### WorkSpaceService ✅ (Mostly Complete)
```
- createWorkSpace() → Creates & returns WorkSpaceResponse
- getWorkSpace() → Retrieves by ID
- getAllWorkSpace() → Lists for user
- ⚠️ deleteWorkSpace(), updateWorkSpace() commented out
```

### CanvasService ✅ (Mostly Complete)
```
- createCanvas() → Creates & returns CanvasResponse
- getCanvas() → Retrieves by ID
- getAllCanvas() → Lists for user
```

### ComponentService ❌ (Empty - Only has dependency injection)

### UserService ❌ (Empty - No implementation)

---

## 7. DTO (Data Transfer Objects)

### DTOs use Java Records (immutable, auto-generated equals/toString/hashCode)

| Entity | Request | Response |
|--------|---------|----------|
| User | uname, email, password | uid, uname, email, password, createdAt |
| WorkSpace | wName | wid, wName, owner (User) |
| Canvas | cName | cid, cName, uid, createdAt |
| Component | content, position[] | nid, uid, contents, position[], createdAt, canvas |
| Edge | sources[], destinations[] | eid, uid, sources[], destinations[], createdAt, canvas |

### Issues Found:
- `EdgeRequest/Response` reference `Node` class that **doesn't exist** (should be Component)
- `ComponentResponse` has typo: "createedAt" instead of "createdAt"
- `UserResponse` exposes password (security issue)

---

## 8. REPOSITORY LAYER

All repositories extend `JpaRepository<Entity, Integer>`:

| Repository | Custom Methods |
|------------|-----------------|
| UserRepository | None |
| WorkSpaceRepository | `findByOwner_UserId(uid)` |
| CanvasRepository | `findByUser_UserId(uid)` |
| ComponentRepository | None |

---

## 9. DEVELOPMENT STATUS (Based on TODO.md)

```
1) Model Creation                    ✅ DONE
2) Method ideation                   ⏳ IN PROGRESS
3) Controller method Creation        ⏳ PARTIALLY DONE
4) Service layer                     ⏳ PARTIALLY DONE
5) Repo layer                        ✅ DONE
6) Auth                              ❌ NOT STARTED
7) Front-End Designs                 ❌ NOT STARTED
```

---

## 10. CODE QUALITY ISSUES & INCOMPLETE FEATURES

### Critical Issues:
1. **Reference Error:** EdgeRequest/Response reference non-existent `Node` class
2. **Incomplete Edge Mapping:** Edge entity doesn't properly map source nodes (commented out)
3. **Missing Implementations:** ComponentService and UserService are empty shells
4. **Missing Route Mappings:** Controller methods missing @RequestMapping/@PostMapping/@GetMapping paths

### Design Issues:
1. **Typos in Field Names:** `workSpaced` instead of `workspaceId`, `createedAt` typo
2. **Security:** UserResponse exposes password
3. **No Error Handling:** Minimal exception handling, basic EntityNotFoundException only
4. **No Authentication/Authorization:** Spring Security imported but not configured
5. **Hardcoded userId:** Components/Canvas/Edges store userId redundantly (should use JPA relationships)
6. **Duplicate Data:** userId exists both as relationship and as standalone field

### Incomplete Features:
- Collaborators/shared workspaces (commented relationship)
- Edge source-destination relationships not properly modeled
- Update & delete endpoints
- User service completely empty
- Component CRUD operations
- Authentication endpoints
- Pagination/filtering
- Input validation (dependency imported but not used)

---

## 11. PROJECT STRUCTURE PATTERN

The project follows **3-tier layered architecture**:
```
Controller Layer (REST Endpoints)
    ↓
Service Layer (Business Logic)
    ↓
Repository Layer (Data Access)
    ↓
Database (PostgreSQL)
```

---

## 12. BUILD & RUN CONFIGURATION

- **Java Version:** 17
- **Spring Boot:** 4.0.6
- **Build Command:** `mvn clean install`
- **Run Command:** `mvn spring-boot:run`
- **Application Name:** backend
- **Server Port:** Default (8080)
- **Database:** PostgreSQL (connection details in application.properties - currently minimal)

---

## 13. KEY STATISTICS

- **Total Java Files:** 29
- **Controllers:** 4 (1 empty, 1 mostly empty, 2 partially implemented)
- **Services:** 4 (2 partially implemented, 2 empty)
- **Repositories:** 4 (all basic, some with custom queries)
- **Models/Entities:** 5 (all defined but with design issues)
- **DTOs:** 10 (5 request + 5 response classes)
- **Tests:** 1 (basic smoke test only)
- **Configuration Files:** Minimal (pom.xml, application.properties)

---

## SUMMARY

**Insights** is an early-stage **Spring Boot REST API** for a planning/organization tool. The application allows users to create workspaces and canvases (planning boards) populated with components (notes/ideas) connected by edges (relationships).

**Current State:** Basic data models and partial API implementation. Core CRUD operations started for WorkSpace and Canvas but incomplete for Component and Edge. Authentication, validation, and frontend completely absent.

**Next Priority:** Complete Component/Edge services, implement proper Edge-Component relationships, add authentication/security, finish CRUD operations, and add input validation.
