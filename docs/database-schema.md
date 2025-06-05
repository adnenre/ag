# AgTunisie Database Schema

This document outlines the database schema for the AgTunisie application using Appwrite as the backend.

## Collections

### Users Collection

Stores information about all users in the system.

| Attribute      | Type   | Description                                     |
| -------------- | ------ | ----------------------------------------------- |
| id             | String | Unique identifier for the user                  |
| name           | String | Full name of the user                           |
| email          | String | Email address of the user                       |
| role           | String | Role of the user (farmer, agent, admin, editor) |
| status         | String | Status of the user (active, inactive, pending)  |
| subscription   | String | Subscription tier (Basic, Pro, Enterprise)      |
| lastLogin      | String | Date of last login                              |
| registeredDate | String | Date when the user registered                   |
| profileImage   | String | URL to the user's profile image                 |
| phone          | String | User's phone number                             |
| location       | String | User's location                                 |
| bio            | String | User's bio or description                       |

### Products Collection

Stores information about agricultural products.

| Attribute     | Type   | Description                                        |
| ------------- | ------ | -------------------------------------------------- |
| id            | String | Unique identifier for the product                  |
| name          | String | Name of the product                                |
| category      | String | Category of the product (Vegetables, Fruits, etc.) |
| description   | String | Description of the product                         |
| unit          | String | Unit of measurement (kg, g, lb, etc.)              |
| officialPrice | Number | Official price of the product                      |
| lastUpdated   | String | Date when the product was last updated             |
| image         | String | URL to the product image                           |

### Inventory Collection

Stores information about farmers' inventory.

| Attribute   | Type   | Description                                          |
| ----------- | ------ | ---------------------------------------------------- |
| id          | String | Unique identifier for the inventory item             |
| farmerId    | String | ID of the farmer who owns the inventory              |
| productId   | String | ID of the product                                    |
| quantity    | Number | Quantity of the product in inventory                 |
| harvestDate | String | Date when the product was harvested                  |
| status      | String | Status of the inventory (Available, Low Stock, etc.) |
| price       | Number | Price set by the farmer                              |
| createdAt   | String | Date when the inventory item was created             |
| updatedAt   | String | Date when the inventory item was last updated        |

### Requests Collection

Stores information about market requests.

| Attribute    | Type   | Description                                  |
| ------------ | ------ | -------------------------------------------- |
| id           | String | Unique identifier for the request            |
| agentId      | String | ID of the agent who created the request      |
| productId    | String | ID of the requested product                  |
| quantity     | Number | Requested quantity                           |
| unit         | String | Unit of measurement                          |
| offeredPrice | Number | Price offered by the agent                   |
| deadline     | String | Deadline for the request                     |
| status       | String | Status of the request (Open, Accepted, etc.) |
| createdAt    | String | Date when the request was created            |
| updatedAt    | String | Date when the request was last updated       |

### Settings Collection

Stores application settings.

| Attribute      | Type   | Description                                   |
| -------------- | ------ | --------------------------------------------- |
| id             | String | Unique identifier for settings (app_settings) |
| appName        | String | Name of the application                       |
| appNameColor   | String | Color of the application name                 |
| primaryColor   | String | Primary color of the application              |
| adminEmail     | String | Admin email address                           |
| supportEmail   | String | Support email address                         |
| passwordPolicy | String | Password policy description                   |
| sessionTimeout | Number | Session timeout in minutes                    |
| twoFactorAuth  | String | Two-factor authentication setting             |

### Modules Collection

Stores module configuration.

| Attribute | Type   | Description                                 |
| --------- | ------ | ------------------------------------------- |
| id        | String | Unique identifier for modules (app_modules) |
| modules   | Object | Object containing module configurations     |

## Indexes

- Users Collection:

  - Email (unique)
  - Role
  - Status
  - Subscription

- Products Collection:

  - Name
  - Category

- Inventory Collection:

  - FarmerId
  - ProductId
  - Status

- Requests Collection:
  - AgentId
  - ProductId
  - Status
  - Deadline

## Relationships

- Inventory items are linked to Products via productId
- Inventory items are linked to Users (farmers) via farmerId
- Requests are linked to Products via productId
- Requests are linked to Users (agents) via agentId

## Security Rules

- Users can only read and update their own user document
- Farmers can only read and update their own inventory
- Agents can only read and update their own requests
- Admins have full access to all collections
- All users can read product information
- Only admins can modify product information
- Only admins can modify application settings and modules
  \`\`\`

Let's create a .env.local file template:
