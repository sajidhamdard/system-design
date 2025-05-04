## **What is Nginx?**

**Nginx** (pronounced "engine-x") is **a high-performance web server and reverse proxy server**.

> It is mainly used to serve websites, forward requests to backend servers, and handle lots of web traffic efficiently.

---

## **What Nginx can do (core functions)**

| **Function**        | **What it means**                                                                             |
| ------------------- | --------------------------------------------------------------------------------------------- |
| **Web server**      | Serve static files (HTML, CSS, JS, images) to browsers                                        |
| **Reverse proxy**   | Receive client requests and forward them to backend servers (like Node.js, Java, Python apps) |
| **Load balancer**   | Distribute incoming traffic across multiple backend servers to balance load                   |
| **SSL termination** | Handle HTTPS (encryption) and forward unencrypted traffic to backend                          |
| **Caching**         | Cache content to speed up responses and reduce backend load                                   |
| **HTTP/2 support**  | Serve modern web traffic more efficiently                                                     |

---

## **Why Nginx is popular**

✅ **Fast & lightweight** — Handles thousands of concurrent connections with low memory
✅ **Open source & free**
✅ **Easy to configure** (small config files)
✅ **Extremely reliable** — Runs on millions of websites (e.g., Netflix, Dropbox, WordPress)

---

## **Example of Nginx reverse proxy (config)**

```nginx
server {
    listen 80;
    server_name example.com;

    location / {
        proxy_pass http://localhost:3000;  # Forward requests to backend app
    }
}
```

> This simple config says:
> “Listen on port 80 → forward all traffic to a backend server running on port 3000.”

---

## **In short**

**Nginx** is a **web server + reverse proxy + load balancer** that is **fast, reliable, and free**.
It helps route, serve, and optimize web traffic **between clients and backend servers**.
