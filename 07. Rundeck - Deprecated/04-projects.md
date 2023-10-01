# Projects and teams

A project in Rundeck is a namespace in which jobs are stored.  
Projects also contain all the metadata required to run jobs. Permissions can be granted at the project level, and so in our environment, each team gets a single project on which they have "project level admin".  
Each project in Rundeck represents a particular team, and our convention is to name the project after the team, but in all lowercase. So, DBaaS's team project is called dbaas.  
When sigining into Rundeck, a user is always directed to the Projects List page. This page is a list of all the projects in Rundeck which the user has been granted read access to. As admins, we always grant all users the ability to see what projects exist, but each team can restrict what other teams can see and do in their own project. So, while a RHSSO team member can click on the DBaaS team project they will only see the objects that DBaaS has granted them permission to see. 


### Objects in projects
Projects contain the following objects:  
* Jobs
* Nodes
* ACL files
* Job execution logs

You should go over the following topics in the official documentation:  
* https://docs.rundeck.com/docs/manual/03-getting-started.html
* https://docs.rundeck.com/docs/manual/04-jobs.html  
Read ALL the Jobs documentation, up to and including Job Plugins.

### Git integration
In order for the code sample to work in the previous example, we need our code to be present on the isolated node. To this end, DBaaS project has an example job which performs a git pull/clone to put code in a prespecified directory. This job is run as a job step in every ansible job, thus ensuring all code is available to run.


### Excercises
1. Create 3 Projects, named "services", "admin", and "control".  
<br>

[Subchapter: A brief word on jobs](04.5-jobs.md)


