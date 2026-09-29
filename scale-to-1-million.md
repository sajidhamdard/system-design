## Core Utilization

**Core Utilization** measures the percentage of time a CPU core is actively being used rather than idle.

### Formula

**Core Utilization = (Total Time - Total Idle Time) / Total Time × 100**

### Key Points

* **Total Time** = entire monitoring period.
* **Idle Time** = time when the CPU core is not executing a task.
* **Utilized Time** = Total Time − Idle Time.
* CPU/OS monitoring metrics provide the idle-time information.
* **Example:** 10 sec total, 3 sec idle → 7 sec utilized → **70% utilization**.

**In short:**

> **Core Utilization = percentage of time a CPU core is busy.**

### CPU Utilization

CPU utilization is the **average utilization of all CPU cores**.

**Formula:**

> **CPU Utilization = (Core 1 Utilization + Core 2 Utilization + ... + Core n Utilization) / Total Number of Cores**

**Example:**
If a 4-core CPU has utilization of **40%, 60%, 80%, and 20%**:

$$
(40 + 60 + 80 + 20) / 4 = 50\%
$$

So, **CPU Utilization = 50%**.
