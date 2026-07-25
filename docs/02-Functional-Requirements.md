# Functional Requirements

## FR-001

### Title

User Registration

---

### Description

The system shall allow a new user to register as either a customer or a worker using a valid mobile number and One-Time Password (OTP) verification.

Upon successful registration, the system shall create a unique user profile and allow the user to manage their profile information.

---

### Actors

Primary Actor

- Unregistered User

Secondary Actor

- Notification System

---

### Preconditions

- User is not already authenticated.
- User has access to a valid mobile number.
- User is able to receive OTP messages.

---

### Main Flow

1. User enters name.
2. User select registering as a customer or a worker.
3. User enters phone number.
4. User requests OTP.
5. Generated OTP is sent to user.
6. User enters OTP and submit on register.
7. OTP is verified.
8. System creates a new user account.
9. System creates a user profile.
10. System assigns the selected role.
11. System sends registration confirmation.
12. User is redirected to profile management.

---

### Alternative Flow

#### AF-1

User registers as Worker.

The system creates a worker profile instead of a customer profile.

---

### Failure Flows

#### FF-1 Invalid Request

- The system rejects requests containing incomplete or invalid information.

#### FF-2 : Phone number already exists

- If the Phone number already exist, user is prompted about this and asked to login instead.

#### FF-3 : OTP not recieved by user

- User are given option to regenerate new OTP.

#### FF-4 : OTP expired

- User prompted OTP expired and asked to regerate new OTP.

#### FF-5 : OTP not matched

- The system informs the user that the entered OTP is incorrect.
- The user may retry verification until the maximum number of allowed attempts is reached.
- After exceeding the retry limit, the OTP becomes invalid and the user must request a new OTP.

#### FF-6 OTP Service Unavailable

- If the OTP service is temporarily unavailable, the system informs the user and allows them to retry later.

---

### Postconditions

- A unique user should exist.
- User should be able to access and manage profile.

---

### Acceptance Criteria

- A unique identifier is generated.
- User profile is created.
- OTP is verified successfully.
- Duplicate number is blocked.
- The user notified after profile creation.

---

### Priority

Critical

---

---

## FR-002

### Title

Login

---

### Description

The system shall allow a registered user to authenticate using a valid mobile number and One-Time Password (OTP).

Upon successful authentication, the user shall be granted access to the platform according to their assigned role.

---

### Actors

Primary Actor

- Registered User

Secondary Actor

- OTP Service

---

### Preconditions

- User must already be registered.
- User has access to a valid mobile number.
- User is able to receive OTP messages.
- User account is active.
- User account is not suspended.

---

### Main Flow

1. User enters phone number.
2. User requests OTP.
3. Generated OTP is sent to user.
4. User enters OTP and submit on login.
5. OTP is verified.
6. The system authenticates the user.
7. The system establishes an authenticated session.
8. The system grants access based on the user's role.
9. The user is redirected to the appropriate home screen.

---

### Alternative Flow

- Not applicable

### Failure Flows

#### FF-1 Invalid Request

- The system rejects requests containing incomplete or invalid information.

#### FF-2 : Phone number not exists

- If the Phone number do not exist, user is prompted about this and asked to register first.

#### FF-3 : OTP not recieved by user

- User are given option to regenerate new OTP.

#### FF-4 : OTP expired

- User prompted OTP expired and asked to regerate new OTP.

#### FF-5 : OTP not matched

- The system informs the user that the entered OTP is incorrect.
- The user may retry verification until the maximum number of allowed attempts is reached.
- After exceeding the retry limit, the OTP becomes invalid and the user must request a new OTP.

#### FF-6 OTP Service Unavailable

- If the OTP service is temporarily unavailable, the system informs the user and allows them to retry later.

---

### Postconditions

- User is successfully authenticated.
- User session is established.
- User role is identified.
- User gains access to authorized platform features.

---

### Acceptance Criteria

- A registered user can successfully authenticate.
- Unregistered users cannot authenticate.
- Invalid OTP is rejected.
- Expired OTP cannot be used.
- Authenticated users can access protected resources.
- Users are redirected according to their assigned role.

## Business Rules

- Only registered users may authenticate.
- Authentication requires successful OTP verification.
- Only one active authenticated session per device is allowed. (Optional)
- Users can only access features permitted by their assigned role.
- OTPs expire after the configured validity period.
- OTP verification attempts are limited to prevent abuse.

### Priority

Critical

---

---

## FR-003

### Title

Logout

---

### Description

The system shall allow an authenticated user to terminate their active session and revoke access to protected platform resources.

Upon successful logout, the user shall no longer be able to access protected resources until they authenticate again.

---

### Actors

Primary Actor

- Registered User

Secondary Actor

- None

---

### Preconditions

- User must already be authenticated.

---

### Main Flow

1. User submits logout request.
2. System ask for confirmation.
3. User confirms logout.
4. The system terminates the authenticated session.
5. The system revokes access to protected resources.
6. The user is redirected to the authentication screen.

---

### Alternative Flow

#### AF-1 Session Expired

If the authenticated session expires before the user initiates logout, the system automatically terminates the session and redirects the user to the authentication screen.

### Failure Flows

- N/A

---

### Postconditions

- Active session is terminated.
- Protected resources are no longer accessible.
- Future requests require authentication.

---

### Acceptance Criteria

- Authenticated users can successfully logout.
- Requests made after logout require re-authentication.
- Protected resources cannot be accessed after logout.
- User is redirected to the authentication screen.

## Business Rules

- Logout is only applicable to authenticated sessions.
- Logging out terminates only the current authenticated session.
- Access to protected resources requires re-authentication after logout.

### Priority

Critical

---

---

## FR-004

### Title

View Profile

---

### Description

The system shall allow an authenticated user to view their profile information based on their assigned role.

---

### Actor

Primary Actor

- Registered Users

Secondary Actor

- None

---

### Preconditions

- User must already be authenticated.

---

### Main Flow

1. User requests to view their profile.
2. The system retrieves the user's profile.
3. The system displays the profile information.
4. The user reviews the profile.

### Alternative Flow

- None

### Failure Flows

#### FF-1: User not authenticated

User is prompted, they are not authenticated and ask to login / register.

#### FF-2 Profile Not Found

If the requested profile cannot be found, the system informs the user that the profile is unavailable and suggests contacting support.

---

### Postconditions

- No system state is modified.
- User profile information is displayed successfully.

### Acceptance Criteria

- User can see their profile details.
- Un-authenticated user are blocked to view profile.

## Business Rules

- Un-authenticated user are blocked to view profile.
- User can see information based on their role.
- User can only access their profile.
- Sensitive information shall only be visible to authorized users.

---

---

## FR-005

### Title

Update Profile

---

### Description

The system shall allow an authenticated user to update editable profile information according to their assigned role.

---

### Actor

Primary Actor

- Registered Users

Secondary Actor

- None

---

### Preconditions

- User must already be authenticated.

---

### Main Flow

1. User selects profile information to update.
2. User submits updated information.
3. The system validates the submitted information.
4. The system updates the user's profile.
5. The system confirms successful profile update.
6. The updated profile is displayed.

### Alternative Flow

- None

### Failure Flows

#### FF-1: User not authenticated

User is prompted, they are not authenticated and ask to login / register.

#### FF-2 Invalid Request

- The system rejects requests containing incomplete or invalid information.

---

### Postconditions

- User can see their updated profile details.

### Acceptance Criteria

- User can see their updated profile details.
- Un-authenticated user are blocked to update profile.

## Business Rules

- Users may update only editable profile fields.
- Users may update only their own profile.
- Required profile fields cannot be left empty.
- Role-specific fields shall only be editable by users of that role.

---

---
