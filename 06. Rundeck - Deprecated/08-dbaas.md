# DBaaS specific notes
### The Admin project
Aside from the team projects, there is also a project named "admin". This project contains jobs meant for admins only, such as creation of projects and users, as well as publicly available jobs, such as one which changes a user's password.
Only members of DBaaS receive the admin role.

### Users
We manage our users in multiple places:
1. The `realm.properties` file, 
1. A yaml dictionary, Stored on the rundeck node, and backed up to s3,
1. SSO.  
Rundeck community (free and open source), the version we use, does not support SSO sign in. However, it does support preauthentication, using http headers. We have an apache httpd webserver on each Rundeck node, which acts as a reverse proxy between an API gateway and the Rundeck application itself. The flow is this:  
```
User > DNS name > API GW > apache reverse proxy > SSO Server > apache > Rundeck
```
We always prefer to use SSO authentication to access Rundeck. When the SSO server is up and running properly, both users and roles are sent to Rundeck from it. No effort is required on our part.   
However, at the time of writing, SSO does not yet provide groups, leaving us to manage that ourselves.   
So, aside from simply collecting headers from the SSO server and passing them to Rundeck, apache also performs a check to see what group a given user belongs to. This is where the yaml dictionary comes in. The yaml dictionary simply contains a list of usernames, and what groups they belong to. Any time we "add a new user", all we are doing is adding a new record to the dictionary. Then, we use Ansible with jinja templating to generate a long list of apache  `If Else If` statements resmbling the following psuedo-code: `If username = xxx; Groups == <teamname>`.  
This way, apache can receive just the username from the SSO server, and fill in the blanks of which roles any given user belongs to. If a user not present in this dictionary (but more importantly, the apache `.conf` file generated from the dictionary) attempts to connect, they will be logged in, but presented with a message saying they have no assigned roles and are unable to see any projects. They would still be able to receive specific permissions via the ACL, but this is unusual and would bear checking into.  
We have a job in the Rundeck admin project, which adds new records based on user input, and regenerates the file.  

The way apache does this is with multiple vhosts. One vhost listens on port 443. This connects to the SSO server, and forwards this header to a second vhost, listening on port 444. This vhost contains the user-group mapping, and forwards everything to the third and final vhost, which takes the user:group combination, and passes it all to Rundeck. The reason it is separated is so that we can regenerate the usermap filewithout affecting the other, static parts of the configuration.   

Finally, the `realm.properties` file is kept updated as a fallback,  in case the SSO server itself is unavailable. In this case, users should be directed to the password login screen, which uses the values in the realms file.

# Clustering
Since the open source version of Rundeck does not support clustering, we have implemented an active-passive HA model.  
The API gateway points to a VRRP virtual IP, managed by keepalived. This belongs to the Rundeck "master" node. In the event of a crash, keepalived will bounce the IP to the "standby" node. The standby node will have the jobs, keys, and ACLs, as these are stored on the shared postgres database. However, it will not have execution logs, or node list files. Therefore, the node originally designated as master also has a cron job that runs once per minute, executing a script that calls rsync, which sends all relvant data to the slave node. This way, in the even of a failover, the slave should be able to continue right where the master left off, though naturally it will be unable to continue jobs that were mid-runat the time of the failure, and said jobs must be re-run where necessary.  
Of course, on failover, the cronjob is disabled on the former master and activated on the slave, going the other way this time.
