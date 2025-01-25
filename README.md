# **Personalized News App Documentation** 📰

Welcome to the guide for building and running your **Personalized News Application** using **Docker Compose**! 🚀

---

## **Prerequisites** ✅

Before you begin, ensure you have the following installed on your system:

- [**Docker**](https://www.docker.com/get-started) - Docker Desktop should be installed and running.

---

## **Steps to Use the Application** ⚙️

### **1. Install Docker Desktop** 🖥️

If you haven't already installed Docker, download and install **Docker Desktop**. If you already have it installed, you can skip this step.

### **2. Build the Application** 🔨

Ensure that Docker Desktop is running. Once ready, navigate to the directory containing the `docker-compose.yml` file and build the application.

```bash
docker-compose build
```

### **3. Run the Application** 🚀

Once the build is complete, you can run the application in **detached mode** (in the background). This will start all services defined in the `docker-compose.yml` file.

```bash
docker-compose up -d
```

### **4. Check the Logs** 📜

To verify that the application is running, check the logs. You should see confirmation that the containers have started successfully.

```
✔ Container reactjs-news-fe  Started

```

### **5. Browse the Application** 🌐

Once the containers are up and running, you can access the application in your browser. Just visit the following link:

[**http://localhost:3000**](http://localhost:3000)

The **Personalized News Application** should now be running! 🎉

---

## **Stop the Application** 🛑

When you're done and want to stop the application, use the following command to bring everything down:

```
docker-compose down

```

- This will stop and remove the containers, networks, and volumes defined in your `docker-compose.yml` file.

If you just want to stop the containers but leave them intact (i.e., not remove them), you can do so.

```
docker-compose stop
```

---

## **Conclusion** 🎉

You have successfully Dockerized your **Personalized News Application**! 📰🚀

For more information, check out the official [Docker documentation](https://docs.docker.com/).
