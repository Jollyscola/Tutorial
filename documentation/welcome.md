# FutureForms featured demo installation

This Ansible script will install FutureForms with the extended demo.
This demo will show what a lot of the classes in FutureForms can do.

## Requirements

Read the requirements at the [frontpage](../../README.md).

## Clone repository

Then clone this repository.

```
git clone https://github.com/miracle-42/futureforms futureforms
cd futureforms
```

## Configure

In the top of [install-demo.yml](install-demo.yml) the
following changes might be required.

The `install_path` is set to `build` in the cloned directory.
This is where the installation will be located.

## Install

Run the `install-demo.yml` playbook:

```
ansible-playbook playbooks/demo/install-demo.yml 
```

The installation, download and compilation takes about 3 minutes
and will take up about 1.1GB disk space.

## Start openrestdb

`openrestdb` is a Java program which is the actual web server.
Go to the directory and start the webserver:

```
cd build/demo/
bin/openrestdb start
```

<!-- Now the web service is running on port 9002
and can be seen at http://127.0.0.1:9002/

Now the frontscreen can be seen.

![Frontscreen](img/ffscreenshot_1.png)

Mouse over the upper right corner to see the
keyboard shortcuts.

![Shortcut](img/ffscreenshot_20.png)

Click `Connection` in the menu bar and then `Connect`.

![Connect](img/ffscreenshot_2.png)

Enter demo user `hr`and demo password `hr` to login to the database.

![Login](img/ffscreenshot_3.png)

Click the *hamburger button* ☰ in upper left corner and then `Countries`

![BurgerMenu](img/ffscreenshot_4.png)

The empty Countries table is now shown.

![Countries](img/ffscreenshot_5.png)

Click "Query -> Execute" in the top menu or press the key `F8`.

![Execute](img/ffscreenshot_6.png)

Now the table is filled with data from the database.

![CountryNames](img/ffscreenshot_7.png) -->
