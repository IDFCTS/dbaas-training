# Nodes
Each project has a pool of nodes available to it, for the purpose of running jobs and commands.  
Nodes must be present prior to creating a job, since one of the steps in the job creation wizard is selecting what nodes the job is able to run on.  
To add nodes to a project, go to the left sidebar, and navigate to  Project Settings > Nodes.   
There are multiple options, but the one we usually use is a YAML file containing a list of nodes, where each node is represented as a YAML block.  
A YAML block representing a node looks like this:  
```yaml
remote-node-1:
  description: Rundeck client node
  hostname: 13.82.20.95
  nodename: remote1
  osArch: x86_64
  osFamily: unix
  osName: RHEL
  osVersion: 7.7
  tags: 'testing,ansible'
  username: tuser
  ssh-authentication: "privateKey"
  ssh-key-storage-path: "keys/somekeypath/key-file"
  ssh-key-passphrase-storage-path: "keys/somekeypath/key-file-passphrase"
  customtag: "You can add anything as a custom tag and value."
  2ndtag: "Tags are used for searching nodes, and running jobs on nodes with certain tags, for example:"
  runnable-node-tag: true
```

You can have any number of node blocks in a single node file, as well as any number of node files. But we keep all our node blocks in a single file per project, since each project has different isolated nodes.
An Isolated Node (IN, also known as bastion or jump host) is a node that has ssh access to many servers, but is only accessible via ssh to the rundeck application node. In this way, the Rundeck application does not have complete, unfettered access to the entire network, but jobs in rundeck can still reach the entire network.

Our architecture looks something like this:   
```
        [Rundeck node]
        /      |      \
       /       |       \
      /        |        \
    [IN]      [IN]      [IN]
    / \       /  \      /  \
  [RN|RN]    [RN|RN]   [RN|RN]
  [RN|RN]    [RN|RN]   [RN|RN]
```
Each RN stands for "remote note".

Aside from the security benefits, another reason this design helps us is that since each team manages their own IN's, each team can manage their own dependencies and code bases separate from the other projects. This helps with conflicts and with bottlenecks.   
The flow of a job executing Ansible is as follows:  
 1. Rundeck application recieves job parameters from the user.   
 1. Rundeck sends a request to the Isolated Node, where Ansible is installed. 
 1. Ansible runs from the Isolated Node, with its inventory containing the remote nodes.

So different teams using different versions of Ansible, different yum dependencies, different codebases, none of this matters. Also, there are far fewer ansible processes running on the same node at any given time, thus reducing the load.

### Excercises
1. In Project "services", create a nodes list with 3 isolated nodes. Each node should be:
    * A real VM, accssible only via passwordless ssh. 
    * Use keys only in the rundeck keystore. Do not use keys in the rundeck server's ~/.ssh/ directory. (See chapter 6 for more information on the keystore.)

1. Use a `command` from the left sidebar to install ansible on all 3 of your nodes. 

1. Create a job that uses ansible to install a list of applications via yum. It should be able to install any number of packages. However, the job should randomly run on two of the nodes, not running on the third.

1. Run the job, installing python3, vim and htop.

1. Use a project level ACL to grant user "control" read and run access to the job. 

1. Log in as user "control" and install neovim on all 3 nodes.

1. In Project "control", create a nodesfile that has 2 nodes. Then create a job that includes an option that will cause the job to run only on one node. The job does not have to be ansible, but it must have at least two steps, where the second step uses a variable which is taken from a log filter of the first step.   
<br>

[Chapter 7: Excercises summary](07-excercises.md)


