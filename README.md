# Thunderfs

## What is Thunderfs?

Thunderfs is web based service for the temporary file sharing . You can share files and can be uploaded for anyone without restriction. Files that have been shared will be deleted automatically after 10 minutes. You do not need to worry that the shared link of important files remain in the Internet.

### Technology stack

 - Server
	 - [Nginx](http://nginx.org/)
	 - [uwsgi](http://projects.unbit.it/uwsgi/) (for flask)
 - Front-end
	 - HTML5
	 - JavaScript ([Grunt](http://gruntjs.com/) build)
 - Back-end
	 - [Flask](http://flask.pocoo.org/) (Python)
	 - MongoDB (gridfs)

## Installing Thunderfs

### Operating system

Thunderfs should run on most Unix, Linux, Mac, Mac Server and Windows systems as long as Python and MongoDB are available on this platform.

$ yum install git -y

$ yum groupinstall "Development Tools" "Development Libraries" -y

$ yum install glibc-static -y

$ yum install openssl-devel -y

$ yum install bzip2 bzip2-devel -y

$ yum install zlib zlib-devel -y

### Python

Thunderfs requires python 3.x higher. It's not support Python 2.x.

$ wget https://www.python.org/ftp/python/3.4.2/Python-3.4.2.tgz
...
$ make

$ make altinstall

#### Setup tool

$ wget https://bitbucket.org/pypa/setuptools/raw/bootstrap/ez_setup.py

$ python3.4 ez_setup.py

$ easy_install-3.4 pip

### Mongodb

* Check out the link below:
 * http://docs.mongodb.org/manual/tutorial/install-mongodb-on-red-hat-centos-or-fedora-linux/
* Create file:
 * /etc/yum.repos.d/mongodb.repo

#### 64bit

[mongodb]
name=MongoDB Repository
baseurl=http://downloads-distro.mongodb.org/repo/redhat/os/x86_64/
gpgcheck=0
enabled=1

#### 32bit

[mongodb]
name=MongoDB Repository
baseurl=http://downloads-distro.mongodb.org/repo/redhat/os/i686/
gpgcheck=0
enabled=1

$ yum install mongodb-org

### Nginx

* Check out the link below
 * http://wiki.nginx.org/Install
* Create file:
 * /etc/yum.repos.d/nginx.repo

#### nginx.repo
[nginx]
name=nginx repo
baseurl=http://nginx.org/packages/centos/$releasever/$basearch/
gpgcheck=0
enabled=1

$ yum install nginx

#### Mongodb Drivers

$ pip3 install pymongo

#### Flask-Babel

$ pip3 install Flask-Babel

#### Node.js

$ yum install fontconfig -y

$ wget http://nodejs.org/dist/v0.10.35/node-v0.10.35.tar.gz
...
$ npm install -g grunt-cli

#### Less

$ npm install -g less

#### uWSGI

$ pip3 install uwsgi

## Thunderfs options

### Start
$ make start

### Stop
$ make stop

### Restart
$ make restart

### Deploy
$ make deploy

### Clean
$ make clean

## License

Thunderfs is available under the terms of the GNU-AGPL-3.0 License.is available under the terms of the GNU-AGPL-3.0 License.
