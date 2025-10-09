## **1️⃣ What is gRPC?**

**gRPC** (Google Remote Procedure Call) is a **high-performance, open-source framework** for **remote procedure calls**.

It allows **one service (client)** to call methods on **another service (server)** as if it were a **local method call**, even if the server is running on a different machine or language.

---

### 🔹 Key Features of gRPC

1. **Based on HTTP/2**

   * Supports **multiplexing** (multiple requests in parallel)
   * Supports **bi-directional streaming**
   * Low latency and high throughput

2. **Uses Protocol Buffers (Protobuf)**

   * Efficient, language-neutral, platform-neutral **serialization format**
   * Generates code for **client & server stubs** automatically

3. **Supports multiple languages**

   * Java, Python, Go, C#, Node.js, etc.

4. **Supports 4 types of RPC**:

   * Unary RPC (single request → single response)
   * Server streaming (single request → stream of responses)
   * Client streaming (stream of requests → single response)
   * Bidirectional streaming (stream ↔ stream)

---

## **2️⃣ Why Use gRPC?**

* **Performance**: Faster than REST because Protobuf is binary, not JSON
* **Strongly typed**: Compile-time validation using `.proto` files
* **Streaming**: Built-in support for streaming large datasets
* **Language-independent**: Client and server can be in different languages
* **Scalable microservices communication**: Ideal for internal APIs in distributed systems

---

## **3️⃣ How gRPC Works**

1. Define a **service** and **messages** in a `.proto` file:

```proto
syntax = "proto3";

option java_multiple_files = true;
option java_package = "com.example.grpc";
option java_outer_classname = "UserServiceProto";

service UserService {
  rpc GetUser (UserRequest) returns (UserResponse);
}

message UserRequest {
  int32 id = 1;
}

message UserResponse {
  int32 id = 1;
  string name = 2;
  string email = 3;
}
```

2. **Generate Java code** from `.proto` file:

   ```
   protoc --java_out=./src/main/java --grpc-java_out=./src/main/java user.proto
   ```

3. Implement **server** in Java:

```java
import io.grpc.Server;
import io.grpc.ServerBuilder;
import io.grpc.stub.StreamObserver;

public class UserServer {
    public static void main(String[] args) throws Exception {
        Server server = ServerBuilder.forPort(9090)
                .addService(new UserServiceImpl())
                .build();
        server.start();
        System.out.println("Server started on port 9090");
        server.awaitTermination();
    }
}

class UserServiceImpl extends UserServiceGrpc.UserServiceImplBase {
    @Override
    public void getUser(UserRequest request, StreamObserver<UserResponse> responseObserver) {
        UserResponse response = UserResponse.newBuilder()
                .setId(request.getId())
                .setName("John Doe")
                .setEmail("john@example.com")
                .build();
        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }
}
```

4. Implement **client** in Java:

```java
import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;

public class UserClient {
    public static void main(String[] args) {
        ManagedChannel channel = ManagedChannelBuilder.forAddress("localhost", 9090)
                .usePlaintext()
                .build();

        UserServiceGrpc.UserServiceBlockingStub stub = UserServiceGrpc.newBlockingStub(channel);

        UserRequest request = UserRequest.newBuilder().setId(1).build();
        UserResponse response = stub.getUser(request);

        System.out.println("User: " + response.getName() + ", Email: " + response.getEmail());
        channel.shutdown();
    }
}
```

---

## **4️⃣ When to Use gRPC vs REST**

| Feature           | gRPC                                                     | REST/HTTP                 |
| ----------------- | -------------------------------------------------------- | ------------------------- |
| Payload format    | Protobuf (binary)                                        | JSON/XML (text)           |
| Performance       | High                                                     | Medium                    |
| Streaming support | Yes (built-in)                                           | Hard to implement         |
| Contract/Schema   | Strongly typed via .proto                                | Usually implicit (JSON)   |
| Language support  | Multi-language                                           | Multi-language            |
| Use case          | Internal microservices, low latency, real-time streaming | External APIs, public web |

---

### ✅ **Summary**

* **gRPC** = modern, fast, strongly-typed RPC framework using HTTP/2 + Protobuf
* **Why** = high performance, streaming, language-agnostic, scalable for microservices
* **How to use** = define `.proto`, generate code, implement server & client
* **Java Example** = showed server & client code above

---
