# 🚗 HopOn – Event-Driven Ride Sharing Application

HopOn is a full-stack, event-driven ride-sharing platform that connects riders and drivers seamlessly. Built with a modern microservices architecture using Spring Boot, Kafka, Redis, and Next.js, this app demonstrates scalable communication between services and a smooth, interactive UI.

---

## ✨ Features

### 🧑‍💼 Rider
- Register & login securely
- Request rides by choosing pickup/drop via interactive map
- View ride status and history
- Get notified when ride is accepted

### 🚘 Driver
- Register & login securely
- Set availability
- Receive nearby ride requests
- Accept rides and update status

### ⚙️ Core System
- Event-driven communication using Kafka
- Real-time data caching with Redis
- Scalable microservice-ready backend
- Responsive UI with Next.js 15 + Tailwind CSS
- Map integration (e.g., Mapbox or Google Maps)

### 📐 Architecture
![image](https://github.com/user-attachments/assets/b5d7d594-90d5-4cc7-8440-a33ce9f13bc0)


**Tech Stack:**
- **Frontend:** Next.js 15, Tailwind CSS, Mapbox or Google Maps API
- **Backend:** Spring Boot (Java), Kafka, Redis, PostgreSQL
- **Event Bus:** Apache Kafka
- **Cache:** Redis
- **Authentication:** JWT + BCrypt password encoding

**Future Enhancements:**
- Add in-app notifications
- Payment gateway integration
- Admin dashboard
- Rating system for riders and drivers


