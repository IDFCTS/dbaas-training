# Installation:
For the excercises in this guide, you do not need to worry about installation. For this purpose all you need to do is launch a docker container, available from the registry.   
 
```
docker pull rundeck/rundeck:3.3.7
docker run --name rundeck -p 4440:4440 -v data:/home/rundeck/server/data rundeck/rundeck:3.3.7
```
Accessible through the browser at `localhost:4440`, username/password is admin/admin.    
<br>

[Chapter 3: Users](03-users.md)
