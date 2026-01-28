## 🧠 What is Active Directory?

Active Directory is Microsoft’s system to manage:

> **All users, passwords, computers, and permissions inside a company network**

Think of it as:

> The **master database of employees** in a company.

It stores:

* Username
* Password
* Email
* Department
* Groups
* Which systems they can access

---

## 🏢 Real company example

In an office:

When you log into your office laptop with:

```
username: sajid
password: ****
```

You are logging into **Active Directory**.

Not Google. Not Okta.

Your Windows login = AD authentication.

---

## 📦 What AD manages

| Thing                         | Managed by AD |
| ----------------------------- | ------------- |
| Employee login                | ✅             |
| Laptop login                  | ✅             |
| File server access            | ✅             |
| Shared drives                 | ✅             |
| Internal apps                 | ✅             |
| User groups (HR, IT, Finance) | ✅             |

AD is the **identity brain** of the company.

---

## 🔁 Where Okta comes in

Old companies already have AD with thousands of employees.

They don’t want users to remember new passwords for Okta/apps.

So they configure:

```
Okta trusts Active Directory as Identity Provider
```

Flow becomes:

```
User → Okta → Redirect to AD → Login → Okta issues JWT
```

User never knows Okta exists.

---

## 🧠 AD vs Okta difference

| Active Directory        | Okta                     |
| ----------------------- | ------------------------ |
| Stores employees        | Stores application users |
| Windows / network login | API / app login          |
| On-premise server       | Cloud service            |
| LDAP / Kerberos         | OAuth2 / OIDC / SAML     |
| Identity source         | Token issuer             |

---

## 🌐 What is Azure AD (Entra ID)?

Microsoft moved AD to cloud → **Azure AD** (now Entra ID)

Same concept, cloud version.

That’s why you see:

> Login with Microsoft

That is Azure AD acting as IdP.

---

## 🏆 One-line clarity

> **Active Directory = Company’s user database**
> **Okta = Uses that database to give tokens to apps**

---

## Mental picture

```
AD → knows employees
Okta → trusts AD
Your API → trusts Okta
```

Chain of trust.
