#User module for treetalk

##Important Changes v 1.1.0
- Username and Email are now indexed and unique
- to let the unique index work properly you first need to clear your database from double usernames and      emails
- Everything except Full_Name is now required
- There is no password virtualization anymore
