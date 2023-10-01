# Users and permissions
### Users
Users are managed externally to Rundeck. (See chapter 8) Once logged in, the ACL mechanism kicks in.

### ACL policies - Permissions
All permissions in Rundeck are managed with ACL files. On login, `authentication` occurs, and the user is logged in as a string containg the username and a list of roles the user is part of. After the user is authenticated, `authorization` occurs, and this is when Rundeck goes through all available ACL files and matches policies to the user and group names.

Permissions to projects are granted to the project's "owning team", which is defined at the ACL level. Projects Do NOT actually belong to their owner, they belong to whoever has admin level ACL policies specifying the projects. So, whenever we create a new project, we also create a new system level ACL file which grants a desired user or role/group admin level control over the project. 

A project owner is able to grant any kind of permission to anyone they desire by using project level ACL files, which are available throught the left sidebar. This is useful for allowing members of other teams to execute jobs in your project. For example, Splunk team could have a job which allows other teams to create splunk indexes.

The Rundeck ACL files are extremely powerful, and as a result are somewhat complex.  
You should read the documentation [here](https://docs.rundeck.com/docs/administration/security/authorization.html).

It is important to keep in mind that users and groups in Rundeck are only able to login. Anything further is managed solely by ACL policies.

Because the docs are a little difficult to fully understand, here are some examples of real-life ACL policies:
```yaml
---
description: Allow team A to access Team B keys
context:
  application: rundeck
for: 
  storage:
    - equals:
        path: 'keys/teamb/isolated/vault-pass'
      allow: [read]
    - match:
        path: 'keys/teamb/shared/.*'
      allow: [read]
by:
  group:
    - teama
    - noc
    
---    
description: Allow a user named Nicky access to a particular job
for:
  job:
  - allow: [read]
    equals:
      name: 'Git'
by:
  username: nicky
```

### Excercises
1. Create 3 users named "services", "admin", and "control". Make sure that "admin"'s password is md5 hashed in the realm.properties file. The other users may be in plain text.

1. Assign the group "user" to the users "services" and "control".

1. Grant each user project level admin on their a project with the same names, using system level ACL files (The projects do not yet exist, but when created, each user will immediately have project level admin access.)

1. Log out and log back in as "services" user.   
<br>

[Chapter 4: Projects](04-projects.md)

