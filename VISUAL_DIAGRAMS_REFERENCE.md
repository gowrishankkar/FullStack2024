# VISUAL DIAGRAMS REFERENCE GUIDE
## Complete Flowchart Documentation

---

## 1️⃣ CAPSTONE DEVELOPMENT LIFECYCLE (4 Phases)

```
╔════════════════════════════════════════════════════════════════════╗
║                  ECOMMERCE PROJECT LIFECYCLE                      ║
╚════════════════════════════════════════════════════════════════════╝

WEEK 1: DEFINITION                                   
┌─────────────────────────────────────────────────────┐
│ ► Project Theme Selection                          │
│ ► Design Sprint & User Personas                    │
│ ► Scope & Requirements Definition                  │
│ ► Project Charter Approval                         │
└──────────────┬──────────────────────────────────────┘
               │
               ▼
WEEK 1-2: PLANNING
┌─────────────────────────────────────────────────────┐
│ ► Technology Stack Selection                       │
│ ► Architecture & Database Design                   │
│ ► Project Pitch Presentation                       │
│ ► Development Environment Setup                    │
│ ► Product Backlog Creation                         │
└──────────────┬──────────────────────────────────────┘
               │
               ▼
WEEK 2-10: DEVELOPMENT (3 Sprints)
┌─────────────────────────────────────────────────────┐
│ SPRINT 1 (Weeks 2-4): Backend & Database          │
│  ├─ Backend setup (Node.js, Express)              │
│  ├─ MongoDB configuration & schema                │
│  └─ 6 API route groups (50 endpoints)             │
│                                                    │
│ SPRINT 2 (Weeks 5-7): Frontend & Integration      │
│  ├─ React component hierarchy                     │
│  ├─ Redux state management                        │
│  ├─ API integration (Fetch/Axios)                 │
│  └─ Responsive design (Material-UI)               │
│                                                    │
│ SPRINT 3 (Weeks 8-10): Payments & Deployment      │
│  ├─ Razorpay integration                          │
│  ├─ Webhook processing                            │
│  ├─ Email notifications (SendGrid)                │
│  ├─ Security hardening                            │
│  └─ Deployment setup                              │
└──────────────┬──────────────────────────────────────┘
               │
               ▼
WEEK 10+: DELIVERY & PRESENTATION
┌─────────────────────────────────────────────────────┐
│ ► Final Testing & QA                              │
│ ► Project Presentation                            │
│ ► Documentation Delivery                          │
│ ► Process Reflection & Learnings                  │
│ ► Live Deployment                                 │
└─────────────────────────────────────────────────────┘

```

---

## 2️⃣ REQUEST-RESPONSE FLOW (Complete User Action)

```
╔════════════════════════════════════════════════════════════════════╗
║              COMPLETE REQUEST-RESPONSE LIFECYCLE                   ║
║                      (~100-200ms Total)                            ║
╚════════════════════════════════════════════════════════════════════╝

┌─────────────┐
│ USER ACTION │  (Click button, form submit, etc)
└──────┬──────┘
       │ ~10ms
       ▼
┌──────────────────┐
│  REDUX DISPATCH  │  (State update in memory)
└──────┬───────────┘
       │ ~5ms
       ▼
┌──────────────────────┐
│  CREATE HTTP REQUEST │  (Build payload, headers)
└──────┬───────────────┘
       │ ~2ms
       ▼
┌──────────────────────────┐
│  NETWORK TRANSMISSION    │  (Browser → Server)
│  (DNS + TCP + TLS)       │  (~30-50ms)
└──────┬───────────────────┘
       │
       ▼ REQUEST RECEIVED
┌─────────────────────────────────────┐
│  EXPRESS MIDDLEWARE PIPELINE:       │
│                                     │
│ 1️⃣ JSON Body Parser (~1ms)         │
│    Converts body to JSON            │
│                                     │
│ 2️⃣ CORS Middleware (~1ms)          │
│    Validates origin headers         │
│                                     │
│ 3️⃣ Helmet.js (~2ms)                │
│    Sets security headers            │
│                                     │
│ 4️⃣ Data Sanitization (~2ms)        │
│    Removes XSS/injection attacks    │
│                                     │
│ 5️⃣ Rate Limiter (~1ms)             │
│    Checks request count             │
│                                     │
│ 6️⃣ Authentication JWT (~5ms)       │
│    Verifies token, decodes payload  │
│                                     │
│ 7️⃣ Route Handler (~15-20ms)        │
│    Controller logic execution       │
│                                     │
│ 8️⃣ Error Handler (~2ms)            │
│    Formats error responses          │
└──────┬──────────────────────────────┘
       │ Total: ~30-50ms
       ▼
┌────────────────────────┐
│ DATABASE OPERATIONS    │  (~20-40ms)
│                        │
│ Query execution        │
│ Index lookup           │
│ Data retrieval         │
│ Transaction handling   │
└──────┬─────────────────┘
       │
       ▼
┌────────────────────────┐
│ RESPONSE FORMATTING    │  (~3ms)
│                        │
│ JSON serialization     │
│ Status code setting    │
│ Headers preparation    │
└──────┬─────────────────┘
       │ ~2ms
       ▼
┌────────────────────────────────┐
│ NETWORK TRANSMISSION (RESPONSE)│  (~30-50ms)
│ Server → Browser               │
└──────┬───────────────────────────┘
       │
       ▼ RESPONSE RECEIVED
┌──────────────────────┐
│  PARSE RESPONSE      │  (~2ms)
│  (JSON.parse)        │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│  UPDATE REDUX STATE  │  (~5ms)
│  (Dispatch action)   │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────────────┐
│ REACT RE-RENDER              │  (~16ms - 60fps)
│                              │
│ ► Component receives props   │
│ ► Virtual DOM comparison     │
│ ► Minimal DOM updates        │
│ ► Browser reflow/repaint     │
└──────┬───────────────────────┘
       │
       ▼
┌──────────────────┐
│   UI UPDATED     │  ✓ User sees result
└──────────────────┘

TOTAL TIME: ~100-200ms (Per action)
PERFORMANCE: ✓ Excellent (< 300ms perceived as instant)

```

---

## 3️⃣ JWT AUTHENTICATION FLOW (3 Flows)

```
╔════════════════════════════════════════════════════════════════════╗
║                    JWT AUTHENTICATION SYSTEM                       ║
╚════════════════════════════════════════════════════════════════════╝

┌─────────────────────────────────────────────────────────────────────┐
│                          REGISTRATION FLOW                          │
└─────────────────────────────────────────────────────────────────────┘

USER INPUT FORM
    │ Name, Email, Password, Address
    ▼
VALIDATION
    │ Check: email format, password strength, name length
    ├─ If Invalid → Show error → Exit
    └─ If Valid ↓
    ▼
HASH PASSWORD (bcryptjs)
    │ Password + Salt → Hash (bcrypt(password, salt=10))
    ▼
CREATE USER DOCUMENT
    │ {
    │   _id: ObjectId(),
    │   name: "John",
    │   email: "john@email.com",
    │   passwordHash: "$2b$10$...",
    │   address: "123 Main St",
    │   role: "user",
    │   createdAt: 2025-10-18
    │ }
    ▼
SAVE TO MONGODB
    │ Users collection insert
    ▼
GENERATE JWT TOKEN
    │ Header: { alg: "HS256", typ: "JWT" }
    │ Payload: { userId: "123", email: "john@email.com", role: "user" }
    │ Signature: HMAC-SHA256(header.payload, SECRET_KEY)
    ▼
SEND RESPONSE
    │ { success: true, token: "eyJhbGc...", user: {...} }
    ▼
STORE TOKEN (Client)
    │ localStorage.setItem('token', token)
    ▼
SUCCESS ✓


┌─────────────────────────────────────────────────────────────────────┐
│                            LOGIN FLOW                               │
└─────────────────────────────────────────────────────────────────────┘

USER LOGIN FORM
    │ Email, Password
    ▼
FIND USER BY EMAIL
    │ DB.Users.findOne({ email: "john@email.com" })
    ├─ If Not Found → Error 404
    └─ If Found ↓
    ▼
COMPARE PASSWORDS
    │ bcrypt.compare(inputPassword, storedHash)
    │
    │ Process:
    │ ├─ Extract salt from stored hash
    │ ├─ Hash input password with same salt
    │ └─ Compare hashes
    │
    ├─ If Mismatch → Error 401
    └─ If Match ↓
    ▼
GENERATE JWT TOKEN
    │ Same as registration process
    ▼
SEND RESPONSE + TOKEN
    │ { success: true, token: "eyJhbGc...", user: {...} }
    ▼
STORE TOKEN (Client)
    │ localStorage.setItem('token', token)
    ▼
SUCCESS ✓


┌─────────────────────────────────────────────────────────────────────┐
│              AUTHENTICATED REQUEST FLOW (Protected Routes)          │
└─────────────────────────────────────────────────────────────────────┘

SEND REQUEST WITH TOKEN
    │ Header: { Authorization: "Bearer eyJhbGc..." }
    ▼
EXTRACT TOKEN
    │ Get from Authorization header
    ├─ If Missing → Error 401
    └─ If Found ↓
    ▼
VERIFY JWT SIGNATURE
    │ Verify(token, SECRET_KEY)
    ├─ If Invalid/Tampered → Error 401
    └─ If Valid ↓
    ▼
CHECK EXPIRATION
    │ Current time < token.exp
    ├─ If Expired → Error 401 "Token expired"
    └─ If Valid ↓
    ▼
DECODE PAYLOAD
    │ Extract: userId, email, role, iat, exp
    ▼
ATTACH TO REQUEST
    │ req.user = { userId: "123", email: "john@...", role: "user" }
    ▼
PROCEED TO ROUTE HANDLER
    │ Access to: POST /api/booking, PUT /api/user, etc.
    ▼
SUCCESS ✓ (Protected resource accessed)


┌─────────────────────────────────────────────────────────────────────┐
│                    TOKEN EXPIRATION HANDLING                        │
└─────────────────────────────────────────────────────────────────────┘

TOKEN LIFESPAN: 24 hours

DURING REQUEST:
    │ Token.exp = Now + 24 hours
    ▼
AFTER 24 HOURS:
    │ Token.exp < Now
    ▼
FRONTEND RECEIVES 401
    │ "Token expired" or "Please login again"
    ▼
REDIRECT TO LOGIN
    │ Clear localStorage
    │ Navigate to /login
    ▼
USER MUST LOGIN AGAIN
    │ Gets fresh token
    ▼
CONTINUE ✓


┌─────────────────────────────────────────────────────────────────────┐
│                  ROLE-BASED ACCESS CONTROL (RBAC)                   │
└─────────────────────────────────────────────────────────────────────┘

JWT PAYLOAD INCLUDES:
    │ { 
    │   userId: "123",
    │   email: "john@email.com",
    │   role: "user"   ← 3 possible values: "user", "admin", "moderator"
    │ }
    ▼
ON PROTECTED ROUTE:
    │
    ├─ if (req.user.role === "admin") → Allow GET /api/admin
    ├─ if (req.user.role === "user") → Block GET /api/admin → 403
    │
    ▼
RESPONSE:
    │ 403 Forbidden: "Access denied. Admin role required."
    ▼
CUSTOM MIDDLEWARE:
    │ requireAdmin = (req, res, next) => {
    │   if (req.user.role !== "admin") return res.status(403)
    │   next()
    │ }

```

---

## 4️⃣ COMPLETE USER JOURNEY (Data Flow)

```
╔════════════════════════════════════════════════════════════════════╗
║            ECOMMERCE PLATFORM - USER JOURNEY (End-to-End)         ║
║                     4 MAJOR PHASES                                 ║
╚════════════════════════════════════════════════════════════════════╝

┌─────────────────────────────────────────────────────────────────────┐
│ PHASE 1: REGISTRATION & BROWSING                                    │
└─────────────────────────────────────────────────────────────────────┘

START
  │
  ├─► New User? → Registration page
  │     ├─ Fill form (name, email, password, address)
  │     ├─ POST /api/auth/register
  │     ├─ Backend: Hash password, save user, generate JWT
  │     └─ Redirect to Home
  │
  ├─► Existing User? → Login page
  │     ├─ Email & Password
  │     ├─ POST /api/auth/login
  │     ├─ Backend: Verify credentials, generate JWT
  │     └─ Redirect to Home
  │
  ▼
HOME PAGE LOADED
  │ GET /product?page=1&category=electronics
  ├─ Backend query: DB.Products.find({category: "electronics"})
  ├─ Return 12 products + pagination
  ├─ Frontend: Redux dispatch → State update
  └─ Render products with ProductCard component
  
User browses:
  ├─ Filter by category
  ├─ Filter by price range
  ├─ Sort by date/price/rating
  ├─ Search products
  └─ View product details

PRODUCT DETAILS CLICK
  ├─ GET /api/product/:id
  ├─ Return full product + reviews + ratings
  ├─ Display images, specs, price, reviews
  └─ Can add to cart from here


┌─────────────────────────────────────────────────────────────────────┐
│ PHASE 2: SHOPPING CART MANAGEMENT                                   │
└─────────────────────────────────────────────────────────────────────┘

ADD TO CART
  │ Button click
  ├─ Redux action: PRODUCT_ADD_TO_CART
  ├─ Check if product already in cart
  │   ├─ If yes → Increase quantity
  │   └─ If no → Add new item
  ├─ Redux state update
  ├─ localStorage sync
  └─ Toast: "Added to cart"

CART OPERATIONS
  ├─ View cart items (from Redux state)
  ├─ Adjust quantities
  │   └─ Redux: UPDATE_CART_ITEM
  ├─ Remove items
  │   └─ Redux: REMOVE_FROM_CART
  ├─ Auto-calculate total:
  │   └─ totalPrice = Σ(quantity × price)
  └─ Apply coupon (optional)

CONTINUE SHOPPING
  └─ Back to browsing (Phase 1)

OR PROCEED TO CHECKOUT
  └─ Phase 3 ▼


┌─────────────────────────────────────────────────────────────────────┐
│ PHASE 3: CHECKOUT & PAYMENT                                         │
└─────────────────────────────────────────────────────────────────────┘

CHECKOUT PAGE
  │ Display order summary
  ├─ Items: ProductCard × 5
  ├─ Quantities
  ├─ Subtotal: ₹2,500
  ├─ Tax (5%): ₹125
  ├─ Shipping: ₹100
  └─ Total: ₹2,725

DELIVERY ADDRESS
  ├─ Use saved address
  ├─ Or enter new address
  └─ Address validation

PAYMENT METHOD
  ├─ Display: "Pay with Razorpay"
  └─ Click checkout button

PLACE ORDER
  │ POST /api/booking
  ├─ Backend creates booking record:
  │   {
  │     userId: req.user.userId,
  │     items: [...],
  │     totalPrice: 2725,
  │     status: "pending",
  │     paymentStatus: "unpaid"
  │   }
  │
  ├─ Save to MongoDB (Bookings collection)
  └─ Return bookingId

RAZORPAY INTEGRATION
  │ Initialize Razorpay modal with:
  ├─ Amount: 2,725 paise (272500)
  ├─ Customer email
  ├─ Customer phone
  └─ Order details

PAYMENT GATEWAY
  │ User selects payment method:
  ├─ Credit/Debit Card
  │   └─ Enter card details (Razorpay handles encryption)
  ├─ UPI
  │   └─ Select UPI app
  ├─ Wallet
  │   └─ Select provider
  └─ Netbanking
      └─ Select bank

PAYMENT PROCESSING
  │
  ├─ SUCCESS PATH:
  │   ├─ Razorpay verifies payment with bank
  │   ├─ Sends webhook: POST /webhook/razorpay
  │   ├─ Backend verifies signature
  │   ├─ Update booking: status="confirmed", paymentStatus="paid"
  │   ├─ Update inventory: stock -= quantity
  │   ├─ Send confirmation email (SendGrid)
  │   ├─ Clear Redux cart
  │   ├─ Redirect to success page
  │   └─ Toast: "Order placed successfully! ID: #xxxxx"
  │
  └─ FAILURE PATH:
      ├─ Payment declined / timeout
      ├─ Backend receives failure webhook
      ├─ Update booking: paymentStatus="failed"
      ├─ User sees error message
      ├─ Offer retry option
      ├─ Cart preserved in Redux + localStorage
      └─ Return to checkout


┌─────────────────────────────────────────────────────────────────────┐
│ PHASE 4: POST-PURCHASE                                              │
└─────────────────────────────────────────────────────────────────────┘

ORDER CONFIRMATION EMAIL
  │ Sent to user@email.com:
  ├─ Order ID: #xxxxx
  ├─ Items purchased
  ├─ Total amount
  ├─ Estimated delivery: 3-5 days
  └─ Track order link

ORDER HISTORY PAGE
  │ GET /api/booking
  ├─ Backend queries: DB.Bookings.find({userId: req.user.userId})
  ├─ Return all user orders
  ├─ Show:
  │   ├─ Order ID
  │   ├─ Date
  │   ├─ Total
  │   ├─ Status: "Pending" / "Confirmed" / "Shipped" / "Delivered"
  │   ├─ Items count
  │   └─ Action buttons: View Details, Cancel, Return, Track
  └─ Pagination for multiple orders

VIEW ORDER DETAILS
  ├─ GET /api/booking/:orderId
  ├─ Show all items, quantities, prices
  ├─ Show delivery address
  ├─ Show tracking info
  └─ Show estimated delivery

TRACK SHIPMENT
  ├─ Real-time status updates
  ├─ Courier integration (optional)
  └─ Estimated delivery countdown

WRITE REVIEW
  ├─ After delivery
  ├─ Navigate to Reviews tab
  ├─ For each product:
  │   ├─ Rate 1-5 stars
  │   ├─ Write comment
  │   ├─ Upload image (optional)
  │   └─ POST /api/review
  ├─ Backend:
  │   ├─ Create review document
  │   ├─ Link to product
  │   ├─ Update product average rating
  │   └─ Save to Reviews collection
  └─ Toast: "Review submitted!"

BROWSE PREVIOUS REVIEWS
  ├─ View all user reviews
  ├─ Edit existing reviews
  ├─ Delete reviews
  └─ See review history

END ✓ (Journey Complete)

```

---

## 5️⃣ PAYMENT PROCESSING FLOW (Razorpay Integration)

```
╔════════════════════════════════════════════════════════════════════╗
║         RAZORPAY PAYMENT GATEWAY - COMPLETE FLOW                  ║
║                    7-Step Process (30-45 seconds)                 ║
╚════════════════════════════════════════════════════════════════════╝

STEP 1: ORDER CREATION (Frontend)
┌──────────────────────────────────────────┐
│ User clicks "Proceed to Payment"         │
│                                          │
│ Cart Data:                               │
│ ├─ Items: [Product1(qty:2), Product2]    │
│ ├─ Total: ₹2,725                         │
│ └─ Conversion: 272,500 paise            │
└──────────────┬───────────────────────────┘
               │ POST /api/booking
               ▼
STEP 2: BOOKING RECORD CREATION (Backend)
┌──────────────────────────────────────────┐
│ Express Server Processing:               │
│                                          │
│ 1. Validate JWT token                    │
│ 2. Validate cart items exist             │
│ 3. Check inventory stock                 │
│ 4. Create booking document:              │
│                                          │
│    {                                     │
│      _id: ObjectId(),                    │
│      userId: "user123",                  │
│      items: [...],                       │
│      totalPrice: 2725,                   │
│      paymentStatus: "unpaid",            │
│      status: "pending",                  │
│      createdAt: 2025-10-18               │
│    }                                     │
│                                          │
│ 5. Save to MongoDB                       │
│ 6. Return bookingId                      │
└──────────────┬───────────────────────────┘
               │ Response: { bookingId: "xxx" }
               ▼
STEP 3: RAZORPAY MODAL INITIALIZATION (Frontend)
┌──────────────────────────────────────────┐
│ Create Razorpay order:                   │
│                                          │
│ const options = {                        │
│   key: "rzp_live_xxxx",                  │
│   amount: 272500,                        │
│   currency: "INR",                       │
│   name: "Ecommerce Store",               │
│   description: "Order #xxxxx",           │
│   order_id: bookingId,                   │
│   handler: successCallback,              │
│   theme: { color: "#3399cc" }            │
│ }                                        │
│                                          │
│ Display Razorpay modal                   │
└──────────────┬───────────────────────────┘
               │
               ▼ User sees payment options
STEP 4: PAYMENT METHOD SELECTION & INPUT (User)
┌──────────────────────────────────────────┐
│ Razorpay Modal:                          │
│                                          │
│ ┌─ Credit Card                           │
│ ├─ Debit Card                            │
│ ├─ UPI                                   │
│ ├─ Wallet (PayTM, Amazon Pay, etc)       │
│ ├─ NetBanking                            │
│ └─ EMI Options                           │
│                                          │
│ User selects method and enters details   │
│ (Handled securely by Razorpay)           │
└──────────────┬───────────────────────────┘
               │ Payment details encrypted
               ▼
STEP 5: PAYMENT AUTHORIZATION (Bank)
┌──────────────────────────────────────────┐
│ Razorpay → Bank Processing:              │
│                                          │
│ 1. Authenticate customer                 │
│    (OTP/3D Secure for cards)             │
│ 2. Verify funds availability             │
│ 3. Authorize amount deduction            │
│ 4. Generate transaction ID               │
│ 5. Communicate status to Razorpay        │
│                                          │
│ Possible Outcomes:                       │
│ ├─ ✓ Success                             │
│ ├─ ✗ Failed (Insufficient funds)         │
│ ├─ ✗ Declined (Fraud detection)          │
│ └─ ✗ Timeout                             │
└──────────────┬───────────────────────────┘
               │
         ┌─────┴─────────┬──────────────┐
         ▼               ▼              ▼
    SUCCESS PATH    FAILURE PATH    TIMEOUT PATH

═══════════════════════════════════════════════════════════

SUCCESS PATH:
┌──────────────────────────────────────────┐
│ Razorpay → Frontend Callback             │
│                                          │
│ handler: (response) => {                 │
│   paymentId: "pay_xxxxx",                │
│   orderId: bookingId,                    │
│   signature: "xxxxx"                     │
│ }                                        │
│                                          │
│ Frontend action: VERIFY_PAYMENT          │
└──────────────┬───────────────────────────┘
               │ POST /api/payment/verify
               ▼
STEP 6A: PAYMENT VERIFICATION (Backend)
┌──────────────────────────────────────────┐
│ Express Server:                          │
│                                          │
│ 1. Extract: paymentId, orderId, signature│
│ 2. Generate hmac signature:              │
│    const hash = hmac(                    │
│      orderId + "|" + paymentId,          │
│      process.env.RAZORPAY_SECRET         │
│    )                                     │
│ 3. Compare hash === received signature   │
│ 4. If mismatch → Fraud! → Return error   │
│ 5. If match → Verify with Razorpay API   │
│ 6. If verified:                          │
│    ├─ Update booking: paymentStatus=paid │
│    ├─ status = "confirmed"               │
│    ├─ Update inventory: stock -= qty     │
│    ├─ Save to MongoDB                    │
│    └─ Return success response            │
└──────────────┬───────────────────────────┘
               │ { success: true, bookingId }
               ▼
STEP 6B: WEBHOOK FROM RAZORPAY (Async)
┌──────────────────────────────────────────┐
│ POST /webhook/razorpay (Backend)         │
│                                          │
│ Razorpay sends async notification:       │
│ {                                        │
│   event: "payment.authorized",           │
│   payload: {                             │
│     payment: {                           │
│       id: "pay_xxxxx",                   │
│       amount: 272500,                    │
│       status: "authorized"               │
│     }                                    │
│   }                                      │
│ }                                        │
│                                          │
│ Backend:                                 │
│ 1. Verify webhook signature (security)   │
│ 2. Parse event type                      │
│ 3. Update DB based on event              │
│ 4. Send email notification               │
│ 5. Return 200 OK to Razorpay            │
└──────────────┬───────────────────────────┘
               │
               ▼
STEP 7: CONFIRMATION & EMAILS (Backend)
┌──────────────────────────────────────────┐
│ Send Confirmation Email (SendGrid):      │
│                                          │
│ To: user@email.com                       │
│                                          │
│ Subject: "Order Confirmed! #xxxxx"       │
│                                          │
│ Body:                                    │
│ ├─ Order ID: #xxxxx                      │
│ ├─ Amount: ₹2,725                        │
│ ├─ Items:                                │
│ │  ├─ Product 1 (Qty: 2) - ₹1,000        │
│ │  └─ Product 2 (Qty: 1) - ₹1,625        │
│ ├─ Delivery Address                      │
│ ├─ Estimated Delivery: 3-5 days          │
│ ├─ Tracking Link                         │
│ └─ Thank you message                     │
│                                          │
│ Frontend Response:                       │
│ ├─ Clear Redux cart                      │
│ ├─ Clear localStorage                    │
│ ├─ Redirect to success page               │
│ ├─ Show: "Order placed! Check email"     │
│ └─ Display receipt details               │
└──────────────┬───────────────────────────┘
               │
               ▼
           SUCCESS ✓
        Order placed, payment received
        Inventory updated, email sent

═══════════════════════════════════════════════════════════

FAILURE PATH:
┌──────────────────────────────────────────┐
│ Payment Declined:                        │
│ ├─ Insufficient balance                  │
│ ├─ Card expired                          │
│ ├─ Fraud detection triggered             │
│ ├─ Incorrect OTP                         │
│ └─ Timeout during verification           │
│                                          │
│ Razorpay → Frontend Error Callback       │
│                                          │
│ Frontend:                                │
│ ├─ Show error message                    │
│ ├─ Offer retry option                    │
│ ├─ Keep cart items (Redux + localStorage)│
│ └─ Redirect to cart page                 │
│                                          │
│ Backend:                                 │
│ ├─ Webhook: payment.failed event         │
│ ├─ Update booking: paymentStatus="failed"│
│ ├─ Mark for cancellation                 │
│ └─ Send failure email                    │
└──────────────────────────────────────────┘

COMPLETE PAYMENT FLOW: 30-45 seconds total

```

---

## 6️⃣ MIDDLEWARE PIPELINE ARCHITECTURE

```
╔════════════════════════════════════════════════════════════════════╗
║          EXPRESS.JS MIDDLEWARE STACK - REQUEST PROCESSING         ║
║                  8 Layers of Processing Per Request               ║
╚════════════════════════════════════════════════════════════════════╝

CLIENT SENDS REQUEST
    ▼
    
┌────────────────────────────────────────────────────────────┐
│ LAYER 1: EXPRESS.json() - BODY PARSER                      │
├────────────────────────────────────────────────────────────┤
│ Task: Parse incoming JSON request body                     │
│ Processing: ~1ms                                           │
│ Result: Convert raw bytes → JavaScript object             │
│                                                            │
│ app.use(express.json({ limit: '10kb' }))                  │
│                                                            │
│ Input: POST body as bytes                                 │
│ Output: req.body = { name: "John", email: "..." }         │
└────────────────────────────────────────────────────────────┘
    ▼
    
┌────────────────────────────────────────────────────────────┐
│ LAYER 2: CORS MIDDLEWARE - CROSS-ORIGIN REQUESTS          │
├────────────────────────────────────────────────────────────┤
│ Task: Handle Cross-Origin Resource Sharing                │
│ Processing: ~1ms                                           │
│ Result: Allow/deny requests from different domains        │
│                                                            │
│ app.use(cors({                                            │
│   origin: ["http://localhost:3000", "https://..."],       │
│   credentials: true                                       │
│ }))                                                        │
│                                                            │
│ Checks: Origin header against allowed list               │
│ Adds: Access-Control-Allow-Origin header                  │
│ Handles: preflight OPTIONS requests                       │
└────────────────────────────────────────────────────────────┘
    ▼
    
┌────────────────────────────────────────────────────────────┐
│ LAYER 3: HELMET.JS - SECURITY HEADERS                      │
├────────────────────────────────────────────────────────────┤
│ Task: Set HTTP security headers                           │
│ Processing: ~2ms                                           │
│ Result: Protection against common attacks                 │
│                                                            │
│ app.use(helmet())                                         │
│                                                            │
│ Headers Set:                                              │
│ ├─ Content-Security-Policy (XSS prevention)              │
│ ├─ X-Frame-Options (Clickjacking prevention)              │
│ ├─ X-Content-Type-Options (MIME sniffing)                 │
│ ├─ Strict-Transport-Security (HTTPS only)                 │
│ ├─ Referrer-Policy                                        │
│ └─ X-XSS-Protection                                       │
└────────────────────────────────────────────────────────────┘
    ▼
    
┌────────────────────────────────────────────────────────────┐
│ LAYER 4: DATA SANITIZATION - INPUT CLEANING               │
├────────────────────────────────────────────────────────────┤
│ Task: Remove malicious code from inputs                   │
│ Processing: ~2ms                                           │
│ Result: Clean data without XSS/injection threats          │
│                                                            │
│ mongoSanitize() & xss()                                   │
│                                                            │
│ Removes:                                                   │
│ ├─ NoSQL injection attempts ($, {}, etc)                  │
│ ├─ HTML/Script tags from input                            │
│ ├─ Dangerous characters                                   │
│ └─ Special regex patterns                                 │
│                                                            │
│ Example:                                                  │
│ Input:  email: "test@email.com; drop table users;"       │
│ Output: email: "test@email.comdrop table users"          │
└────────────────────────────────────────────────────────────┘
    ▼
    
┌────────────────────────────────────────────────────────────┐
│ LAYER 5: RATE LIMITER - THROTTLE REQUESTS                 │
├────────────────────────────────────────────────────────────┤
│ Task: Prevent brute force & DoS attacks                   │
│ Processing: ~1ms                                           │
│ Result: Track & limit requests per IP/user                │
│                                                            │
│ app.use(rateLimit({                                       │
│   windowMs: 15 * 60 * 1000,    // 15 minutes             │
│   max: 100,                     // 100 requests max       │
│   message: "Too many requests"                            │
│ }))                                                        │
│                                                            │
│ Tracking:                                                  │
│ ├─ IP-based: 100 requests per 15 min per IP              │
│ ├─ Auth-based: 50 failed logins per 15 min                │
│ └─ Route-based: 10 password changes per hour              │
│                                                            │
│ Response: 429 Too Many Requests (if exceeded)             │
└────────────────────────────────────────────────────────────┘
    ▼
    
┌────────────────────────────────────────────────────────────┐
│ LAYER 6: JWT AUTHENTICATION - VERIFY TOKEN                │
├────────────────────────────────────────────────────────────┤
│ Task: Authenticate user via JWT                           │
│ Processing: ~5ms                                           │
│ Result: Decode & validate token, attach user to request   │
│                                                            │
│ Token verification steps:                                 │
│ 1. Extract from Authorization header                      │
│    "Bearer eyJhbGc..."                                    │
│ 2. Verify signature using SECRET_KEY                      │
│ 3. Check token expiration                                 │
│ 4. Decode payload → extract userId, role, email          │
│ 5. Attach to req.user = { userId, role, email }          │
│                                                            │
│ Protected routes:                                          │
│ ├─ If no token → 401 Unauthorized                         │
│ ├─ If invalid → 401 Unauthorized                          │
│ └─ If valid → Proceed with authenticated user             │
│                                                            │
│ Public routes skip this layer (e.g., /login, /register)   │
└────────────────────────────────────────────────────────────┘
    ▼
    
┌────────────────────────────────────────────────────────────┐
│ LAYER 7: ROUTE HANDLER - CONTROLLER LOGIC                 │
├────────────────────────────────────────────────────────────┤
│ Task: Execute business logic for route                    │
│ Processing: ~15-50ms (depends on DB queries)              │
│ Result: Process request & generate response               │
│                                                            │
│ Examples:                                                  │
│                                                            │
│ POST /api/auth/register:                                  │
│   ├─ Validate input (email, password, name)               │
│   ├─ Check if user exists                                 │
│   ├─ Hash password                                        │
│   ├─ Create user in MongoDB                               │
│   └─ Generate & return JWT                                │
│                                                            │
│ GET /api/product?category=electronics:                    │
│   ├─ Parse query parameters                               │
│   ├─ Build MongoDB filter: {category: "electronics"}      │
│   ├─ Execute find() query                                 │
│   ├─ Return 12 products with pagination                   │
│   └─ Response: { data: [...], page: 1, total: 234 }       │
│                                                            │
│ POST /api/booking:                                        │
│   ├─ Validate JWT (from Layer 6)                          │
│   ├─ Validate cart items exist                            │
│   ├─ Create booking document                              │
│   ├─ Save to MongoDB                                      │
│   └─ Return bookingId for payment                         │
└────────────────────────────────────────────────────────────┘
    ▼
    
┌────────────────────────────────────────────────────────────┐
│ LAYER 8: ERROR HANDLER - EXCEPTION MANAGEMENT              │
├────────────────────────────────────────────────────────────┤
│ Task: Catch & format errors gracefully                    │
│ Processing: ~2ms                                           │
│ Result: Consistent error response format                  │
│                                                            │
│ app.use((err, req, res, next) => {                        │
│   const status = err.status || 500                        │
│   const message = err.message || "Server error"           │
│   res.status(status).json({                               │
│     success: false,                                       │
│     message,                                              │
│     statusCode: status                                    │
│   })                                                       │
│ })                                                         │
│                                                            │
│ Error Types:                                               │
│ ├─ 400 Bad Request (Invalid input)                        │
│ ├─ 401 Unauthorized (Missing/invalid token)              │
│ ├─ 403 Forbidden (Insufficient permissions)              │
│ ├─ 404 Not Found (Resource not found)                     │
│ ├─ 429 Too Many Requests (Rate limit exceeded)            │
│ ├─ 500 Server Error (Unexpected error)                    │
│ └─ All errors logged for debugging                        │
└────────────────────────────────────────────────────────────┘
    ▼
    
RESPONSE SENT TO CLIENT
    │
    ├─ Status code (200, 400, 401, etc.)
    ├─ JSON body { success, data/message, statusCode }
    └─ All security headers included

TOTAL TIME: ~30-50ms for middleware pipeline + controller logic

```

---

## 7️⃣ MONGODB COLLECTIONS RELATIONSHIP DIAGRAM

```
╔════════════════════════════════════════════════════════════════════╗
║          MONGODB COLLECTIONS - ENTITY RELATIONSHIP DIAGRAM        ║
║              (4 Collections, 3 Relationships)                     ║
╚════════════════════════════════════════════════════════════════════╝


                         ┌─────────────────┐
                         │    USERS        │
                         └────────┬────────┘
                                  │
                    ┌─────────────┼─────────────┐
                    │             │             │
            (1-to-Many)      (1-to-Many)  (1-to-Many)
                    │             │             │
                    ▼             ▼             ▼
            ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
            │  BOOKINGS    │ │   REVIEWS    │ │   ADDRESS    │
            │(Orders)      │ │(Ratings)     │ │(Delivery)    │
            └──────┬───────┘ └──────┬───────┘ └──────────────┘
                   │                │
           (Many-to-One)    (Many-to-One)
                   │                │
                   └────────┬───────┘
                            │
                    ┌───────▼──────────┐
                    │    PRODUCTS      │
                    │(Catalog Items)   │
                    └──────────────────┘


═══════════════════════════════════════════════════════════════════════

📦 USERS COLLECTION
┌──────────────────────────────────────┐
│ Storage: user accounts & profiles    │
│ Purpose: Authentication & identity   │
└──────────────────────────────────────┘

Structure:
{
  _id: ObjectId("507f1f77bcf86cd799439011"),
  name: "John Doe",
  email: "john@email.com",
  passwordHash: "$2b$10$...",  ← Bcrypt hashed
  role: "user",                 ← Enum: "user", "admin", "moderator"
  phone: "+91-9999999999",
  address: {
    street: "123 Main St",
    city: "Mumbai",
    state: "MH",
    postalCode: "400001",
    country: "India"
  },
  createdAt: ISODate("2025-10-18"),
  updatedAt: ISODate("2025-10-18")
}

Indexes:
├─ _id (auto, unique)
├─ email (unique, for login)
├─ role (for filtering users)
└─ createdAt (for sorting)

Row Count: 500-1000 users
Average Size: 0.5 KB per doc


📦 PRODUCTS COLLECTION
┌──────────────────────────────────────┐
│ Storage: product catalog items       │
│ Purpose: Display products, inventory │
└──────────────────────────────────────┘

Structure:
{
  _id: ObjectId("507f191e810c19729de860ea"),
  name: "Sony WH-CH720 Headphones",
  slug: "sony-wh-ch720-headphones",
  category: "electronics",
  subcategory: "headphones",
  
  price: {
    original: 4999,     ← In rupees
    current: 3499,      ← After discount
    currency: "INR"
  },
  
  description: "Premium wireless headphones...",
  specifications: {
    brand: "Sony",
    model: "WH-CH720",
    color: "Black",
    warranty: "1 year",
    batteryLife: "35 hours",
    connectivity: "Wireless"
  },
  
  images: [
    "https://cdn.../product-1.jpg",
    "https://cdn.../product-2.jpg"
  ],
  
  stock: 450,           ← Current inventory
  sold: 1250,
  
  reviews: [
    ObjectId("..."),    ← References to Review docs
    ObjectId("...")
  ],
  
  rating: {
    average: 4.5,       ← Out of 5
    count: 328
  },
  
  createdAt: ISODate("2025-09-01"),
  updatedAt: ISODate("2025-10-18")
}

Indexes:
├─ _id (auto, unique)
├─ category (40% queries)
├─ price (range queries)
├─ name (text search)
├─ createdAt (new products)
└─ stock (availability)

Row Count: 2000-5000 products
Average Size: 1.5 KB per doc


📦 BOOKINGS COLLECTION (Orders)
┌──────────────────────────────────────┐
│ Storage: customer orders             │
│ Purpose: Track purchases & payments  │
└──────────────────────────────────────┘

Structure:
{
  _id: ObjectId("507f1f77bcf86cd799439012"),
  userId: ObjectId("507f1f77bcf86cd799439011"),  ← Reference to Users
  
  items: [
    {
      productId: ObjectId("507f191e810c19729de860ea"),  ← Ref to Products
      name: "Sony WH-CH720 Headphones",
      quantity: 2,
      price: 3499,        ← Price at time of purchase
      subtotal: 6998
    },
    {
      productId: ObjectId("507f191e810c19729de860eb"),
      name: "Phone Case",
      quantity: 1,
      price: 299,
      subtotal: 299
    }
  ],
  
  totalPrice: 7297,
  tax: 365,               ← 5% GST
  shippingCost: 100,
  finalAmount: 7762,
  
  deliveryAddress: {
    street: "123 Main St",
    city: "Mumbai",
    state: "MH",
    postalCode: "400001"
  },
  
  paymentInfo: {
    paymentId: "pay_xxxxx",         ← Razorpay payment ID
    orderId: "order_xxxxx",
    method: "credit_card",          ← Card, UPI, NetBanking, etc.
    status: "paid",                 ← pending, paid, failed, refunded
    paidAt: ISODate("2025-10-18")
  },
  
  status: "confirmed",   ← pending, confirmed, shipped, delivered, cancelled
  
  createdAt: ISODate("2025-10-18"),
  updatedAt: ISODate("2025-10-18"),
  deliveredAt: ISODate("2025-10-21")
}

Indexes:
├─ _id (auto, unique)
├─ userId + createdAt (user order history)
├─ paymentStatus (for filtering)
└─ paymentId (webhook verification)

Row Count: 5000-10000 bookings
Average Size: 2 KB per doc


📦 REVIEWS COLLECTION
┌──────────────────────────────────────┐
│ Storage: product reviews & ratings   │
│ Purpose: Customer feedback           │
└──────────────────────────────────────┘

Structure:
{
  _id: ObjectId("507f1f77bcf86cd799439013"),
  productId: ObjectId("507f191e810c19729de860ea"),  ← Ref to Products
  userId: ObjectId("507f1f77bcf86cd799439011"),     ← Ref to Users
  
  rating: 5,                         ← 1-5 stars
  title: "Excellent sound quality",
  comment: "Best headphones I've ever bought...",
  
  images: [
    "https://cdn.../review-1.jpg"
  ],
  
  helpful: 45,
  unhelpful: 2,
  
  createdAt: ISODate("2025-10-20"),
  updatedAt: ISODate("2025-10-20")
}

Indexes:
├─ _id (auto, unique)
├─ productId + createdAt (product reviews)
├─ userId (user review history)
└─ rating (star filtering)

Row Count: 10000-50000 reviews
Average Size: 0.8 KB per doc


═══════════════════════════════════════════════════════════════════════

🔗 RELATIONSHIPS

1️⃣ USERS → BOOKINGS (1-to-Many)
   - 1 user can have many orders
   - userId in Bookings references _id in Users
   - Query: db.bookings.find({ userId: "xxxx" })

2️⃣ USERS → REVIEWS (1-to-Many)
   - 1 user can write many reviews
   - userId in Reviews references _id in Users
   - Query: db.reviews.find({ userId: "xxxx" })

3️⃣ PRODUCTS → REVIEWS (1-to-Many)
   - 1 product can have many reviews
   - productId in Reviews references _id in Products
   - Query: db.reviews.find({ productId: "xxxx" })

4️⃣ PRODUCTS → BOOKINGS (Embedded)
   - Product items embedded in Bookings array
   - Items store productId reference
   - Query: db.bookings.find({ "items.productId": "xxxx" })


═══════════════════════════════════════════════════════════════════════

📊 DATABASE STATISTICS

Collection    │ Row Count     │ Avg Size  │ Total Size  │ Indexes
──────────────┼───────────────┼───────────┼─────────────┼─────────
Users         │ 500-1000      │ 0.5 KB    │ 500 KB      │ 4
Products      │ 2000-5000     │ 1.5 KB    │ 7.5 MB      │ 6
Bookings      │ 5000-10000    │ 2 KB      │ 20 MB       │ 3
Reviews       │ 10000-50000   │ 0.8 KB    │ 40 MB       │ 3
──────────────┴───────────────┴───────────┴─────────────┴─────────

Total Collections: 4
Total Size: ~68 MB (at scale)
Replication Factor: 3x (MongoDB Atlas)
Backup: Daily automated backups


═══════════════════════════════════════════════════════════════════════

🎯 QUERY PATTERNS

Most Common Queries (% of total):

40% - GET products by category
30% - GET user orders by userId
15% - GET reviews for product
10% - GET user profile
5% - Other queries


Optimization Strategy:
├─ Primary indexes on frequently filtered fields
├─ Compound indexes for multi-field queries
├─ Text indexes for product search
└─ Regular analysis of query performance

```

---

## 📋 QUICK PROCESS SUMMARY

| Process | Steps | Time | Key Players |
|---------|-------|------|-------------|
| User Registration | 6 | ~500ms | User, Backend, MongoDB |
| Login | 5 | ~400ms | User, Backend, JWT |
| Browse Products | 3 | ~200ms | User, Frontend, API |
| Add to Cart | 2 | ~100ms | Frontend, Redux |
| Checkout | 4 | ~300ms | User, Backend, MongoDB |
| Payment | 7 | 30-45s | User, Razorpay, Bank |
| Order Confirmation | 3 | ~500ms | Backend, Email, User |
| Leave Review | 4 | ~300ms | User, Backend, MongoDB |
| View Order History | 2 | ~200ms | User, Backend, MongoDB |

---

**All diagrams and flows are now complete!** ✅

This guide provides visual references for:
- Development lifecycle (4 phases)
- User request processing (9 steps, 100-200ms)
- JWT authentication (3 flows)
- Complete user journey (4 phases)
- Payment processing (7 steps, 30-45 seconds)
- Middleware architecture (8 layers)
- Database relationships (4 collections)
