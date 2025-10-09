## **1️⃣ What is Proximity Search?**

**Proximity search** is a type of search that **finds items or points that are “near” a given location**.

* In spatial databases or location-based systems, proximity is usually measured as **distance on a map** (e.g., kilometers or meters).
* Instead of searching for an exact match, you search for **“all items within X distance of a point”**.

**Example:**

* “Find all restaurants within 2 km of my current location”
* “Find users within 5 miles of New York City”

---

## **2️⃣ Why Proximity Search is Useful**

1. **Location-based services**

   * Food delivery apps, ride-sharing apps, real estate apps
2. **Geospatial analytics**

   * Cluster nearby points, heatmaps, traffic analysis
3. **Social networks**

   * Find nearby friends or events
4. **Emergency services**

   * Find nearest hospitals or fire stations

---

## **3️⃣ How Proximity Search Works**

### **Step 1: Represent Locations**

* Each location has **latitude** and **longitude**
* Can also use **3D coordinates** for advanced cases (x, y, z on Earth sphere)

### **Step 2: Measure Distance**

Common distance formulas:

1. **Haversine formula** (for Earth’s curvature):

[
d = 2 \cdot R \cdot \arcsin\left(\sqrt{\sin^2\left(\frac{\Delta \phi}{2}\right) + \cos \phi_1 \cdot \cos \phi_2 \cdot \sin^2\left(\frac{\Delta \lambda}{2}\right)}\right)
]

* ( \phi_1, \phi_2 ) = latitudes in radians
* ( \lambda_1, \lambda_2 ) = longitudes in radians
* ( R ) = radius of the Earth (~6371 km)

2. **Euclidean distance** (for small areas, flat approximation):

[
d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}
]

---

### **Step 3: Efficient Search**

Naive search → check distance for **all points** → **O(n)** → slow for large datasets.

Efficient methods:

1. **Spatial Indexing**

   * **R-trees**: Hierarchical rectangles, fast range queries
   * **Quadtrees / K-d trees**: Divide space into regions for faster search

2. **Geohash**

   * Encode coordinates into strings
   * Nearby locations → **share common prefix**
   * Quickly filter candidates before calculating exact distance

3. **S2 Geometry / H3**

   * Partition Earth into hexagonal cells for scalable proximity queries

---

### **4️⃣ Example Workflow (Using Geohash)**

1. Encode all points with **Geohash**
2. Query for **all points sharing the prefix** of target location (covers nearby area)
3. Filter by **exact distance** (Haversine)

**Example:**

* User at `(37.4219, -122.0840)`
* Geohash prefix: `9q9h` → fetch all points starting with `9q9h`
* Filter points within 2 km radius using Haversine

---

### **5️⃣ Use Cases**

| Scenario      | How Proximity Search is Used            |
| ------------- | --------------------------------------- |
| Ride-sharing  | Find nearest drivers to passenger       |
| Food delivery | Find restaurants within delivery radius |
| Social apps   | Show nearby friends/events              |
| Real estate   | Show properties near user location      |
| Logistics     | Find nearest warehouse or hub           |

---

### **6️⃣ Summary**

* **Proximity search** = find “nearby” points to a given location
* **Distance formulas** = Haversine (curved Earth) or Euclidean (flat approximation)
* **Optimization techniques** = Spatial indexes (R-tree, QuadTree), Geohash, S2/H3
* **Common use** = Maps, rides, delivery, social networks

---
