# Rundeck Introduction

This chapter has basic information, which will explained in greater detail later on (where relevant).

### Some background
Rundeck is a powerful platform, written as a java web application, for executing "jobs". Jobs can be many things, complex or simple. We in DBaaS use Rundeck to execute ansible playbooks, but it can be used to execute any kind of code, and even some things that aren't code.    
In order to use Rundeck to run code, we first must have code that can already run on a linux command line. This code is put inside of a Rundeck job, which Rundeck then executes.  

### Reasons to use Rundeck
The main benefits Rundeck gives us, as opposed to just executing scripts, programs and tools from the commandline, are as follows:
* **Centralized access.**  
Consider the following example:  
A team has an ansible playbook. This playbook works well, but there are multiple ways to actually execute an ansible playbook. This code could look like this: `ansible-playbook -i inventories/appnodes.yml playbooks/upgrade_app.yaml -v`, but it could easily take different forms as different developers work on it in different ways. This comand is run from many different workstations, with significant configuration drift.  
Each team member uses their own inventory file (`-i inventorytemp2` and such things.)   
Each member uses various vault prompts, different ways of passing variables (maybe as extra vars, maybe adding to a var file, maybe in the inventory, etc), possibly people even begin to use different versions of the playbook in between commits to master. This often eventually leads to something working for some team members but not others. In Rundeck, besides for having a single version of the code, there is also a single invocation of said code, protecting us from the aforementioned mess.  
We could theoretically have a single node which everyone must SSH into in order to execute code, but that would only partially solve the issue. 

* **Robust access control**  
Using Rundeck, we can control _exactly_ who has access to any part of Rundeck. This far exceeds the type of access available if we were only using files stored on a central server and unix permissions. 

* **GUI access**  
Rundeck provides a simple and easy to use GUI for editing and executing jobs. Even someone who does not know any coding or linux can run complex ansible playbooks by simply clicking a button.

* **Execution history**  
If we were to run all our commands from a central SSH server manually, we wouldn't really have any way to know who executed what job and when. Rundeck gives us the ability to see all this, and more, very easily.

* **API access**  
Anything we can do via the GUI, from running a job to listing all previous executions, can also be don vie simple GET and POST statements. This is very useful for interlinking various services.  

There is more to rundeck, but now you should have a basic understanding of what Rundeck is.  
<br>



[Chapter 2: Installation](02-installation.md)
