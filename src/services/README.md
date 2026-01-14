# API Services

Centralized API service layer for the HCCC CRM application.

## Services

### `api.js`
Base API client with:
- JWT token management
- Automatic token refresh on 401 errors
- Request/response interceptors
- Error handling

### `authService.js`
Authentication endpoints:
- `register(userData)` - Register new user
- `login(credentials)` - Login user
- `logout()` - Logout user
- `refreshToken()` - Refresh access token
- `getCurrentUser()` - Get current user info
- `isAuthenticated()` - Check if user is authenticated

### `leadsService.js`
Lead management endpoints:
- `getAll(params)` - Get all leads with filtering
- `getById(leadId)` - Get specific lead
- `create(leadData)` - Create new lead
- `update(leadId, leadData)` - Update lead
- `delete(leadId)` - Delete lead

### `customersService.js`
Customer management endpoints:
- `getAll(params)` - Get all customers with filtering
- `getById(customerId)` - Get specific customer
- `create(customerData)` - Create new customer
- `update(customerId, customerData)` - Update customer
- `delete(customerId)` - Delete customer

### `jobsService.js`
Job management endpoints:
- `getAll(params)` - Get all jobs with filtering
- `getById(jobId)` - Get specific job
- `create(jobData)` - Create new job
- `update(jobId, jobData)` - Update job
- `delete(jobId)` - Delete job

### `aiService.js`
AI endpoints:
- `chat(chatData)` - Send chat message to AI
- `generateEstimate(estimateData)` - Generate estimate using AI

### `weatherService.js`
External weather API:
- `getWeatherByAddress(address)` - Get weather for address

## Usage

```jsx
import { 
  authService, 
  leadsService, 
  customersService,
  jobsService,
  aiService,
  weatherService 
} from '../services';

// Authentication
const user = await authService.login({ email, password });
const currentUser = await authService.getCurrentUser();

// Leads
const leads = await leadsService.getAll({ status: 'New', page: 1 });
const lead = await leadsService.getById('lead-123');
const newLead = await leadsService.create({ first_name: 'John', ... });

// Customers
const customers = await customersService.getAll();
const customer = await customersService.create({ ... });

// Jobs
const jobs = await jobsService.getAll({ customer_id: 'customer-123' });
const job = await jobsService.create({ ... });

// AI
const aiResponse = await aiService.chat({ prompt: 'Hello', context: {} });
const estimate = await aiService.generateEstimate({ ... });

// Weather
const weather = await weatherService.getWeatherByAddress('123 Main St, Charleston, SC 29401');
```

## Configuration

Set the API base URL via environment variable:
```bash
REACT_APP_API_URL=http://localhost:5000/api
```

Default: `http://localhost:5000/api`

## Error Handling

All services throw errors that can be caught:

```jsx
try {
  const lead = await leadsService.getById('lead-123');
} catch (error) {
  console.error('Error:', error.message);
  console.error('Status:', error.status);
  console.error('Data:', error.data);
}
```

## Authentication

Tokens are automatically managed:
- Stored in localStorage
- Automatically added to request headers
- Automatically refreshed on 401 errors
- Automatically cleared on refresh failure






