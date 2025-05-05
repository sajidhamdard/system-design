### Failover Strategies: How do we switch?

There are generally **3 common types**:
(cold standby, warm standby, hot standby) — and the switch-over process differs between them.

| Strategy         | State of Backup System                                            | Failover Process                                                   | Manual or Automatic                      |
| ---------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------ | ---------------------------------------- |
| **Cold Standby** | Powered off or not running                                        | You have to power it on, install/configure software, load data     | Mostly **manual**, slow                  |
| **Warm Standby** | Powered on but not fully ready (services installed, but not live) | You start services, sync latest data (if needed), redirect traffic | Mix of **manual** and **semi-automated** |
| **Hot Standby**  | Fully running and ready (near real-time sync)                     | Automatically redirect traffic to standby                          | Mostly **automatic**, fast               |

---

### Now let’s describe the **actual process** for each:

#### **Cold Standby**

1. Failure happens in primary system.
2. IT team gets notified (alert).
3. Manually **boot the backup server**.
4. **Install/restore software** and **load backups**.
5. **Reconfigure network** (DNS, load balancer, etc.) to point users to backup.
6. Application is live again.

> **Manual + Slow** → Might take hours depending on system complexity.

---

#### **Warm Standby**

1. Failure happens in primary system.
2. IT team gets alerted.
3. Backup server is already powered on, but services are idle.
4. **Start application services** on standby.
5. **Sync latest data** (if needed).
6. **Reconfigure network** to route users to standby.

> **Semi-automatic** → Faster than cold standby (usually minutes to an hour).

---

#### **Hot Standby**

1. Failure happens.
2. **Failover happens automatically** (load balancer or clustering software detects failure).
3. Traffic is redirected to standby (which is already synced and running).
4. Users see almost no downtime.

> **Automatic + Fast** → Downtime in seconds to a few minutes.

---

### To directly answer you:

* **Cold standby → manual**
* **Warm standby → mostly manual/semi-automated**
* **Hot standby → automatic**

---

### Bonus tip (for interviews or design discussions):

> Automation tools (like **load balancers**, **DNS failover**, **cluster managers**) can reduce manual work even in warm standby.

---
