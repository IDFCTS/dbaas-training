# The keystore
Sometimes, jobs will need access to data that you don't want to be available to anyone looking through the execution history, logs, or similar, for example Ansible vault passwords.   
To this end, Rundeck provides us with a binary encrypted keystore. This is a table in the database that contains data in the key:value  format, where key is the name of the key in Rundeck, and value is the encrypted value of the key. So, I could insert the following key: `vault-password: Aa123456`, and the database might show `vault-password: dji85yji7cy5j6v46iomce5o8utvo85yti8ch45rxtyh5478tvy5ib7cn5eityn8v57tn7c4yti95yy67c985yt9e54kghxc659g34ez5ev6z46e3hzrbz36rb73r7b34h956xgh95g8x4h69gh4x5hg946hg9x4xh9g49h549fh59gh9xc54gh8xm59g5h49tg854ymxt954mytx498yxtx90mt9y4m5cty5cty954tmc98587eei`  

Keys in the keystore can be used in jobs, as a value the job uses, or as SSH public and private keys, used by Rundeck to connect to its nodes.  
The keystore is laid out like a unix file directory, with the root directory being called `keys`.  
Under this you can nest keys and directories however you like. Permissions on keys are necessary to run jobs, and can be granted on individual keys, regexes, or directories. We give each team a directory with the same name as their project in the top level of the keystore, so the keystore could look something like this:
```
keys/
  dbaas/
    shared/
      vaultpass
      sshpub
    isolatednodes/
      sshpriv.key
      pub1
      pub2
      pub1.pass
      pub2.pass  
  rhsso/
    passwords/
      shared/
        key1pass
      key2pass
      key3pass  
    key1
    key2
    key3
  apim/
    ssh.key
    ssh_passphrase
```
Note that keys in the keystore are required in order to allow SSH access to the nodes, as specified with these lines in a node block: 
```yaml
ssh-authentication: "privateKey"
ssh-key-storage-path: "keys/somekeypath/key-file"
ssh-key-passphrase-storage-path: "keys/somekeypath/key-file-passphrase"
```

Remember that Rundeck must already have SSH access to the isolated node from the command line - we offer the Rundeck node's private key to the isolated node, which gets authenticated in the isolated node's authorized_keys. (SSH works like this: 'A private key that remains (only) with the user. The possession of this key is proof of the user's identity. Only a user in possession of a private key that corresponds to the public key at the server will be able to authenticate successfully.')  

Using the ACL mechanism for granting permissions, dbaas can grant anyone read access on any keys in the `shared` directory while keeping other keys private.  
<br>

[Chapter 6: Nodes](06-nodes.md)


