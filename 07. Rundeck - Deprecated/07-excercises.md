# Excercises
Once you have finished reading, complete any of the following excercises that you did not do while going through the chapters, as well as the final few problems, on your local Rundeck container. Once you are done, read the DBaaS specific adminstration notes to finish this section of your training. 

1. Create 3 Projects, named "services", "admin", and "control".
1. Create 3 users named "services", "admin", and "control". Make sure that "admin"'s password is md5 hashed in the realm.properties file.  The other users may be in plain text.
1. Assign the group "user" to the users "services" and  "control".
1. Grant each user project level admin on their respective projects using system level ACL files
1. Log out and log back in as "services" user. 
1. In Project "services", create a nodes list with 3 isolated nodes. Each node should be:
    *  A real VM, accssible only via passwordless ssh. 
    * Use keys only in the rundeck keystore. Do not use keys in the rundeck server's ~/.ssh/ directory.
1. Use a `command` from the left sidebar to install ansible on all 3 of your nodes.     
1. Create a job that uses ansible to install a list of applications via yum. It should be able to install any number of packages. However, the job should randomly run on two of the nodes, not running on the third.
1. Run the job, installing python3, vim and htop.
1. Use a project level ACL to grant user "control" read and run access to the job. 
1. Log in as user "control" and install neovim on all 3 nodes.
1. In Project "control", create a nodesfile that has 2 nodes. Then create a job that includes an option that will cause the job to run only on one node. The job does not have to be ansible, but it must have at least two steps, where the second step uses a variable which is taken from a log filter of the first step.

1. Use the Rundeck API to execute the job you just created.

1. Log in as the admin user. You should be able to see and do everything in all projects. 

1. Create a job which uses the Rundeck API to create a new project, user, and ACL policy which grants the new user project level admin control over the new project.  
<br>

[Chapter 8: DBaaS admin notes](08-dbaas.md)

