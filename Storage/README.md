# 🚀 Server Architecture & Routes

`Server.ts` serves as the core entry point of the backend application, initializing middleware and routing traffic across three primary modules: **Webhooks**, **Core API**, and **S3 Storage**.

---

## 🌐 Application Routes

### 1. Webhooks (`/webhooks`)
Handles incoming asynchronous event notifications from third-party services.

* **User Lifecycle Management**
  ```typescript
  webhook_routes.post("/user", handleClerkWebhook);
  ```
  * **Description**: Triggers automatically when a new user signs up via Clerk (`user.created`). It processes incoming webhook subscription payloads to sync user profiles.
  * *Note: Ensure your local tunneling URL (e.g., Ngrok) stays updated in the Clerk dashboard during development.*

---

### 2. Core API (`/api`)
Handles general application endpoints, dashboard management, and metadata retrieval.

```typescript
routes.get("/hello", getDataController);
routes.post("/dash", clerkMiddleware(), getDashboardController);
routes.post("/meta-data-list", clerkMiddleware(), getDashboardController);
```

---

### 3. Cloud Storage (`/s3`)
Manages direct file uploads, S3 storage operations, and AWS Simple Notification Service (SNS) events.

```typescript
s3_routes.post("/initial-store-data", clerkMiddleware(), getUserIdFn, s3StoreDataInit);
s3_routes.post("/sns-receiver", s3SnsReceiver);
```

#### 🛠️ Key Operations:
* **`initial-store-data`**  
  Generates a secure AWS S3 Pre-Signed URL and returns it to the client for direct, authenticated cloud uploads.
* **`sns-receiver`**  
  Listens to AWS SNS notification callbacks to process background storage events asynchronously.
